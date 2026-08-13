import * as React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export interface HeroProgressRef {
  current: number;
}

interface HeroJewelrySceneProps {
  progressRef: React.MutableRefObject<number>;
  reducedMotion?: boolean;
  isMobile?: boolean;
}

function GoldRing({
  progressRef,
  reducedMotion,
}: {
  progressRef: React.MutableRefObject<number>;
  reducedMotion?: boolean;
}) {
  const groupRef = React.useRef<THREE.Group>(null);
  const diamondRef = React.useRef<THREE.Mesh>(null);
  const bandRef = React.useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const p = progressRef.current;
    const group = groupRef.current;
    if (!group) return;

    if (reducedMotion) {
      group.rotation.y += delta * 0.15;
      return;
    }

    // Scroll 0%: dramatic close-up — ring tilted toward camera
    // Scroll 25%: slow orbit — camera moves around
    // Scroll 50%: craftsmanship reveal — ring rotates on axis
    // Scroll 75%: pull back — full composition visible
    // Scroll 100%: settle for section transition

    const rotY = p * Math.PI * 1.8;
    const rotX = THREE.MathUtils.lerp(0.35, -0.05, Math.min(p * 2, 1));
    const rotZ = THREE.MathUtils.lerp(-0.12, 0.08, p);

    group.rotation.set(rotX, rotY, rotZ);
    group.position.y = THREE.MathUtils.lerp(-0.15, 0.05, p);
    group.position.x = THREE.MathUtils.lerp(0.3, 0, p);

    const scale = THREE.MathUtils.lerp(1.15, 0.92, p);
    group.scale.setScalar(scale);

    if (bandRef.current) {
      bandRef.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI * 0.5, Math.max(0, (p - 0.3) * 2));
    }

    if (diamondRef.current) {
      diamondRef.current.rotation.y = state.clock.elapsedTime * 0.4 + p * Math.PI;
      const diamondScale = THREE.MathUtils.lerp(1, 1.08, Math.sin(p * Math.PI));
      diamondRef.current.scale.setScalar(diamondScale);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={bandRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.26, 64, 128]} />
        <meshPhysicalMaterial
          color="#D4AF37"
          metalness={1}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.08}
          reflectivity={1}
          envMapIntensity={2.5}
        />
      </mesh>

      <mesh ref={diamondRef} position={[0, 0.55, 0]}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.95}
          transmission={0.92}
          roughness={0.01}
          thickness={0.8}
          ior={2.42}
          clearcoat={1}
          envMapIntensity={3}
        />
      </mesh>

      {/* Side accent stones */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 3) * Math.PI * 2) * 1.35,
            Math.sin((i / 3) * Math.PI * 2) * 0.05,
            Math.sin((i / 3) * Math.PI * 2) * 1.35,
          ]}
        >
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0}
            roughness={0.05}
            transmission={0.85}
            thickness={0.3}
            ior={2.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig({
  progressRef,
  reducedMotion,
}: {
  progressRef: React.MutableRefObject<number>;
  reducedMotion?: boolean;
}) {
  const { camera } = useThree();
  const target = React.useRef(new THREE.Vector3(0, 0, 0));

  React.useEffect(() => {
    camera.lookAt(target.current);
  }, [camera]);

  useFrame(() => {
    const p = progressRef.current;
    if (reducedMotion) return;

    const startPos = new THREE.Vector3(0.8, 0.4, 3.2);
    const midPos = new THREE.Vector3(2.2, 0.6, 4.5);
    const endPos = new THREE.Vector3(0, 0.2, 6.2);

    let desired: THREE.Vector3;
    if (p < 0.5) {
      desired = startPos.clone().lerp(midPos, p * 2);
    } else {
      desired = midPos.clone().lerp(endPos, (p - 0.5) * 2);
    }

    camera.position.lerp(desired, 0.08);
    camera.lookAt(target.current);
  });

  return null;
}

function GoldDust({ count = 40 }: { count?: number }) {
  return (
    <Sparkles
      count={count}
      scale={8}
      size={1.2}
      speed={0.15}
      color="#F4D77B"
      opacity={0.35}
    />
  );
}

export function HeroJewelryScene({
  progressRef,
  reducedMotion = false,
  isMobile = false,
}: HeroJewelrySceneProps) {
  const particleCount = isMobile ? 20 : 45;

  return (
    <>
      <color attach="background" args={['#05020A']} />
      <fog attach="fog" args={['#09040F', 4, 14]} />

      <CameraRig progressRef={progressRef} reducedMotion={reducedMotion} />

      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 4]} intensity={1.8} color="#F4D77B" />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} color="#4B1F6F" />
      <pointLight position={[0, -2, 3]} intensity={0.5} color="#D4AF37" />
      <spotLight
        position={[0, 5, 2]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.2}
        color="#E7C65A"
        castShadow
      />

      <Environment preset="night" />

      <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.08}>
        <GoldRing progressRef={progressRef} reducedMotion={reducedMotion} />
      </Float>

      <GoldDust count={particleCount} />

      {/* Subtle floor reflection plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial
          color="#100719"
          metalness={0.9}
          roughness={0.4}
          transparent
          opacity={0.35}
        />
      </mesh>
    </>
  );
}

export default HeroJewelryScene;
