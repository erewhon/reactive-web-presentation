# (Functional) Reactive Web Development

This contains everything from my November 2014 presentation for the
Houston Functional Programming Meetup.

# Getting Started

To download

        git clone ....

To build the presentation and examples

        mk
        pandoc -o README.html README.md

# Artifacts and building

- [Presentation](/presentation/presentation.html)

## Act 1

[Plain HTML](/act1-html/index.html)

[jQuery](/act1-jquery/index.html)

## Act 2

[RxJS](/act2-rxjs/index.html):

[BaconJS](/act2-baconjs/index.html):

        cd act2-baconjs && bower install bacon

## Act 3

[Elm in Reactor](http://localhost:8000/)

        cd act3-elm && elm-reactor

## Presentation

Preparing the browser:

        ./scripts/start

Shut it down:

        ./scripts/stop

# Notes

To keep things somewhat of an apples-to-apples comparison, we try to
minimize external dependencies.  But we're also trying to keep the
same semantics.  Since the Elm code builds HTML in the code itself, in
the Javascript-based examples, I'm doing everything in Javascript.
That includes using Javascript templates.  (Handlebars is my weapon of
choice.)


# Actions

## Presentation

Make it:

    cd presentation && ./mk

View presentation in [HTML](presentation/presentation.html) or
[PDF](presentation/presentation.pdf).

todo : auto rebuild using Gulp?


    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.min.js"/>




Things to research:
- how to include a file in the presentation?  (including html or similar)
- add a markdown library so we can render it?


Firebase:
- email and password
- facebook
- twitter
- github
- google


https://www.userapp.io/ ?


