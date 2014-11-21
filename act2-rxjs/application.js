//
// RxJS!
//
$(function() {

    var schnippets = new Firebase('https://schnippets.firebaseio.com/schnippets');

    $(document).on('submit', '#schnippet-form', function(event) {
        event.preventDefault();

        var dte = $('#new-date').val(),
            txt = $('#new-schnippet').val();

        schnippets.push({ date: dte, txt: txt });

        $('#new-date').val('');
        $('#new-schnippet').val('');
    });

    //
    // Any time the schnippets change, we redraw the entire list.  (Although that's
    //   extra work, it's fast enough.)
    //
    schnippets.on('value', function(snapshot) {
        $('#schnippet-list').empty();

        $.each(snapshot.val(), function(k,v) {
            displaySchnippet(v.date, v.txt, k);
        });
    });

    //
    // When user clicks delete, remove the node.  Event on 'body' because
    //   of the way we dynamically add nodes.
    //
    $('body').on('click', '.delete-button', function() {
        var key = $(this).data('key');

        schnippets.child(key).remove();
    });
});

function displaySchnippet(dte, txt, key) {
    $(["<dt class='schnippet-date'>", dte,
       "<button class='delete-button' data-key='", key, "'>Delete</button>",
       '</dt>',
       "<dd class='schnippet-value'>", txt, '<dd>'].join('')).prependTo($("#schnippet-list"));
}
