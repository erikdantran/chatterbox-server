/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require('url');
var fs = require('fs');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': '*',
  // 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

// var result = {
//   results: [{
//     'username': 'Mel Brooks',
//     'text': 'It\'s good to be the king',
//     'roomname': 'lobby'
//   }]
// };

var result = {
  results: [{
    username: 'Mel Brooks',
    text: 'It\'s good to be the king',
    roomname: 'lobby'
  },
  {
    username: 'steve',
    text: 'sfsefwef',
    roomname: 'lobby'
  }]
};


var requestHandler = function (request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/


  var actions = request.method; // GET, POST
  var statusCode = 200; // The outgoing status.
  var path = request.url;
  var headers = defaultCorsHeaders;
  // Tell the client we are sending them plain text.
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain';


  // if (path === '/classes/messages') {
  // fs.readFile('chatterbox.html', function (error, data) {
  //   if (error) {
  //     response.writeHead(404);
  //     response.write(error);
  //     response.end();
  //   } else {
  //     response.writeHead(200, { 'Content-Type': 'text/html' });
  //     response.write(data);
  //     response.end();
  //   }
  // });
  // }


  // const stream = fs.createReadStream('chatterbox.html');

  // stream.pipe(response);

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (actions === 'OPTIONS' && request.url.includes('/classes/messages')) {
    response.writeHead(200, headers);
    response.end();
  } else if (actions === 'GET' && request.url.includes('/classes/messages')) {
    console.log('we reached the GET');
    response.writeHead(statusCode, headers);
    // response.end();
    response.end(JSON.stringify(result));

  } else if (actions === 'POST' && request.url.includes('/classes/messages')) {
    statusCode = 201;
    headers['Content-Type'] = 'application/json';
    var data;
    var body = '';

    request.on('data', function (chunk) {
      body += chunk;
    }).on('end', function () {
      data = JSON.parse(body);
      // console.log('after parse: ', data);
      result.results.push(data);
      response.writeHead(statusCode, headers);
      console.log('result: ', result.results);
      response.end(JSON.stringify(result.results));
    });
    // create OPTIONS
    // } else if (actions === 'OPTIONS' && request.url.includes('/classes/messages')) {
    //   response.writeHead(200, headers);
    //   response.end();

  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end('Page not found foo');
  }


  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  // response.end('Hello, World!');

};

exports.requestHandler = requestHandler;

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
// var defaultCorsHeaders = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10 // Seconds.
// };