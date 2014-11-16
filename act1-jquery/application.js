$(function() {

    $("#save-schnippet").on("click", function(event) {
        event.preventDefault();
        alert('you entered: ' + $("#new-schnippet").val());
    });

});

//var myDataRef = new Firebase('https://n97mje20895.firebaseio-demo.com/');
//myDataRef.set('User ' + name + ' says ' + text);
//seting json object: myDataRef.set({name: name, text: text});
//adding to list: myDataRef.push({name: name, text: text});
//myDataRef.on('child_added', function(snapshot) {
//   var message = snapshot.val();
//   displayChatMessage(message.name, message.text);
//});
// function displayChatMessage(name, text) {
//        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
//        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
//      };

