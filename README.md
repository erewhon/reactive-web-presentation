mk - rebuild documentations

presentation.md
presentation.pdf
presentation.html



todo:
- impress.js or jmpress.js?
- custom javascript to end of document for reveal.js customization


To keep things somewhat of an apples-to-apples comparison, we try to
minimize external dependencies.  But we're also trying to keep the
same semantics.  Since the Elm code builds HTML in the code itself, in
the Javascript-based examples, I'm doing everything in Javascript.
That includes using Javascript templates.  (Handlebars is my weapon of
choice.)


# Initialization

## Act 2 - BaconJS

    cd act2-baconjs && bower install bacon



# Actions

## Presentation

Make it:

    cd presentation && ./mk

View presentation in [HTML](presentation/presentation.html) or
[PDF](presentation/presentation.pdf).

todo : auto rebuild using Gulp?

## Act 3 : Elm

Run the reactor

    cd act3-elm && elm-reactor


## For presentation

Start it: ./scripts/start

Stop it: ./scripts/stop

