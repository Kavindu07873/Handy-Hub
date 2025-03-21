import { useEffect, useRef } from 'react';
// ** Full Calendar & its Plugins
import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// ** Third Party Components
import toast from 'react-hot-toast';
import { Menu } from 'react-feather';
import { Card, CardBody } from 'reactstrap';

const Calendar = ({ isRtl, events, calendarsColor, calendarApi, setCalendarApi, handleAddEventSidebar, highlightDays }) => {
  const calendarRef = useRef(null);

  // ** Handle Event Add/Edit/Delete
  const handleAddEvent = (newEvent) => {
    toast.success('Event Added');
  };

  const handleUpdateEvent = (updatedEvent) => {
    toast.success('Event Updated');
  };

  const handleDeleteEvent = (eventId) => {
    toast.success('Event Deleted');
  };

  // ** Check if a Day Should Be Highlighted
  const isHighlightedDay = (date) => {
    const day = date.getDate();
    return highlightDays.includes(day);
  };

  // ** Calendar Options
  const calendarOptions = {
    events, // Use local events state
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
    },
    editable: true,
    eventResizableFromStart: true,
    dragScroll: true,
    dayMaxEvents: 2,
    navLinks: true,
    eventClassNames({ event: calendarEvent }) {
      const colorName = calendarEvent.extendedProps.calendar || 'primary'; // Default color
      return [`bg-light-${colorName}`];
    },
    eventClick({ event: clickedEvent }) {
      console.log('Event clicked:', clickedEvent);
    },
    customButtons: {
      sidebarToggle: {
        text: <Menu className="d-xl-none d-block" />,
        click() {
          console.log('Sidebar toggled');
        },
      },
    },
    dateClick(info) {
      console.log('Date clicked:', info.date);
    },
    eventDrop({ event: droppedEvent }) {
      handleUpdateEvent(droppedEvent.toPlainObject());
    },
    eventResize({ event: resizedEvent }) {
      handleUpdateEvent(resizedEvent.toPlainObject());
    },
    dayCellClassNames: (arg) => {
      // Check if the day should be highlighted
      if (isHighlightedDay(arg.date)) {
        return 'highlight-day'; // Add custom CSS class
      }
      return '';
    },
    ref: (calendar) => {
      if (calendar) {
        setCalendarApi(calendar);
      }
    },
  };

  return (
    <Card className="shadow-none border-0 mb-0 rounded-0">
      <CardBody className="pb-0">
        <FullCalendar {...calendarOptions} />
      </CardBody>
    </Card>
  );
};

export default Calendar;