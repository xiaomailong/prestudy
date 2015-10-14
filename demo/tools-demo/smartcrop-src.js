var SmartCrop = require('smartcrop');

SmartCrop.crop(image, {
    width: 100,
    height: 100
  },
  function(result) {
    console.log(result);
    // {topCrop: {x: 300, y: 200, height: 200, width: 200}}
  });
