% (Functional) Reactive Web Development
% Steven Byrnes
% November 19, 2014

## Abstract

> We will look at a few language and library options for doing
> (functional) reactive web development, including Elm, RxJS, and
> BaconJS. F# may make a brief guest appearance in the stack as
> well.


<aside class="notes">

Why the scare parenthesis?

(I put the functional in parenthesis, as some things are not really
functional reactive, but merely reactive.)  At it's simplest, think of
a spreadsheet.  You update a cell, and if that cell is referenced
elsewhere, they are automatically recomputed.



What is Functional Reactive Programming?

Sense of time.

RxJava started calling themself FRP, but changed it to just RP.


According to presentation at Strangeloop, put it under formulation of FRP

https://www.youtube.com/watch?v=Agu6jipKfYw

Get into continuous and discrete time semantics.


I'm not going to do a game.  I can barely play angry birds, so I'm not
going to do that.

- Todo apps seem to be the norm.  I'm going to do something simpler /
  different: Buttonz.  Have some D3 for fun.
- Schnippets / documental.
- Func(this)


"Last month, the richness of the Javascript ecosystem was mentioned.
It's beyond rich… it's ridiculous."

https://github.com/hakimel/reveal.js



</aside>

# What is (F)RP?

## Reactive Programming



## Definition

Per Wikipedia:

> Functional reactive programming (FRP) is a programming
> paradigm for reactive programming using the building blocks
> of functional programming. FRP has been used for
> programming *graphical user interfaces* (GUIs), robotics, and music,
> aiming to simplify these problems by explicitly modeling time.

## Huh?

## Continuous vs discrete

## Push vs pull

## Different constraints



<aside class="notes">

From presentation.

</aside>

## Why?

Easier to follow flow

Declarative rather than imperative

Composability

Functional or fluent interfaces

# Act 1 - Plain JS

## A Simple Model

<aside class="notes">

Canonical example for MVC frameworks is the todo app.  Let's try a
couple of other things...

Google Snippets, or iDoneThis... let's create Schnippets.

</aside>

## jQuery

```javascript
$(function() {
})
```

# Act 2 - Reactive

## RxJS

- http://reactive-extensions.github.io/RxJS/
- $RxJS = Observables + LINQ + Schedulers$


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

# Act 3 - FRP

## Elm

- First order FRP
- Haskell-like syntax
- Code hot swapping!  In the browser!
- Time traveling debugger!

<aside class="notes">
Very similar to Haskell.
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

- https://github.com/elm-lang/elm-platform
- https://github.com/michaelbjames/elm-examples


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


## References

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
