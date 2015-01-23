var Hapi = require('hapi');
// Create a server object 
var server = new Hapi.Server();
var fs = require('fs');

// Set the filename of our log file
var logfile = "server.log";

// Setup the port for the server
server.connection({ port: 1337 });

var storedCommand = "";  // We setup an empty command because there's no commands when we first start the server

/* 
 * Two endpoints.
 *
 * 1. Twilio hits an endpoint that parses the data and stores a command with the phone number
 *   a. There is only one command per phone number ever.
 * 2. The python script hits an endpoint with a phone number that will fetch the current command
 */

// This handles logging.  We declare a function, and pass a message to it as an argument.  
// That message gets logged to the log file we declared.
function logMessage(message) {
  // The \n is a "newline" character
  fs.appendFile(logfile, message+"\n", function (err) {
    if (err) {
      console.log("There as an error: "+err);
    }
  });
}

// Setup a server route.  This means when you hit the webpage at /getCommand/7028675309 
// it will call this route and execute the handler.
server.route({
  method:'GET',
  path: '/getCommand/{phoneNumber}',
  handler: function(request, reply) {
    // Fetch data from database with Phone Number
    // return command
    reply(storedCommand);
    // delete the stored command
    storedCommand = "";
  }
});


// This does the same as above.  When Twilio gets a text message, it will POST data to this url.
// That means it will "request" this url with a "payload" of data that we can access.
server.route({ 
  method:'POST',
  path: '/postCommand',
  handler: function(request, reply) {
    var fromNumber = request.payload.To;
    var message = request.payload.Body;
    // Log entire payload from request
    logMessage(JSON.stringify(request.payload));
    console.log("Message: "+message+", number: "+fromNumber);
    // Store the command
    storedCommand = message;

  }
});

server.start(function() {
  console.log("server running at ", server.info.uri);
});


