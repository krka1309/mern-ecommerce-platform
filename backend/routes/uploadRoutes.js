const express = require("express");
const path = require("path");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/i;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", async (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "File uploaded successfully",
        image: `/${req.file.path.replace(/\\/g, "/")}`,
      });
    } else {
      res.status(400).json({ message: "No image was selected" });
    }
  });
});

module.exports = router;
