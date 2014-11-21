# (Functional) Reactive Web Development

This contains everything from my November 2014 presentation for the
Houston Functional Programming Meetup.

# References

[Further Reading](presentation/presentation.html#/further-reading)

# Getting Started

To clone:

        git clone https://github.com/erewhon/reactive-web-presentation.git

# Artifacts and building

To rebuild the presentation using Pandoc:

        cd presentation && ./mk

[Presentation](presentation/presentation.html)

## Act 1

[Plain HTML](act1-html/)

[jQuery](act1-jquery/)

## Act 2

To fetch BaconJS dependencies:

        cd act2-baconjs && bower install bacon

[BaconJS](act2-baconjs/):

[RxJS](act2-rxjs/):

## Act 3

If you have Elm installed, run the following to start the Reactor:

        cd act3-elm
        elm-get install
        elm --make --only-js Schnippets.elm
        elm-reactor

Then open [the reactor](http://localhost:8000/).

## Presentation

The "./scripts/start" will open all of the examples through the reactor, plus the presentation.

# Notes

To keep things somewhat of an apples-to-apples comparison, we try to
minimize external dependencies.  But we're also trying to keep the
same semantics.  Since the Elm code builds HTML in the code itself, in
the Javascript-based examples, I'm doing everything in Javascript.
That includes using Javascript templates.  (Handlebars is my weapon of
choice.)
