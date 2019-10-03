    var app = require('express')();
    var server = require('http').Server(app);
    var io = require('socket.io')(server);

    app.set('PORT', 5000);
    server.listen(app.get('PORT'));
    // app.listen(80) will NOT work here!

    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/index.html');
    });

    io.on('connection', function (socket) {
      // Catch the messages emitted by client with event 'send message'
      socket.on('send message', function (data) {
        console.log(data);
        var message = data.msg.toString();
        console.log('message: ', message);
        if(message.slice(0,2) === 'Hi' || message.slice(0,3)==='Hey'){
          socket.emit('new message', {msg: "I can help you with queries"});
        }
        else if(message.slice(0,6) === 'Thanks' || message.slice(0,9) === "Thank you" || message.slice(0,3) === "Bye"){
          socket.emit('new message', {msg: "Thanks for using BOT. GoodBye"});
        }
        else {
          console.log('receiving send message from client.... ', data.msg);
        }
      });

    });
