const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'public/imagen/',
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}_${Date.now()}_${file.originalname}`);
  }
});

module.exports = multer({ storage });