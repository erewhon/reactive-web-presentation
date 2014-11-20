% (Functional) Reactive Web Development
% Steven Byrnes
% November 19, 2014

## Abstract

> We will look at a few language and library options for doing
> (functional) reactive web development, including Elm, RxJS, and
> BaconJS. F# may make a brief guest appearance in the stack as
> well.

<aside class="notes">

I'm not going to do a game.  I can barely play angry birds, and it was
done very well last month, so I'm not going to do that.

Last month, the richness of the Javascript ecosystem was mentioned.
It's beyond rich… it's ridiculous.

This presentation is in Reveal.JS.  I highly recommend it.  Good stuff...

I mentioned F#.  But that didn't happen.  Sorry...  that could be a
topic for another day...

</aside>

# Prologue

## What is (F)RP?

## Reactive Programming

<aside class="notes">

How many people have worked with Reactive Programming or FRP?

First, why the scare parenthesis?


I put the functional in parenthesis, as some things are not really
functional reactive, but merely reactive.  At it's simplest, think of
a spreadsheet.  You update a cell, and if that cell is referenced
elsewhere, they are automatically recomputed.

RxJava started calling themself FRP, but changed it to just RP.
However, according to this [presentation][SL2014] at Strangeloop, put
it under formulation of FRP.


Basically, it depends on your constraints.

First, let's talk about what it is.

</aside>


## Definition

> Functional reactive programming (FRP) is a programming
> paradigm for reactive programming using the building blocks
> of functional programming. FRP has been used for
> programming *graphical user interfaces* (GUIs), robotics, and music,
> aiming to simplify these problems by explicitly modeling time.
>
> &mdash; <cite>[Wikipedia][1]</cite>

[1]:http://en.wikipedia.org/wiki/Functional_reactive_programming

## What?

![](images/LolWut!.gif)

## Continuous vs discrete

<aside class="notes">

In languages and environments with discrete semantics, updates are per event.  Elm works this way.  We'll get to that later.

But what's the alternative?  Continuous semantics.  It uses continuous functions that vary over time.

</aside>

## Push vs pull

<aside class="notes">

In some FRP systems, events are pushed to you.  In others, you pull events.  (When you want the result, it works back to see what you want.)

There is also a hybrid type, push-pull.  For example, some pull-based streams could act like lazy lists.  Events from the user, for example, would be push-based streams.

</aside>


## Different constraints

<aside class="notes">

Dynamic vs static graphs.  Things like can you add and remove event
streams dynamically?  Synchronous vs asynchronous.  Infinite signals.

</aside>

## Why?

- Declarative rather than imperative
- Easier to reason about
- Composability

<aside class="notes">
</aside>

# Act 1 - "Old Sk00l"

## A Simple Model

<aside class="notes">

Act 1 : Set Up

The canonical example for MVC frameworks is the todo app.  Let's try a
couple of other things...

Google has something called Snippets, which they use internally for
people to record what they've done.  Think of a combination of status
reports, progress meetings, and a work diary.

A commercial offering that attempts to produce this is
[iDoneThis](https://idonethis.com/home/).

Let's create a simple thing.  Call it Schnippets.

Basically, there is 1 main model: status report.  To keep it simple,
let's just take a date and a big block of text.  Perhaps we can treat
it as markdown.  We'll call this a Schnippet.

There are other concepts, like a user.  Someone who logs into the
system.  They have an email address so we can bug them.  We can add
things like following relationships.  Perhaps tags for the person or
the schnippet.  But to keep it simple, I'm just going to stick with
the base model.

</aside>

## Just HTML

<aside class="notes">

Demo time.

http://localhost:8080/act1-jquery/schnippets.html

Ok, so that's boring.  It doesn't do anything.

Actually, it does some simple validation thanks to HTML5.

It isn't very composable.  Very very simple.  Honestly, almost no
styling.  I could have added bootstrap.  But decided not to.

</aside>

## jQuery

~~~~~~~ {.javascript}
$("button#specialness")
  .html("Don't click here!")
  .on( "click", somethingMagickal );
~~~~~~~

--------

For example:

~~~~~~~ {.javascript}
    $("#save-schnippet").on("click", function(event) {
        event.preventDefault();
        alert('you entered: ' + $("#new-schnippet").val());
    });
~~~~~~~

<aside class="notes">

While jQuery isn't "reactive", it isn't procedural either.  One could
consider it a fluent interface.  It lets us map across selectors and
do things.  So in that sense, it's functional.  Unfortunately, it
doesn't go all the way.  So you still end up with a tangled mess of
callbacks.

As an aside: since this is a presentation about web development, I'm
not going to get into any backend API.  So I'm going to use Firebase,
one of the database-as-a-services out there.  (And which recently was
bought by Google.)

Ok... back to the code.  So, this isn't too bad.  What are some of the
problems?

It has callbacks.  You can start running into issues with nested callbacks
if you have async behavior in your callbacks.  That can get messy quickly.

You're dealing with two languages: HTML and Javascript.  Actually 3 if
you include CSS.  There are HTML tags in the Javascript.  You can
mitigate it with templates, but still not ideal.  Also, nothing is
making sure your selectors are named the same in your code and in your
markup.

No composability.  So I'm repeating HTML over and over again.  Again,
  templates can help with that.



And some issues fundamental to Javascript:

Lack of type safety.

Lack of property and selector safety.  I can type the wrong property
and it will still run... poorly.  It just won't work the way you
want to.

Now, some of these issues we don't have a good answer for.  Although
certain IDEs are smart enough to tell you you're messing up.  (For
example, some of the Jetbrains IDEs.)

