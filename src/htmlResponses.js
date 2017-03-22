const fs = require('fs');

const indexPath = fs.readFileSync(`${__dirname}/../client/index.html`);
const fileNotFoundPath = fs.readFileSync(`${__dirname}/../client/404.html`);
const badRequestPath = fs.readFileSync(`${__dirname}/../client/400.html`);
const clientPath = fs.readFileSync(`${__dirname}/../src/client.js`);
const stylePath = fs.readFileSync(`${__dirname}/../client/style.css`);

// Returns an HTML page.
const returnPage = (request, response, returnBody, page, errorCode) => {
  response.writeHead(errorCode, { 'Content-Type': 'text/html' });
  if (!returnBody) {
    response.end();
    return;
  }

  response.write(page);
  response.end();
};

const returnScript = (request, response, returnBody, script) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  if (!returnBody) {
    response.end();
    return;
  }

  response.write(script);
  response.end();
};

const returnCSS = (request, response, returnBody, css) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  if (!returnBody) {
    response.end();
    return;
  }

  response.write(css);
  response.end();
};

// Specific functions here are asking for common HTML pages.

// Homepage
const getIndex = (request, response, returnBody) => {
  returnPage(request, response, returnBody, indexPath, 200);
};

// 404
const fileNotFound = (request, response, returnBody) => {
  returnPage(request, response, returnBody, fileNotFoundPath, 404);
};

// 400
const badRequest = (request, response, returnBody) => {
  returnPage(request, response, returnBody, badRequestPath, 400);
};

const client = (request, response, returnBody) => {
  returnScript(request, response, returnBody, clientPath);
};

const style = (request, response, returnBody) => {
  returnCSS(request, response, returnBody, stylePath);
};

module.exports.getIndex = getIndex;
module.exports.fileNotFound = fileNotFound;
module.exports.badRequest = badRequest;
module.exports.client = client;
module.exports.style = style;
