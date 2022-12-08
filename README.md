# Front-end for [Clojure events calendar feed](https://clojureverse.org/t/clojure-events-calendar-feed/6781/4)

This is a web-only preview of the calendar located [here](https://www.clojurians-zulip.org/feeds/events.ics).
The calendar can also be shown by mobile phone calendar.

[Open the calendar](https://invertisment.gitlab.io/cljcalendar)

## Adding new events
To add new events visit
[Clojure events feed README](https://clojurians.zulipchat.com/#narrow/stream/262224-events/topic/README)
and
[Announce an Event](https://gitlab.com/clojurians-zulip/feeds/-/tree/master#announce-an-event).

## This is for Clojure but why react

It's based on React and not ClojureScript.

Typescript was fitting the problem better than re-frame.
I needed a pre-built calendar component and other than that there is no complex state.

## Running locally

Run on port 3000: `yarn start`

Run tests (there are none): `yarn test`

Production build: `yarn build`

## Authors
Web UI: Martynas Maciulevičius

Heavy lifting (scraping, aggregation into ical): Gert Goet

## License
AGPLv3
