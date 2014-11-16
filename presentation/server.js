<script>

// Kind of a hack, but seems to work!

setTimeout(function() {
  Reveal.initialize({

      multiplex: {
          secret: '14159479085539674986', // Obtained from the socket.io server. Gives this (the master) control of the presentation
          id: '6cb5e06bc659cdea', // Obtained from socket.io server
          url: 'something:1948' // Location of socket.io server
      },

      dependencies: [
          { src: '//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.10/socket.io.min.js', async: true },
          { src: 'plugin/multiplex/master.js', async: true },
    ]});

 }, 1000);

</script>
