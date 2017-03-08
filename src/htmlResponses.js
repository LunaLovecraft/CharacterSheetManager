const fs = require('fs');

const indexPath = fs.readFileSync(`${__dirname}/../client/index.html`);
const fileNotFoundPath = fs.readFileSync(`${__dirname}/../client/404.html`);
const badRequestPath = fs.readFileSync(`${__dirname}/../client/400.html`);

// Returns an HTML page.
const returnPage = (request, response, returnBody, page) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });

  if (!returnBody) {
    response.end();
    return;
  }

  response.write(page);
  response.end();
};

// Specific functions here are asking for common HTML pages.

// Homepage
const getIndex = (request, response, returnBody) => {
  returnPage(request, response, returnBody, indexPath);
};

// 404
const fileNotFound = (request, response, returnBody) => {
  returnPage(request, response, returnBody, fileNotFoundPath);
};

// 400
const badRequest = (request, response, returnBody) => {
  returnPage(request, response, returnBody, badRequestPath);
};


module.exports.getIndex = getIndex;
module.exports.fileNotFound = fileNotFound;
module.exports.badRequest = badRequest;
