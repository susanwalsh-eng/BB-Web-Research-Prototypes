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
      res.end("File not found");
      return;
    }

    const mimeType = getMimeType(filePath);
    res.writeHead(200, { "Content-Type": mimeType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;

  // Handle asset path redirects
  if (pathname.startsWith("/BB-Web-Research-Prototypes/prototype-1/")) {
    pathname = pathname.replace(
      "/BB-Web-Research-Prototypes/prototype-1/",
      "/build/prototype-1/"
    );
  } else if (pathname.startsWith("/BB-Web-Research-Prototypes/prototype-2/")) {
    pathname = pathname.replace(
      "/BB-Web-Research-Prototypes/prototype-2/",
      "/build/prototype-2/"
    );
  }

  // Default to index.html for directory requests
  if (pathname === "/") {
    pathname = "/index.html";
  } else if (pathname.endsWith("/")) {
    pathname += "index.html";
  }

  const filePath = path.join(__dirname, pathname);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found");
      return;
    }

    serveFile(filePath, res);
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/`);
  console.log(`📁 Serving files from: ${__dirname}`);
  console.log(`🎯 Prototype 1: http://localhost:${port}/build/prototype-1/`);
  console.log(`🎯 Prototype 2: http://localhost:${port}/build/prototype-2/`);
});
