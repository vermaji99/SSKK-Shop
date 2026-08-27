import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const HERO_FRAMES_DIR = path.join(PUBLIC_DIR, 'hero-frames');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'hero-video');

const FPS = 12;
const DESKTOP_WIDTH = 1920;
const DESKTOP_HEIGHT = 1080;
const MOBILE_WIDTH = 1080;
const MOBILE_HEIGHT = 1920;

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const generateVideo = async ({ name, width, height, crf, preset, speed }) => {
  const inputPattern = path.join(HERO_FRAMES_DIR, 'frame_%03d.jpg');
  const baseOutput = path.join(OUTPUT_DIR, name);

  console.log(`\n[${name}] Generating ${width}x${height} @ ${FPS}fps...`);
  console.log(`  Input pattern: ${inputPattern}`);

  const runFfmpeg = (format, outputExt, extraArgs = []) =>
    new Promise((resolve, reject) => {
      const outputPath = `${baseOutput}.${outputExt}`;
      console.log(`  → Encoding ${outputExt.toUpperCase()} → ${path.relative(ROOT, outputPath)}`);

      let cmd = ffmpeg(inputPattern)
        .inputFPS(FPS)
        .withSize(`${width}x${height}`)
        .outputOptions([
          '-y',
          '-pix_fmt', format === 'webm' ? 'yuv420p' : 'yuv420p',
          '-movflags', '+faststart',
          '-g', (FPS * 2).toString(),
          '-bf', '2',
          ...extraArgs,
        ]);

      if (format === 'webm') {
        cmd = cmd
          .videoCodec('libvpx-vp9')
          .outputOptions([
            '-crf', crf.toString(),
            '-b:v', '0',
            '-deadline', 'good',
            '-cpu-used', speed === 'fast' ? '2' : '1',
            '-row-mt', '1',
            '-tile-columns', '2',
            '-frame-parallel', '1',
            '-auto-alt-ref', '1',
            '-lag-in-frames', '25',
          ]);
      } else {
        cmd = cmd
          .videoCodec('libx264')
          .outputOptions([
            '-preset', preset,
            '-crf', crf.toString(),
            '-profile:v', 'high',
            '-level', '4.2',
            '-tune', 'grain',
            '-x264-params', 'open-gop=0:scenecut=40:keyint=24',
          ]);
      }

      cmd
        .on('start', (cmdline) => console.log(`    ffmpeg: ${cmdline.split(' ').slice(0, 8).join(' ')}...`))
        .on('progress', (p) => {
          if (p.frames && p.frames % 10 === 0) process.stdout.write(`    frames: ${p.frames}\r`);
        })
        .on('end', () => {
          const size = fs.existsSync(outputPath) ? (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2) : '?';
          console.log(`    ✓ done (${size} MB)`);
          resolve(outputPath);
        })
        .on('error', (err, stdout, stderr) => {
          console.error(`    ✗ failed: ${err.message}`);
          if (stderr) console.error(`    stderr: ${stderr.slice(-600)}`);
          reject(err);
        })
        .save(outputPath);
    });

  await runFfmpeg('webm', 'webm');
  await runFfmpeg('mp4', 'mp4');
};

const generatePoster = async ({ name, width, height }) => {
  const input = path.join(HERO_FRAMES_DIR, 'frame_006.jpg');
  const outputWebp = path.join(OUTPUT_DIR, `${name}-poster.webp`);
  const outputJpg = path.join(OUTPUT_DIR, `${name}-poster.jpg`);

  console.log(`\n[${name}] Generating poster ${width}x${height}...`);

  const encode = (format, output) =>
    new Promise((resolve, reject) => {
      ffmpeg(input)
        .withSize(`${width}x${height}`)
        .outputOptions(['-y', '-frames:v', '1'])
        .outputOptions(
          format === 'webp'
            ? ['-c:v', 'libwebp', '-quality', '82', '-compression_level', '6']
            : ['-c:v', 'mjpeg', '-q:v', '6', '-pix_fmt', 'yuv420p']
        )
        .on('end', () => {
          const size = (fs.statSync(output).size / 1024).toFixed(1);
          console.log(`  ✓ ${format.toUpperCase()} poster (${size} KB)`);
          resolve();
        })
        .on('error', (err, _stdout, stderr) => {
          console.error(`  ✗ ${format} poster failed: ${err.message}`);
          if (stderr) console.error(`    ${stderr.slice(-400)}`);
          reject(err);
        })
        .save(output);
    });

  await encode('webp', outputWebp);
  await encode('jpg', outputJpg);
};

const main = async () => {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║  SSKK Hero Video Generator                   ║');
  console.log('╚══════════════════════════════════════════════╝');

  if (!fs.existsSync(HERO_FRAMES_DIR)) {
    console.error(`✗ Hero frames not found at: ${HERO_FRAMES_DIR}`);
    process.exit(1);
  }

  const frames = fs.readdirSync(HERO_FRAMES_DIR).filter((f) => /^frame_\d+\.jpg$/i).sort();
  console.log(`\nFound ${frames.length} frame images`);
  if (frames.length < 5) {
    console.warn('  ⚠ Low frame count — video will be very short');
  }

  ensureDir(OUTPUT_DIR);

  console.log('\n── Desktop: hero-desktop ──');
  await generateVideo({
    name: 'hero-desktop',
    width: DESKTOP_WIDTH,
    height: DESKTOP_HEIGHT,
    crf: 32,
    preset: 'slow',
    speed: 'normal',
  });
  await generatePoster({ name: 'hero-desktop', width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT });

  console.log('\n── Mobile: hero-mobile ──');
  await generateVideo({
    name: 'hero-mobile',
    width: MOBILE_WIDTH,
    height: MOBILE_HEIGHT,
    crf: 34,
    preset: 'medium',
    speed: 'fast',
  });
  await generatePoster({ name: 'hero-mobile', width: MOBILE_WIDTH, height: MOBILE_HEIGHT });

  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║  ✓ All videos & posters generated!           ║');
  console.log(`║  Output: ${path.relative(ROOT, OUTPUT_DIR)}`);
  console.log('╚══════════════════════════════════════════════╝');
  console.log('\nTo include sourcemap files, run without --production.');
};

main().catch((err) => {
  console.error('\n✗ Fatal error:', err);
  process.exit(1);
});
