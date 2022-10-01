import { Fragment, useState } from 'react';
import Modal from 'react-modal';
import { unescape } from 'he';
import { appRootHtmlId, dateTimeStyle } from '../constants';
import './EventModal.scss';

export type EventInfo = {
  start: string,
  end: string,
  title: string,
  url: string,
  extendedProps: Record<string, any>,
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById(appRootHtmlId) as HTMLElement);

function capitalize(txt: string) {
  return txt.charAt(0).toUpperCase() + txt.slice(1)
}

function displayKV(key: string, value: any) {
  return <Fragment key={key}>
    <h3>{capitalize(key)}</h3>
    {value}
  </Fragment>
}

export const dateFormat = new Intl.DateTimeFormat([], dateTimeStyle)

export default function(props: { event: EventInfo, onDismiss: () => void }) {
  const [isOpen, setIsOpen] = useState(true)
  return <Modal
    isOpen={isOpen}
    onAfterClose={props.onDismiss}
    onRequestClose={() => { setIsOpen(false) }}
    contentLabel="Example Modal"
    style={{
      overlay: {
        height: "auto",
        width: "auto",
      },
      content: {
        maxWidth: 600,
        height: "auto",
        margin: "auto",
        top: "1%",
        left: "1%",
        right: "1%",
        bottom: "1%",
      },
    }}
  >
    <h2>{unescape(props.event.title)}</h2>
    {displayKV("Time", <section>
      <p>{dateFormat.formatRange(new Date(props.event.start), new Date(props.event.end))}</p>
    </section>)}
    {displayKV("URL", <a href={props.event.url} target="_blank">{props.event.url}</a>)}
    <section className="p-with-newlines">
      {Object.keys(props.event.extendedProps).map((extraKey: string) => {
        if (props.event.extendedProps[extraKey] === "" || props.event.extendedProps[extraKey] === null) {
          return null
        }
        return displayKV(extraKey, <p>{unescape(props.event.extendedProps[extraKey])}</p>)
      })}
    </section>
    <button
      onClick={() => setIsOpen(false)}
      style={{ cursor: "pointer", padding: 10, margin: "auto", display: "block" }}>Close</button>
  </Modal>
}
