$(function () {

    var main_template = Handlebars.compile( $("#main-template").html() );
    var list_template = Handlebars.compile( $("#schnippet-list-template").html() );

    var state = { schnippets: [] };

    // Do initial page render
    function render() {
        // Do initial render
        $("#main").html(list_template(state));
    }

    $("body").html(main_template());
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

//        function autofillPoller() {
//          if (textfield.attr("type") == "password")
//            return Bacon.interval(100)
//          else if (isChrome)
//            return Bacon.interval(100).take(20).map(getValue).filter(nonEmpty).take(1)
//          else
//            return Bacon.never()
//        }
        if (initValue !== null) {
            textfield.val(initValue)
        }
        return textfield.asEventStream("keyup input").
            merge(textfield.asEventStream("cut paste").delay(1)).
            //merge(autofillPoller()).
            map(getValue).toProperty(getValue()).skipDuplicates()
    }

    // Let's build the list.  Borrowed from TodoMVC
    var entry = $("#new-schnippet");
    var newId = enterKey(entry).map(function () {
        return new Date().getTime();
    });

    var schnippetAdded = Bacon.combineTemplate({
        id: newId,
        schnippet: Bacon.UI.textFieldValue(entry).map('.trim')
    }).sampledBy(newId).filter('.schnippet');

    schnippetAdded.onValue(function (txt) {
        entry.val('');

        state.schnippets.push(txt);

        render();
    });

    // todo : wire up event stream from keyboard; add to state; repaint
});
