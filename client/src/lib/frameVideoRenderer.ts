/** Ultra-soft easing for frame crossfades — reads as continuous video */
export const smootherstep = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

export interface CanvasMetrics {
  width: number;
  height: number;
  dpr: number;
}

export const syncCanvasSize = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  getDpr: () => number
): CanvasMetrics | null => {
  const dpr = getDpr();
  const parent = canvas.parentElement ?? canvas;
  const rect = parent.getBoundingClientRect();
  let { width, height } = rect;
  if (width === 0 || height === 0) {
    const fallback = canvas.getBoundingClientRect();
    width = fallback.width;
    height = fallback.height;
  }
  if (width === 0 || height === 0) return null;

  const pxW = Math.round(width * dpr);
  const pxH = Math.round(height * dpr);
  if (canvas.width !== pxW || canvas.height !== pxH) {
    canvas.width = pxW;
    canvas.height = pxH;
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  return { width, height, dpr };
};

const computeCoverRect = (
  img: HTMLImageElement,
  width: number,
  height: number,
  scale = 1,
  offsetX = 0,
  offsetY = 0
) => {
  const imgRatio = img.naturalWidth / Math.max(1, img.naturalHeight);
  const canvasRatio = width / Math.max(1, height);
  let drawW: number;
  let drawH: number;
  let safeScale = Math.max(1, scale);

  if (imgRatio > canvasRatio) {
    drawH = height * safeScale;
    drawW = drawH * imgRatio;
  } else {
    drawW = width * safeScale;
    drawH = drawW / imgRatio;
  }

  if (drawW < width || drawH < height) {
    const extraScale = Math.max(width / Math.max(1, drawW), height / Math.max(1, drawH));
    drawW *= extraScale;
    drawH *= extraScale;
  }

  return {
    x: (width - drawW) / 2 + offsetX,
    y: (height - drawH) / 2 + offsetY,
    w: drawW,
    h: drawH,
  };
};

/** Cinematic frame render — crossfade, drift, motion trail for 8K video feel */
export const renderCinematicFrame = (
  ctx: CanvasRenderingContext2D,
  images: HTMLImageElement[],
  progress: number,
  velocity: number,
  metrics: CanvasMetrics,
  options?: { driftIntensity?: number; trailIntensity?: number }
) => {
  const { width, height } = metrics;
  const driftIntensity = options?.driftIntensity ?? 1;
  const trailIntensity = options?.trailIntensity ?? 1;

  ctx.clearRect(0, 0, width, height);
  if (images.length === 0) return;

  const clamped = Math.max(0, Math.min(1, progress));
  const exact = clamped * (images.length - 1);
  const indexA = Math.floor(exact);
  const indexB = Math.min(indexA + 1, images.length - 1);
  const blend = smootherstep(exact - indexA);

  const globalScale = 1.09 - clamped * 0.045;
  const driftX = Math.sin(clamped * Math.PI) * width * 0.005 * driftIntensity;
  const driftY = (clamped - 0.5) * height * 0.007 * driftIntensity;
  const frameDrift = (exact - indexA - 0.5) * width * 0.0025 * driftIntensity;

  const drawLayer = (
    img: HTMLImageElement,
    alpha: number,
    frameIndex: number,
    localBlend: number,
    scaleBoost = 0
  ) => {
    if (!img.complete || !img.naturalWidth || alpha <= 0.001) return;

    const microScale = globalScale + localBlend * 0.005 + scaleBoost;
    const microX = driftX + frameDrift * localBlend + (frameIndex - exact) * width * 0.0008;
    const microY = driftY + (frameIndex - exact) * height * 0.0006;

    const rect = computeCoverRect(img, width, height, microScale, microX, microY);
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h);
  };

  const blurStrength = Math.min(velocity * 26 * trailIntensity, 1);
  if (blurStrength > 0.02 && indexB !== indexA) {
    const trailSteps = 7;
    for (let i = trailSteps; i >= 1; i--) {
      const trailT = (i / trailSteps) * blurStrength * 0.15;
      const trailProgress = clamped - velocity * trailT * 0.32;
      const tExact = Math.max(0, Math.min(1, trailProgress)) * (images.length - 1);
      const tA = Math.floor(tExact);
      const tB = Math.min(tA + 1, images.length - 1);
      const tBlend = smootherstep(tExact - tA);
      drawLayer(images[tA], (1 - tBlend) * trailT, tA, 0, 0.012);
      if (tB !== tA) drawLayer(images[tB], tBlend * trailT, tB, 1, 0.012);
    }
  }

  drawLayer(images[indexA], 1 - blend, indexA, 0);
  if (indexB !== indexA) {
    drawLayer(images[indexB], blend, indexB, 1);
  }

  ctx.globalAlpha = 1;
};
