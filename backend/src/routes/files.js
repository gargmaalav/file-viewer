import express from 'express';
import multer from 'multer';
import {
  uploadFile,
  listFiles,
  downloadFile
} from '../controllers/files.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), uploadFile);
router.get('/', listFiles);
router.get('/download/:key', downloadFile);

export default router;
