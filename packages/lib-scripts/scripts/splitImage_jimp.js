const fs = require('fs');
const path = require('path');
const jimp = require('jimp');

const inputDir = '/xxx';

async function splitPic(urlPath) {
  const image = await jimp.read(urlPath);

  const urlPathObj = path.parse(urlPath);

  const ow = image.getWidth();
  const oh = image.getHeight();

  const deltaH = 400;
  const loop = Math.ceil(oh / deltaH);

  for (let i = 0; i < loop; i++) {
    const ih = (i + 1) * deltaH > oh ? oh - i * deltaH : deltaH;

    const ref = await jimp.read(urlPath);
    await ref.crop(0, i * deltaH, ow, ih)
      .write(path.resolve(urlPathObj.dir, 'output', urlPathObj.name, `slice_${i + 1}.jpg`));
  }
}

async function main() {
  const result = fs.readdirSync(inputDir);

  const allProcess = result.map((item) => {
    const isPicture = /(jp(e)?g)|(png)$/.test(item);

    if (!isPicture) {
      return;
    }

    return splitPic(path.resolve(inputDir, item));
  }).filter((item) => !!item);

  await Promise.all(allProcess);
}

main();
