import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import iCalendarPlugin from '@fullcalendar/icalendar'
import dayGridPlugin from '@fullcalendar/daygrid';
import './ICal.scss';
import listPlugin from '@fullcalendar/list';
import { useEffect, useRef, useState } from 'react';
import EventModal, { EventInfo } from './EventModal';
import { timeStyle } from '../constants';
import useWindowDimensions, { useGrid } from '../hooks/useDimensions';

// https://fullcalendar.io/docs/typescript
// https://fullcalendar.io/docs/icalendar
// https://fullcalendar.io/docs/react

export default function(props: { src: { url: string, format: string } }) {
  const [previewedEvent, setPreviewedEvent] = useState<EventInfo | undefined>(undefined)
  const [showAsStack, setShowAsStack] = useState(false)
  const currentView = showAsStack
    ? {
      view: "mmListMonth",
      toggleButtonText: "To grid"
    }
    : {
      view: "mmDayGridMonth",
      toggleButtonText: "To stack"
    }
  useEffect(() => {
    if (calendarRef !== undefined) {
      // https://github.com/fullcalendar/fullcalendar/issues/4684#issuecomment-620787260
      calendarRef.current.getApi().changeView(currentView.view)
    }
  }, [currentView])
  // https://stackoverflow.com/a/65039223
  const calendarRef = useRef() as React.MutableRefObject<FullCalendar>
  const grid = useGrid()
  return <div style={{ width: "100%", maxWidth: "100%", height: "100%", overflow: "hidden" }}>
    {previewedEvent &&
      <EventModal
        event={previewedEvent}
        onDismiss={() => setPreviewedEvent(undefined)} />}
    <FullCalendar
      firstDay={1} // monday
      ref={calendarRef}
      plugins={[dayGridPlugin, listPlugin, iCalendarPlugin]}
      events={props.src}
      initialView={currentView.view}
      views={{
        mmDayGridMonth: {
          type: "dayGridMonth",
          initialView: "dayGridMonth",
        },
        mmListMonth: {
          type: "listMonth",
          initialView: "listMonth",
        },
      }}
      headerToolbar={{
        left: "title",
        center: "mmToggleStackButton",
        right: "today prev,next"
      }}
      titleFormat={
        grid.atLeastMedium
          ? { year: 'numeric', month: 'long' }
          : { month: 'numeric', year: "numeric" }
      }
      customButtons={{
        "mmToggleStackButton": {
          text: currentView.toggleButtonText,
          hint: "Toggle between monthly stacked view and whole-month view",
          click: (_ev: MouseEvent, _element: HTMLElement) => {
            setShowAsStack(!showAsStack)
          },
        }
      }}
      aspectRatio={undefined}
      height="auto"
      buttonText={{ today: "Today" }}
      eventTimeFormat={timeStyle}
      eventClassNames="event-name-size"
      viewClassNames={"z-index-zero"}
      eventClick={(arg: EventClickArg) => {
        arg.jsEvent.preventDefault()
        setPreviewedEvent({
          start: arg.event.startStr,
          end: arg.event.endStr,
          title: arg.event.title,
          extendedProps: arg.event.extendedProps,
          url: arg.event.url
        })
      }}
    />
  </div>
}
