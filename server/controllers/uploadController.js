// controllers/uploadController.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `item-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif/;
  const isExt = allowed.test(path.extname(file.originalname).toLowerCase());
  const isMime = allowed.test(file.mimetype);

  if (isExt && isMime) {
    return cb(null, true);
  }
  cb(new Error('Only image files (JPG, PNG, WEBP, GIF) are allowed.'));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});

const uploadImageHandler = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400);
        return next(new Error('Image size cannot exceed 5MB.'));
      }
      res.status(400);
      return next(new Error(err.message));
    } else if (err) {
      res.status(400);
      return next(err);
    }

    if (!req.file) {
      res.status(400);
      return next(new Error('Please select an image file to upload.'));
    }

    const host = req.get('host') || 'localhost:5000';
    const protocol = req.protocol || 'http';
    const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: 'Photo uploaded successfully!',
      filename: req.file.filename,
      imageUrl,
    });
  });
};

module.exports = { uploadImageHandler };
