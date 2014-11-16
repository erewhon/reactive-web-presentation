<script>

// Kind of a hack, but seems to work!

setTimeout(function() {
  Reveal.initialize({

      multiplex: {
          secret: null, // null so the clients do not have control of the master presentation
          id: '6cb5e06bc659cdea', // Obtained from socket.io server
          url: 'something:1948' // Location of socket.io server
      },

      dependencies: [
          { src: '//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.10/socket.io.min.js', async: true },
          { src: 'plugin/multiplex/client.js', async: true },
    ]});

 }, 1000);

</script>
