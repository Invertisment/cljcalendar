import { useState } from 'react';
import Modal from 'react-modal';

export type EventInfo = {
  start: string,
  end: string,
  title: string,
  url: string,
  extendedProps: Record<string, any>,
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('body');

function capitalize(txt: string) {
  return txt.charAt(0).toUpperCase() + txt.slice(1)
}

function displayKV(key: string, value: any) {
  return <>
    <h3>{capitalize(key)}</h3>
    {value}
  </>
}

const dateFormat = new Intl.DateTimeFormat([], { dateStyle: 'medium', timeStyle: 'short' })

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
        maxWidth: 500,
        height: "auto",
        margin: "auto",
        top: "5%",
        left: "5%",
        right: "5%",
        bottom: "5%",
      },
    }}
  >
    <h2>{props.event.title}</h2>
    {displayKV("Time", <p>
      <p>Start: {dateFormat.format(new Date(props.event.start))}</p>
      <p>End: {dateFormat.format(new Date(props.event.end))}</p>
    </p>)}
    <form>
      {displayKV("URL", <a href={props.event.url} target="_blank">{props.event.url}</a>)}
      <p>
        {Object.keys(props.event.extendedProps).map((extraKey: string) => {
          if (props.event.extendedProps[extraKey] === "" || props.event.extendedProps[extraKey] === null) {
            return null
          }
          return displayKV(extraKey, <p>{props.event.extendedProps[extraKey]}</p>)
        })}
      </p>
      <button onClick={() => setIsOpen(false)}>Close</button>
    </form>
  </Modal>
}
