import {
  s3Upload,
  s3ListFiles,
  s3Download
} from '../utils/s3.js';

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });
    const result = await s3Upload(file);
    res.json({ message: 'File uploaded', key: result.Key, url: result.Location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listFiles = async (req, res) => {
  try {
    const files = await s3ListFiles();
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const key = req.params.key;
    const fileStream = await s3Download(key);
    fileStream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
