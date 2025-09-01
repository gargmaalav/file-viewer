import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileRoutes from './routes/files.js';

dotenv.config();
console.log('DEBUG: AWS_S3_BUCKET =', process.env.AWS_S3_BUCKET);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log('BUCKET:', process.env.AWS_S3_BUCKET);
