import { Fragment } from 'react';
import { unescape } from 'he';
import { dateTimeStyle } from '../constants';
import './EventModal.scss';
import CloseableModal from './CloseableModal';

export type EventInfo = {
  start: string,
  end: string,
  title: string,
  url: string,
  extendedProps: Record<string, any>,
}

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

export default function(props: { event?: EventInfo, onDismiss: () => void }) {
  if (props.event === undefined) {
    return null
  }
  const event = props.event
  return <CloseableModal
    visibilityCtrl={[event !== undefined, props.onDismiss]}
    title={unescape(event.title)}
  >
    {displayKV("Time",
      <p>{dateFormat.formatRange(new Date(event.start), new Date(event.end))}</p>
    )}
    {displayKV("URL", <a href={event.url} target="_blank">{event.url}</a>)}
    {Object.keys(event.extendedProps).map((extraKey: string) => {
      if (event.extendedProps[extraKey] === "" || event.extendedProps[extraKey] === null) {
        return null
      }
      return displayKV(extraKey, <p className="p-with-newlines" > {unescape(event.extendedProps[extraKey])}</p>)
    })}
  </CloseableModal >
}
