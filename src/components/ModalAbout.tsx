import { Dispatch, SetStateAction } from 'react';
import CloseableModal from './CloseableModal';
import './ModalAbout.scss';

function link(title: string, href: string) {
  return <a href={href} target="_blank">{title}</a>
}

export default function ModalAbout(props: {
  visibilityCtrl: [boolean, Dispatch<SetStateAction<boolean>>]
}) {
  return (

    <CloseableModal
      visibilityCtrl={props.visibilityCtrl}
      title="Front-end for Clojure events calendar feed" >

      <section>
        <p>
          This is a web-only preview of the calendar located {link(
            "here",
            "https://www.clojurians-zulip.org/feeds/events.ics"
          )}. The calendar can also be shown by mobile phone calendar.
        </p>
        <h3>Adding new events</h3>
        <p>
          To add new events visit {link(
            "Clojure events feed README",
            "https://clojurians.zulipchat.com/#narrow/stream/262224-events/topic/README"
          )} and {link(
            "Announce an Event",
            "https://gitlab.com/clojurians-zulip/feeds/-/tree/master#announce-an-event"
          )}.
        </p>
        <h3>Authors</h3>
        <p>
          Web UI ({link(
            "Source code",
            "https://gitlab.com/invertisment/cljcalendar/"
          )}): Martynas Maciulevičius
        </p>
        <p>
          Heavy lifting (scraping, aggregation into ical): Gert Goet
        </p>
      </section>

    </CloseableModal>
  );
}
