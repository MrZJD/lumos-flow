const path = require('path');
const jimp = require('jimp');

async function main() {
  const image = await jimp.read(path.resolve(__dirname, '../public/source.png'));
  const center = await jimp.read(path.resolve(__dirname, '../public/source.png'));

  const ow = image.getWidth();
  const oh = image.getHeight();

  const aspect = ow / oh;

  const tw = 173;
  const th = 125;

  const ratio = ow / tw;

  const outputW = tw * ratio;
  const outputH = th * ratio;

  const maskW = outputH * aspect;

  // await image.resize(maskW, outputH).write(path.resolve(__dirname, '../public/center.png'));

  await image.blur(20)
    .cover(outputW, outputH, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .blit(center.resize(maskW, outputH), (outputW - maskW) / 2, 0)
    .write(path.resolve(__dirname, '../public/dest.jpg'));
}

main();