var five = require("johnny-five");
var myBoard, myLed,myLed2;

myBoard = new five.Board();

myBoard.on("ready", function() {

  myLed = new five.Led(13);
  myLed2 = new five.Led(12);
  myLed.strobe( 30 );
   myLed2.strobe( 50 );
  // make myLED available as "led" in REPL

  this.repl.inject({
    led: myLed
  });

  // try "on", "off", "toggle", "strobe", "stop" (stops strobing)
});