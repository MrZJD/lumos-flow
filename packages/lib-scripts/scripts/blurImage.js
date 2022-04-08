const gm = require('gm');

gm('../public/source.png')
  .blur(20)
  .write('../public/output.png', function (err) { 
    if (!err) console.log('done'); 
  });

gm('../public/source.png').size((err, value) => {
  console.log(err, value);
});

// 分割图片
// gm("img.png").crop(width, height, x, y)
