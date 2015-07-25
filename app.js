var http = require('http');
var express =require('express'),
    app = module.exports.app = express(),
    io = require('socket.io'),
    fs = require('fs'),
    five = require('johnny-five'),
    board,sensor,ping,motion,led1,led2,led3,distance;


var server =http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(8080);


board = new five.Board();

app.use(express.static('public'));

board.on("ready", function() {

  motion = new five.Motion(7)
  ping = new five.Ping(8)

  led = new five.Led(13);
  led2 = new five.Led(12);
 
 
  console.log("Board is Ready")

  function armLights(data){
       led.strobe(data)
     
       led2.strobe(data);
  }
  function disarmLights(){
       led.stop();
         led2.stop();
      
  }


  
  var dist =[];
  motion.on('motionstart',function(err,result){
      console.log("Motion Occured :\n")
    
       var time = new Date();
  
        var response =" Movement Occured @"+time.toLocaleTimeString(); 

         ping.on('change',function(){
          console.log("DIstance:"+dist)
          if(dist.length < 1){dist.push(Math.round(this.cm))};

                armLights(this.cm)
            var distanc ="First distance is : <b>"+dist[0]+"</b>cm<br> and now :"+this.cm+" centimeters away"
            io.emit('motion',{response:response,motion:1,time:time.toLocaleTimeString(),distanc:distanc})
         })
         
         console.log('emitted motion start data'+err)
  })

  motion.on('motionend',function(err,results){
      
       var time = new Date();
       disarmLights();
       var response =" Movement Stoppped at : "+time.toLocaleTimeString();
         
         io.emit('motion',{response:response,motion:0,time:time.toLocaleTimeString()})
         console.log('emitted motion end data')
      
  })

  io.sockets.on('connection', function (socket) {
    socket.on('click', function () {
      console.log("client click")

      led.toggle();
    });
  }); 
});