import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log('uploadissa ', req.file);

  await sharp('test/' + req.file.originalname)
    .resize(160, 160)
    .toFile('uploads/' + req.file.filename + '_thumb.png');
  next();
};

export {createThumbnail};
