const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// MIME types for different file extensions
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || "application/octet-stream";
}

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    } else {
      const mimeType = getMimeType(filePath);
      res.writeHead(200, { "Content-Type": mimeType });
      res.end(data);
    }
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Handle root path
  if (pathname === "/") {
    pathname = "/index.html";
  }

  // Handle asset redirects for GitHub Pages compatibility
  if (pathname.startsWith("/BB-Web-Research-Prototypes/prototype-1/")) {
    pathname = pathname.replace(
      "/BB-Web-Research-Prototypes/prototype-1/",
      "/prototype-1/"
    );
  } else if (pathname.startsWith("/BB-Web-Research-Prototypes/prototype-2/")) {
    pathname = pathname.replace(
      "/BB-Web-Research-Prototypes/prototype-2/",
      "/prototype-2/"
    );
  }

  // Handle build directory paths (for legacy compatibility)
  if (pathname.startsWith("/build/prototype-1/")) {
    pathname = pathname.replace("/build/prototype-1/", "/prototype-1/");
  } else if (pathname.startsWith("/build/prototype-2/")) {
    pathname = pathname.replace("/build/prototype-2/", "/prototype-2/");
  }

  // Construct the file path
  const filePath = path.join(__dirname, pathname);

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    } else if (stats.isDirectory()) {
      // Try to serve index.html from the directory
      const indexPath = path.join(filePath, "index.html");
      serveFile(indexPath, res);
    } else {
      serveFile(filePath, res);
    }
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
  console.log(`📁 Serving files from: ${__dirname}`);
  console.log(`🎯 Prototype 1: http://localhost:${PORT}/prototype-1/`);
  console.log(`🎯 Prototype 2: http://localhost:${PORT}/prototype-2/`);
});
