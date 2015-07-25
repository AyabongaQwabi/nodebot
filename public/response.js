
    var socket = io();
    $(document).ready(function() {
      //var socket = io.connect('http://localhost');
      $('#button').click(function(e){
        socket.emit('click');
        e.preventDefault();
      });

      socket.on('motion',function(data){
      	console.log(data)
      	$("#motionData").html("<h2>"+data.response+"</h6><hr><h2>"+data.distanc+"</h2>");
      	if(data.motion == 0){
      		motionEnded();
      	}
      })

      function motionStart(){

      }
      function motionEnded(){

			var clock;

			clock = $('#timer').FlipClock({
		        clockFace: 'DailyCounter',
		        autoStart: true
		        
		    });
				    
		    clock.start();

      }
    });
