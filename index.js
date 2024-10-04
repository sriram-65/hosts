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
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Static Hosting Platform</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Arial', sans-serif;
                background-color: #f0f0f0;
                color: #333;
            }

            header {
                background-color: #4CAF50;
                color: #fff;
                padding: 20px;
                text-align: center;
            }

            main {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 80vh;
                margin: 0;
            }

            .upload-container {
                background-color: #fff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                text-align: center;
                width: 100%;
                max-width: 400px;
            }

            h1 {
                margin-bottom: 20px;
                font-size: 24px;
            }

            input[type="file"] {
                display: block;
                margin: 20px auto;
                padding: 10px;
                width: 100%;
                border: 2px solid #4CAF50;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
            }

            button {
                background-color: #4CAF50;
                color: white;
                padding: 12px 20px;
                margin: 10px 0;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 18px;
                width: 100%;
                transition: background-color 0.3s;
            }

            button:hover {
                background-color: #45a049;
            }

            footer {
                background-color: #4CAF50;
                color: white;
                text-align: center;
                padding: 10px;
                position: fixed;
                bottom: 0;
                width: 100%;
            }

            @media (max-width: 600px) {
                main {
                    height: auto;
                    padding: 20px;
                }
                
                .upload-container {
                    width: 90%;
                }
            }
        </style>
    </head>
    <body>
        <header>
            <h1>Static Hosting Platform</h1>
        </header>

        <main>
            <div class="upload-container">
                <h1>Upload Your Files</h1>
                <form action="/upload" enctype="multipart/form-data" method="POST">
                    <input type="file" name="file" accept=".html,.css,.js" required />
                    <button type="submit">Upload File</button>
                </form>
            </div>
        </main>

        <footer>
            <p>&copy; 2024 Your Name. All rights reserved.</p>
        </footer>

        <script>
            function copyToClipboard(text) {
                navigator.clipboard.writeText(text).then(() => {
                    alert('URL copied to clipboard!');
                }, () => {
                    alert('Failed to copy the URL.');
                });
            }
        </script>
    </body>
    </html>
  `);
});

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  const fileUrl = `/static/${req.file.originalname}`;
  
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>File Uploaded</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f0f0f0;
                color: #333;
                margin: 0;
                padding: 0;
            }

            header {
                background-color: #4CAF50;
                color: #fff;
                padding: 20px;
                text-align: center;
            }

            main {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 80vh;
                margin: 0;
            }

            .upload-container {
                background-color: #fff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                text-align: center;
                width: 100%;
                max-width: 400px;
            }

            h2, h3 {
                margin: 20px 0;
            }

            button {
                background-color: #4CAF50;
                color: white;
                padding: 12px 20px;
                margin: 10px 0;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 18px;
                width: 100%;
            }

            button:hover {
                background-color: #45a049;
            }

            footer {
                background-color: #4CAF50;
                color: white;
                text-align: center;
                padding: 10px;
                position: fixed;
                bottom: 0;
                width: 100%;
            }

            @media (max-width: 600px) {
                main {
                    height: auto;
                    padding: 20px;
                }
                
                .upload-container {
                    width: 90%;
                }
            }
        </style>
    </head>
    <body>
        <header>
            <h1>Static Hosting Platform</h1>
            <p> Thanks For Your Support From Maduari </p>
        </header>

        <main>
            <div class="upload-container">
                <h2>File uploaded and Hosted successfully!</h2>
                <button onclick="copyToClipboard('https://sriramhosting.serveo.net${fileUrl}')">Copy File URL</button>
                <h3><a href="${fileUrl}" target="_blank">View File</a></h3>
            </div>
        </main>

        <footer>
            <p>&copy; 2024 Sriram. All rights reserved.</p>
        </footer>

        <script>
            function copyToClipboard(text) {
                navigator.clipboard.writeText(text).then(() => {
                    alert('URL copied to clipboard!');
                }, () => {
                    alert('Failed to copy the URL.');
                });
            }
        </script>
    </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