</aside>

---------

~~~~~~~~
$  diff -u act1-html/schnippets.html act1-jquery/schnippets.html
     <link rel="stylesheet" href="../schnippets.css">
+    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
+    <script type="text/javascript" src='https://cdn.firebase.com/js/client/1.1.1/firebase.js'></script>
+    <script type="text/javascript" src="application.js"></script>
   </head>
~~~~~~~~

<aside class="notes">

So if we compare the plain HTML and jQuery version, there's basically
no difference between the markup, except we've included some
Javascript.  (I'm not going to do this kind of diff every time, but
for the most part, this will be the story going forward.)

</aside>

# Act 2 - Reactive

## RxJS

- $RxJS = Observables + LINQ + Schedulers$
- [http://reactive-extensions.github.io/RxJS/](http://reactive-extensions.github.io/RxJS/)

<aside class="notes">

Act 2 : Confrontation: Where we use an existing language (Javascript),
and add a Reactive library.

Can help with callback hell.  Client and server side.  Same as
Reactive extensions you can get for .NET, Java, etc.

> The Reactive Extensions (Rx) is a library for composing asynchronous
> and event-based programs using observable sequences and LINQ-style
> query operators.

What is an Observable?  On one end, you have the iterable pattern,
which is pull-based.  On the other end, you have the observer pattern,
which is push based.  The Observable in Rx is like the Observer
pattern.  It defines a subscriber that is called on each message, on
error, and when complete.


LINQ?  In the sense of the querying.  Not the language extensions you
get in C#.

What is a scheduler?  Adds concurrency.  (Although typically there are
limited opportunities to do that in browser.)



RxJS lets you wrap many things in an Observable.  You can wrap events
(native, jQuery, Angular, etc).  Anything that returns a Promises A+
promise. For example, from a jQuery AJAX call.

For example, autocomplete becomes pretty simple.


</aside>

## Example

~~~~~~~ {.javascript .numberLines}
function searchWikipedia (term) {
   return $.ajax({
     url: 'http://en.wikipedia.org/w/api.php',
     dataType: 'jsonp',
     data: {
       action: 'opensearch',
       format: 'json',
       search: global.encodeURI(term)
     }
   }).promise();
}

var keyup = Rx.Observable.fromEvent($('#textInput'), 'keyup')
      .map((e) => e.target.value)        // Project the text from input
      .filter((text) => text.length > 2) // Text is longer than 2 chars
      .throttle(750)                     // Pause for 750ms
      .distinctUntilChanged();           // Only if the value changed

var searcher = keyup.flatMapLatest(searchWikipedia);

var subscription = searcher.subscribe( (data) => console.log(data) );
~~~~~~~ 

<aside class="notes">

This is adapted from one of the RxJS examples.  It's using ECMAScript
6 syntax.  I think.  :-)

So you can see a few different things going on here.  We create an
observable from keyup events on a control.  We extract the text,
filter it, debounce (using the throttle), and filter out duplicates.
(For example, you're using arrow keys; don't want that to trigger new
queries.)  We then flatMapLatest on a wikipedia search.  And finally,
we subscribe and print the data that is returned.

</aside>

## Bacon.JS

BaconJS?

. . .

![Double bacon](images/ApXfKXgCIAAdg0S.jpg)

<aside class="notes">
include link to https://twitter.com/archerprod/status/186300328801607680
</aside>


## Bacon.JS

No... neither of those...

. . .

