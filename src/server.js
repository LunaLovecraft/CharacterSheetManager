const http = require('http');
const url = require('url');
const qs = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const characterHandler = require('./characterResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Handles requests that are asking for data.
const dataRequest = (request, response, returnBody) => {
  const thisUrl = url.parse(request.url, true);

  switch (thisUrl.pathname) {

    case '/characters':
      characterHandler.getCharacterList(request, response, returnBody, thisUrl);
      break;
    case '/character':

      if (thisUrl.query.id) {
        characterHandler.getCharacter(request, response, returnBody, thisUrl.query.id);
      } else {
        htmlHandler.badRequest(request, response, returnBody);
      }
      break;

    case '/index':
    case '/index.html':
    case '/':
    case '':
      htmlHandler.getIndex(request, response, returnBody);
      break;
    default:
      htmlHandler.fileNotFound(request, response, returnBody);
      break;
  }
};

// The method called back whenever there's a request.
const onRequest = (request, response) => {
  if (request.method === 'GET') {
    dataRequest(request, response, true);
  } else if (request.method === 'HEAD') {
    dataRequest(request, response, false);
  } else if (request.method === 'POST') {
    let body = '';

    request.on('data', (data) => {
      body += data;
    });
    request.on('end', () => {
      // qs.parse gives me an object to call specific information from.
      characterHandler.addCharacter(request, response, qs.parse(body));

      response.writeHead(201, { 'Content-Type': 'text/plain' });
      response.write('Posted!');
      response.end();
    });
  } else {
    htmlHandler.fileNotFound(request, response, true);
  }
};

http.createServer(onRequest).listen(port);
