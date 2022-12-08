import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import iCalendarPlugin from '@fullcalendar/icalendar'
import dayGridPlugin from '@fullcalendar/daygrid';
import './ICal.scss';
import listPlugin from '@fullcalendar/list';
import { useEffect, useRef, useState } from 'react';
import EventModal, { EventInfo } from './EventModal';
import { timeStyle } from '../constants';
import { useGrid } from '../hooks/useDimensions';
import { useUrlState } from '../hooks/useUrlState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faInfoCircle, faListDots, faTableCells, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import ModalAbout from './ModalAbout';

// https://fullcalendar.io/docs/typescript
// https://fullcalendar.io/docs/icalendar
// https://fullcalendar.io/docs/react

function getIcon(definition: IconDefinition): string {
  return (((<div>{<FontAwesomeIcon icon={definition} size="1x" />}</div>) as unknown) as string)
}

export default function(props: { src: { url: string, format: string } }) {
  const url = useUrlState()
  const [previewedEvent, setPreviewedEvent] = useState<EventInfo | undefined>(undefined)
  const [showAsStack, setShowAsStack] = useState(url.state.stack)
  const [aboutModalOpen, setAboutModalOpen] = useState(false)
  const currentView = showAsStack
    ? {
      view: "mmListMonth",
      toggleButtonText: "To grid",
      icon: faTableCells
    }
    : {
      view: "mmDayGridMonth",
      toggleButtonText: "To stack",
      icon: faListDots
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
    {aboutModalOpen && <ModalAbout visibilityCtrl={[aboutModalOpen, setAboutModalOpen]} />}
    {previewedEvent &&
      <EventModal
        event={previewedEvent}
        onDismiss={() => {
          setPreviewedEvent(undefined)
        }} />}
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
        //center: "",
        right: "mmInfoButton mmToggleStackButton,today prev,next"
      }}
      titleFormat={
        grid.atLeastMedium
          ? { year: 'numeric', month: 'long' }
          : { month: 'numeric', year: "numeric" }
      }
      customButtons={{
        "mmInfoButton": {
          text: grid.atLeastLarge
            ? "About"
            : getIcon(faInfoCircle),
          hint: "View information about the creators and addition of events",
          click: (_ev: MouseEvent, _element: HTMLElement) => setAboutModalOpen(!aboutModalOpen),
        },
        "mmToggleStackButton": {
          text: grid.atLeastLarge
            ? currentView.toggleButtonText
            : getIcon(currentView.icon),
          hint: "Toggle between monthly stacked view and whole-month view",
          click: (_ev: MouseEvent, _element: HTMLElement) => {
            setShowAsStack(!showAsStack)
            url.replaceHistory({ stack: !showAsStack })
          },
        }
      }}
      aspectRatio={undefined}
      height="auto"
      buttonText={{
        today: grid.atLeastLarge
          ? "Today"
          : getIcon(faCalendarDay)
      }}
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
