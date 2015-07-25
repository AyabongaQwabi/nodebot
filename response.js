
    var socket = io();
    $(document).ready(function() {
      //var socket = io.connect('http://localhost');
      $('#button').click(function(e){
        socket.emit('click');
        e.preventDefault();
      });

      socket.on('motion',function(data){
      	alert(data)
      })
    });  
