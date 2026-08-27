import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffprobeInstaller from 'ffprobe-static';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const INPUT_MP4 = path.join(PUBLIC_DIR, 'Jewellery_commercial_for_SSKK_202608271422.mp4');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'hero-video');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const probe = (input) =>
  new Promise((resolve, reject) => {
    ffmpeg.ffprobe(input, (err, data) => (err ? reject(err) : resolve(data)));
  });

const run = (args) =>
  new Promise((resolve, reject) => {
    ffmpeg(args.input)
      .outputOptions(args.options ?? [])
      .output(args.output)
      .on('start', (c) => console.log(`  ffmpeg: ${c.split(' ').slice(0, 10).join(' ')}...`))
      .on('progress', (p) => {
        if (p.frames && p.frames % 60 === 0) process.stdout.write(`    frames: ${p.frames}\r`);
      })
      .on('end', () => {
        const size = fs.existsSync(args.output)
          ? (fs.statSync(args.output).size / 1024 / 1024).toFixed(2)
          : '?';
        console.log(`    ✓ ${path.relative(ROOT, args.output)} (${size} MB)`);
        resolve();
      })
      .on('error', (err, _stdout, stderr) => {
        console.error(`    ✗ ${path.relative(ROOT, args.output)}: ${err.message}`);
        if (stderr) console.error(`    stderr: ${stderr.slice(-500)}`);
        reject(err);
      })
      .run();
  });

const main = async () => {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║  SSKK Commercial → Hero Video Transcoder     ║');
  console.log('╚══════════════════════════════════════════════╝');

  if (!fs.existsSync(INPUT_MP4)) {
    console.error(`✗ Missing source: ${INPUT_MP4}`);
    process.exit(1);
  }
  ensureDir(OUTPUT_DIR);

  const info = await probe(INPUT_MP4);
  const vs = info.streams.find((s) => s.codec_type === 'video');
  const dur = info.format.duration ?? 0;
  console.log(`\nSource: ${path.basename(INPUT_MP4)}`);
  console.log(`  Resolution: ${vs.width}x${vs.height}  Duration: ${dur.toFixed(1)}s  Bitrate: ${(info.format.bit_rate / 1e6).toFixed(2)} Mbps`);

  const isPortrait = vs.height > vs.width;
  console.log(`  Orientation: ${isPortrait ? 'PORTRAIT (mobile-first)' : 'LANDSCAPE'}`);

  const targetDesktop = isPortrait ? { w: 1080, h: 1920, label: 'portrait' } : { w: 1920, h: 1080, label: 'landscape' };
  const desktopScale = `scale=${targetDesktop.w}:${targetDesktop.h}:force_original_aspect_ratio=decrease,pad=${targetDesktop.w}:${targetDesktop.h}:(ow-iw)/2:(oh-ih)/2:black`;
  const mobileScale = 'scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2:black';

  console.log('\n── Desktop hero (hero-desktop) ──');
  await run({
    input: INPUT_MP4,
    output: path.join(OUTPUT_DIR, 'hero-desktop.webm'),
    options: [
      '-y',
      '-vf', desktopScale,
      '-c:v', 'libvpx-vp9',
      '-crf', '30',
      '-b:v', '0',
      '-deadline', 'good',
      '-cpu-used', '1',
      '-row-mt', '1',
      '-tile-columns', '2',
      '-frame-parallel', '1',
      '-auto-alt-ref', '1',
      '-lag-in-frames', '25',
      '-pix_fmt', 'yuv420p',
      '-an',
      '-g', '48',
      '-keyint_min', '24',
    ],
  });
  await run({
    input: INPUT_MP4,
    output: path.join(OUTPUT_DIR, 'hero-desktop.mp4'),
    options: [
      '-y',
      '-vf', desktopScale,
      '-c:v', 'libx264',
      '-preset', 'slow',
      '-crf', '20',
      '-profile:v', 'high',
      '-level', '4.2',
      '-tune', 'grain',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      '-an',
      '-g', '48',
      '-keyint_min', '24',
      '-x264-params', 'open-gop=0:scenecut=40',
    ],
  });

  console.log('\n── Mobile hero (hero-mobile) ──');
  await run({
    input: INPUT_MP4,
    output: path.join(OUTPUT_DIR, 'hero-mobile.webm'),
    options: [
      '-y',
      '-vf', mobileScale,
      '-c:v', 'libvpx-vp9',
      '-crf', '32',
      '-b:v', '0',
      '-deadline', 'good',
      '-cpu-used', '2',
      '-row-mt', '1',
      '-tile-columns', '1',
      '-frame-parallel', '1',
      '-auto-alt-ref', '1',
      '-lag-in-frames', '25',
      '-pix_fmt', 'yuv420p',
      '-an',
      '-g', '48',
    ],
  });
  await run({
    input: INPUT_MP4,
    output: path.join(OUTPUT_DIR, 'hero-mobile.mp4'),
    options: [
      '-y',
      '-vf', mobileScale,
      '-c:v', 'libx264',
      '-preset', 'medium',
      '-crf', '22',
      '-profile:v', 'high',
      '-level', '4.0',
      '-tune', 'grain',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      '-an',
      '-g', '48',
    ],
  });

  const posterTime = Math.max(0.35, Math.min(dur * 0.42, dur - 0.2));
  console.log(`\n── Posters (t = ${posterTime.toFixed(2)}s) ──`);
  const post = (name, scale, out) =>
    run({
      input: INPUT_MP4,
      output: out,
      options: [
        '-y',
        '-ss', posterTime.toFixed(3),
        '-frames:v', '1',
        '-vf', `${scale},format=rgb24`,
        ...(out.endsWith('.webp')
          ? ['-c:v', 'libwebp', '-quality', '84', '-compression_level', '6']
          : ['-c:v', 'mjpeg', '-q:v', '5', '-pix_fmt', 'yuvj420p']),
      ],
    });
  const ds = `scale=${targetDesktop.w}:${targetDesktop.h}:force_original_aspect_ratio=decrease`;
  const ms = 'scale=720:1280:force_original_aspect_ratio=decrease';
  await post('desktop', ds, path.join(OUTPUT_DIR, 'hero-desktop-poster.webp'));
  await post('desktop', ds, path.join(OUTPUT_DIR, 'hero-desktop-poster.jpg'));
  await post('mobile', ms, path.join(OUTPUT_DIR, 'hero-mobile-poster.webp'));
  await post('mobile', ms, path.join(OUTPUT_DIR, 'hero-mobile-poster.jpg'));

  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║  ✓ All transcodes complete!                  ║');
  console.log('╚══════════════════════════════════════════════╝');
};

main().catch((err) => {
  console.error('\n✗ Fatal:', err);
  process.exit(1);
});
