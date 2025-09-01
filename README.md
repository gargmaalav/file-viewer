# File Viewer App

A simple file upload, view, and delete application with AWS S3 storage.

## Features
- Upload files via button or drag & drop
- View files in browser
- Delete files with confirmation
- Responsive design for mobile and desktop
- AWS S3 cloud storage

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Storage**: AWS S3
- **Deployment**: Render

## Environment Variables
Create a `.env` file in the `backend` directory with:
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
AWS_S3_BUCKET=your-bucket-name
PORT=5000

## Local Development
1. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. Update  (in root directory)
Replace the existing content with:
```
<userPrompt>
Provide the fully rewritten file, incorporating the suggested code change. You must produce the complete file.
</userPrompt>
## 3. Create  (in root directory)
```json
{
  "scripts": {
    "build": "cd frontend && npm install && npm run build",
    "start": "cd backend && npm install && npm start"
  }
}
```