import express from 'express';
import multer from 'multer';
import {
  uploadFile,
  listFiles,
  downloadFile,
  deleteFile
} from '../controllers/files.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), uploadFile);
router.get('/', listFiles);
router.get('/download/:key', downloadFile);
router.delete('/:key', deleteFile);

export default router;