![http://baconjs.github.io/](images/baconjs-logo.png)

<aside class="notes">

It's very similar to RxJS.  Actually, it's inspired by RxJS.  It has 2 flavors of observable: EventStream and Property.  (xxx : what?)  

</aside>

## Differences

RxJS:

~~~~~~~ {.javascript}
var keyup = Rx.Observable.fromEvent($('#textInput'), 'keyup')
~~~~~~~

BaconJS:

~~~~~~~ {.javascript}
var keyup = $('#textInput').asEventStream('keyup')
~~~~~~~

<aside class="notes">

Some differences.

</aside>


## BaconJS - Demo

<aside class="notes">

So let's see what it looks like...

</aside>

# Act 3 - First Class FRP

## Elm

- First order FRP
- Haskell-like syntax ([but not Haskell](https://groups.google.com/forum/#!msg/elm-discuss/rI_IAf4TiAA/KTvQv1LQ6uAJ))
- Code hot swapping!  In the browser!
- Time traveling debugger!

<aside class="notes">

Act 3 : Resolution, where we find a (possibly) better solution using a new language.

Very similar to Haskell.  But also borrows some syntax from F#.

Time traveling debugger is called Reactor.

It's still a relatively young language.  It's not Javascript, which is
a feature in my mind.  When I started with it, it was kind of painful,
as it was a lot more literal.  Compilation errors kept stopping me.
Then I embraced it, and it was quite nice.

It has a stronger front end story right now.  The Elm REPL runs on
Node, so it might eventually get a stronger backend story.

</aside>

## Hello World

```haskell
main : Element

main = asText "Hello world"
```

## Getting started

- elm_dependencies.json
- elm-get install
- elm --make --only-js Schnippets.elm
- elm-reactor

<aside class="notes">
~~~~ {.javascript .numberLines}
{
    "version": "0.5",
    "summary": "Schnippets!",
    "description": "Schnippet!",
    "license": "BSD3",
    "exposed-modules": [],
    "elm-version": "0.13",
    "dependencies": {
        "evancz/elm-html": "0.2"
    },
    "repository": "https://github.com/USER/PROJECT.git"
}
~~~~

- https://github.com/elm-lang/elm-platform
- https://github.com/michaelbjames/elm-examples
</aside>

## Demo - Schnippets

        $ cd act3-elm && elm-reactor
        Elm Reactor 0.1, backed by version 0.13 of the compiler.
        Listening on http://localhost:8000/

<aside class="notes">

Let's look at this in the Elm reactor.

First, let's look at a simple Elm program with embedded markdown.

Then, let's look at Schnippets.  Enter a few schnippets.  See events
count increasing.  You can scrub back and forth.  Now, let's change
the code.  Change text for date.  (Or change it back.)



xxx : Buttonz?

</aside>

# Epilogue

## Functional?  Reactive?

<aside class="notes">

So, Elm is a decent amount of code on the surface.  But over half of
it is the HTML and CSS.

I think it's a promising AltJS language.  Native functional reactive
programming is great.  When there are native bindings to existing
libraries, it's pretty great.

For certain domains (dare I say: game development), it's quite
powerful.

</aside>

# Fin

## 

![](images/1654069.jpg)


## Other AltJS

If you like Haskell-like syntax for web development, there are several
other functional AltJs languages out there: Roy, Haste, Fay, Elm,
GHCJS, PureScript.

<aside>
http://purescript.readthedocs.org/en/latest/intro.html#related-projects
</aside>

## Further Reading

[SL2014]: https://www.youtube.com/watch?v=Agu6jipKfYw "Controlling Time And Space: understanding the many formulations of FRP"
[ReMan]: http://www.reactivemanifesto.org/
[Hipster]:http://www.infoq.com/presentations/game-functional-reactive-programming
[Missing]:https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
[Learn]:http://reactive-extensions.github.io/learnrx/
[Netflix]:https://www.youtube.com/watch?v=FAZJsxcykPs&list=PLfXiENmg6yyU5kEHyo1kYkq7HEzBOoiTT
[Manifesto]:http://www.reactivemanifesto.org/

Presentations and intros:
- [Controlling Time and Space: Understanding the Many Formulations of FRP][SL2014]
- [The introduction to Reactive Programming you've been missing][Missing]
- [Functional Programming in Javascript][Learn]
- [Netflix JavaScript Talks - Async JavaScript with Reactive Extensions][Netflix]
- [What Every Hipster Should Know About Functional Reactive Programming][Hipster]
- [Reactive Manifesto][Manifesto]

RxJS:
- [Home](http://reactive-extensions.github.io/RxJS/)
- [Examples](https://github.com/Reactive-Extensions/RxJS/tree/master/examples)
- [Firebase binding](https://gist.github.com/gsoltis/ee20138502a4764650f2)
- [Time Flies like an Arrow](http://jsfiddle.net/mattpodwysocki/9EjSQ/)

BaconJS:
- [Home](http://baconjs.github.io/)
- [Making a snake game in BaconJS](http://philipnilsson.github.io/badness/)

Elm:
- [Home](http://elm-lang.org/)
- [Todo](https://github.com/evancz/elm-todomvc)
- [Elmtris](https://github.com/jcollard/elmtris)
- [Pong](http://elm-lang.org/edit/examples/Intermediate/Pong.elm)
- [On how to structure an Elm application](https://gist.github.com/evancz/2b2ba366cae1887fe621)
- [Elm: Concurrent FRP for Functional GUIs](http://elm-lang.org/papers/concurrent-frp.pdf)

Other interesting projects:
- [Radioactive](https://www.npmjs.org/package/radioactive)

## Thank You

erewhon @ { [flatland](http://flatland.biz/) | [github](https://github.com/erewhon) | [.tx]() }

<aside class="notes">

Also Facebook, Flickr, Twitter...

[facebook](http://facebook.com/erehon) /
[twitter]() /

This presentation is on github.

</aside>



