% (Functional) Reactive Web Development
% Steven Byrnes
% November 19, 2014

## Abstract

> We will look at a few language and library options for doing
> (functional) reactive web development, including Elm, RxJS, and
> BaconJS. F# may make a brief guest appearance in the stack as
> well.

<aside class="notes">

What is Functional Reactive Programming?

Sense of time.




I'm not going to do a game.  I can barely play angry birds, and it was
done very well last month, so I'm not going to do that.

"Last month, the richness of the Javascript ecosystem was mentioned.
It's beyond rich… it's ridiculous."

https://github.com/hakimel/reveal.js



</aside>

# What is (F)RP?

<aside class="notes">

First, why the scare parenthesis?

I put the functional in parenthesis, as some things are not really
functional reactive, but merely reactive.  At it's simplest, think of
a spreadsheet.  You update a cell, and if that cell is referenced
elsewhere, they are automatically recomputed.

RxJava started calling themself FRP, but changed it to just RP.
However, according to presentation at [Strangeloop][SL2014], put it under formulation of FRP



</aside>

## Reactive Programming

<aside class="notes">

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

## Continuous vs discrete time

<aside class="">

For some systems, 

</aside>

## Push vs pull

<aside class="">

In some FRP systems, events are pushed to you.  In others, you pull events.

</aside>

## Different constraints

<aside class="notes">

From presentation.

Things like can you add and remove event streams dynamically?

</aside>

## Why?

- Easier to follow flow
- Declarative rather than imperative
- Composability
- Functional or fluent interfaces

# Act 1 - "Old Sk00l"

<aside class="notes">

Act 1 : Set Up

</aside>

## A Simple Model

... include a sketch here of a screen ...

<aside class="notes">

The canonical example for MVC frameworks is the todo app.  Let's try a
couple of other things...

Google has something called Snippets, which they use internally for
people to record what they've done.  Think of a combination of status
reports, progress meetings, and a work diary.

A commericial offering that attempts to produce this is [iDoneThis](https://idonethis.com/home/).

Let's create a simple thing.  Call it Schnippets.

Basically, there are 2 main models.

1. A status report.  To keep it simple, let's just take a big block of
   text.  Perhaps we can treat it as markdown.  We'll call this a
   Schnippet.
2. A user.  Someone who logs into the system.  They have an email
   address so we can bug them.

We can add things like following relationships.  Perhaps tags for the
person or the schnippet.  We can get fancier later.

</aside>

## Just HTML

<aside class="notes">

http://localhost:8080/act1-jquery/schnippets.html

Ok, so that's boring.  It doesn't do anything.

Not very composable.

Very very simple.  Honestly, almost no styling.  I could have added
bootstrap.  But decided not to.

</aside>

## jQuery

~~~~~~~ {.javascript .numberLines}
$("button#specialness")
  .html("Don't click here!")
  .on( "click", somethingMagickal );
~~~~~~~

--------

For example:

~~~~~~~ {.javascript .numberLines}
$(function() {

    $("#save-schnippet").on("click", function(event) {
        event.preventDefault();
        alert('you entered: ' + $("#new-schnippet").val());
    });
});
~~~~~~~

<aside class="notes">

While jQuery isn't "reactive", it isn't procedural either.

One could consider it a fluent interface.

Since this is a presentation about web development, I'm not going to
get into any backend API.  So I'm going to use Firebase, one of the
database-as-a-services out there.  (And which recently was bought by
Google.)



So, this isn't too bad.  What are some of the problems?

- It has callbacks.  You can start running into issues with nested callbacks
  if you have async behavior in your callbacks.  That can get messy quickly.
- Lack of type safety.
- Lack of property safety.  I can type the wrong property and it will still run.
  It just won't work the way you want to.
- Two languages: HTML and Javascript.  There are HTML tags in the Javascript.
  You can mitigate it with templates, but still not ideal.  Also, nothing is
  making sure your selectors are named the same in your code and in your markup.
- No composability.  So I'm repeating HTML over and over again.
  Templates can help with that.

Now, some of these issues we don't have a good answer for.  Although
certain IDEs are smart enough to tell you you're messing up.  (For
example, some of the Jetbrains IDEs.)

</aside>

# Act 2 - Reactive

<aside class="notes">

Act 2 : Confrontation

Where we use an existing language (Javascript), and use a Reactive
library.

</aside>

## RxJS

- [http://reactive-extensions.github.io/RxJS/](http://reactive-extensions.github.io/RxJS/)
- $RxJS = Observables + LINQ + Schedulers$

<aside class="notes">

Can help with callback hell
Client and server side

<aside>

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
http://baconjs.github.io/
http://philipnilsson.github.io/badness/
</aside>

# Act 3 - First Class FRP

<aside class="notes">

Act 3 : Resolution

</aside>


## Elm

- First order FRP
- Haskell-like syntax ([but not Haskell](https://groups.google.com/forum/#!msg/elm-discuss/rI_IAf4TiAA/KTvQv1LQ6uAJ))
- Code hot swapping!  In the browser!
- Time traveling debugger!

<aside class="notes">

Very similar to Haskell.  But also borrows some syntax from F#.

FRP.
How swapping!  In the browser!
Time traveling debugger!  Reactor!
</aside>

## Hello World

```haskell
main : Element

main = asText "Hello world"
```

## Getting started

- elm_dependencies.json

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

- elm-get install
- elm --make --only-js Schnippets.elm
- elm-reactor

<aside class="notes">
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

Then, let's look at Schnippets.

</aside>

# Epilogue

## Functional?  Reactive?

<aside class="notes">

So, Elm is a decent amount of code on the surface.  But over half of
it is the HTML.  But how much of it is the magical FRP bits?  Let's
try writing some functional code.

</aside>

## F&sharp;

<aside class="notes">

So, just for shiggles, let's do it in F#

</aside>

## F&sharp;?

<aside class="notes">

Yes, F#.  In the browser.

</aside>

## How

- WebSharper
- FunScript

<aside class="notes">

These are both projects that take F# and compile it to Javascript.
Yes... yes they do.

</aside>

# Bonus

## Visualization

<aside class="notes">
Toggl.  Too complicated.  Buttons as a service.   (Baas)

Toggle buttons.  Time D3.
</aside>

## Visualization - integration

<aside class="notes">

integrate with Google Maps for real time tracking?

</aside>

## Func(this)

<aside class="notes">

Functional voice app.  (Perhaps save the real deal for Clojure,
ClojureScript, core.logic?)

</aside>

# Fin

## About

erewhon<br/>
[flatland](http://flatland.biz/) /
[.tx]()


<aside class="notes">

Also Facebook, Flickr, Twitter...

[facebook](http://) /
[twitter]() /

</aside>


## Further Reading

Other AltJs: Roy, Haste, Fay, Elm, GHCJS, PureScript.

<aside>
http://purescript.readthedocs.org/en/latest/intro.html#related-projects
</aside>

## References

[SL2014]: https://www.youtube.com/watch?v=Agu6jipKfYw "Controlling Time And Space: understanding the many formulations of FRP"


http://www.reactivemanifesto.org/

<script>

// Kind of a hack, but seems to work!

//setTimeout(function() {
//  Reveal.initialize({
//      dependencies: [
//        // Remote control your reveal.js presentation using a touch device
//        { src: 'reveal.js/plugin/remotes/remotes.js', async: true, condition: function() { return !!document.body.classList; } }
//     ]});
//
// }, 500);

</script>


http://pchiusano.github.io/2014-07-02/css-is-unnecessary.html
https://gist.github.com/evancz/2b2ba366cae1887fe621
https://github.com/evancz/elm-todomvc
