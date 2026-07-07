import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, "../../data");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(uploadPath)
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, `${req.body.username}${ext}`); // TODO: might need to update filename
  },
});

export const upload = multer({ storage: storage });
