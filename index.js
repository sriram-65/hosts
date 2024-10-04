const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 3000;

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Uploads directory to store the files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original filename
  }
});

const upload = multer({ storage: storage });

// Serve static files from the "uploads" directory
app.use('/static', express.static(path.join(__dirname, 'uploads')));

// Home route
app.get('/', (req, res) => {
  res.send(`
    <h1>Static Hosting Platform</h1>
    <form action="/upload" enctype="multipart/form-data" method="POST">
      <input type="file" name="file" accept=".html,.css,.js" />
      <button type="submit">Upload File</button>
    </form>
    <div id="result"></div>
    <script>
      function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
          alert('URL copied to clipboard!');
        }, () => {
          alert('Failed to copy the URL.');
        });
      }
    </script>
  `);
});

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  const fileUrl = `/static/${req.file.originalname}`;
  
  res.send(`
    <h2>File uploaded successfully:</h2>
    <button onclick="copyToClipboard('https://sriramhosting.serveo.net${fileUrl}')">Copy File URL</button>
    <h3><a href="${fileUrl}" target="_blank">View File</a></h3>
    <script>
      function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
          alert('URL copied to clipboard!');
        }, () => {
          alert('Failed to copy the URL.');
        });
      }
    </script>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
