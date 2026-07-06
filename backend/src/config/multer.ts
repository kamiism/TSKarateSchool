import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./data/");
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.username}`); // TODO: might need to update filename
  },
});

export const upload = multer({ storage: storage });
