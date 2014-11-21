$(function () {

    var list_template = Handlebars.compile( $("#schnippet-list-template").html() );

    var state = { schnippets: [] };

    // Do initial page render
    function render() {
        // Do initial render
        $("#main").html(list_template(state));
    }

    render();

    function enterKey(element) {
        var KEYCODE_ENTER = 13;
        return element.asEventStream('keyup').filter(function (e) {
            return e.keyCode === KEYCODE_ENTER;
        });
    }

    Bacon.UI = {}
    Bacon.UI.textFieldValue = function (textfield, initValue) {
        function getValue() {
            return textfield.val()
        }

        if (initValue !== null) {
            textfield.val(initValue)
        }
        return textfield.asEventStream("keyup input").
            merge(textfield.asEventStream("cut paste").delay(1)).
            map(getValue).toProperty(getValue()).skipDuplicates()
    }

    // Let's build the list.  Borrowed from TodoMVC
    var entry = $("#new-schnippet"),
        dte   = $("#new-date");
    var newId = enterKey(entry).map(function () {
        return new Date().getTime();
    });

    var schnippetAdded = Bacon.combineTemplate({
        id: newId,
        schnippet: Bacon.UI.textFieldValue(entry).map('.trim'),
        dte: Bacon.UI.textFieldValue(dte)
    }).sampledBy(newId);

    schnippetAdded.onValue(function (obj) {
      console.log(obj);
      entry.val('');

      state.schnippets.push(obj);

      render();
    });

    // todo : wire up event stream from keyboard; add to state; repaint
});
