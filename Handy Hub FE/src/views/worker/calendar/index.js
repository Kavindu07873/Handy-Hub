// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Third Party Components
import classnames from 'classnames';
import { Row, Col } from 'reactstrap';

// ** Calendar App Component Imports
import Calendar from './Calendar';
import AddEventSidebar from './AddEventSidebar';

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL';

// ** Styles
import '@styles/react/apps/app-calendar.scss';

// ** CalendarColors
const calendarsColor = {
  Business: 'primary',
  Holiday: 'success',
  Personal: 'danger',
  Family: 'warning',
  ETC: 'info'
};

const CalendarComponent = () => {
  // ** States
  const [events, setEvents] = useState([]); // Store events locally
  const [calendarApi, setCalendarApi] = useState(null);
  const [addSidebarOpen, setAddSidebarOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [selectedCalendars, setSelectedCalendars] = useState(['Business', 'Holiday', 'Personal', 'Family', 'ETC']);
  const [highlightDays, setHighlightDays] = useState([1, 3, 5, 7]); // Days to highlight

  // ** Hooks
  const [isRtl] = useRTL();

  // ** AddEventSidebar Toggle Function
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen);

  // ** LeftSidebar Toggle Function
  const toggleSidebar = (val) => setLeftSidebarOpen(val);

  // ** Blank Event Object
  const blankEvent = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    url: '',
    extendedProps: {
      calendar: '',
      guests: [],
      location: '',
      description: ''
    }
  };

  // ** Refetch Events
  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents();
    }
  };

  // ** Fetch Events On Mount
  useEffect(() => {
    // Simulate fetching events (replace this with an actual API call)
    const fetchEvents = async () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth(); // Zero-based index (0 for January)

      // Define the specific dates for tasks
      const taskDates = [1, 2, 3, 4, 5, 6, 9, 23, 26];

      // Generate sample events for the specified dates
      const sampleEvents = taskDates.map((day) => ({
        id: day.toString(), // Use the date as the ID
        title: `Task on ${day}/${currentMonth + 1}`, // Example title
        start: new Date(currentYear, currentMonth, day).toISOString(), // Start date
        end: new Date(currentYear, currentMonth, day, 1).toISOString(), // End date (1 hour later)
        allDay: false,
        extendedProps: {
          calendar: 'Business', // Assign a default calendar category
          guests: ['John Doe', 'Jane Smith'],
          location: 'Office',
          description: 'Sample task description'
        }
      }));

      // Filter events based on selected calendars
      setEvents(sampleEvents.filter(event => selectedCalendars.includes(event.extendedProps.calendar)));
    };

    fetchEvents();
  }, [selectedCalendars]);

  return (
    <Fragment>
      <div className="app-calendar overflow-hidden border">
        <Row className="g-0">
          {/* Sidebar */}
          <Col
            id="app-calendar-sidebar"
            className={classnames('col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column', {
              show: leftSidebarOpen
            })}
          >
            {/*<SidebarLeft*/}
            {/*  selectedCalendars={selectedCalendars}*/}
            {/*  updateFilter={updateFilter}*/}
            {/*  toggleSidebar={toggleSidebar}*/}
            {/*  updateAllFilters={updateAllFilters}*/}
            {/*  handleAddEventSidebar={handleAddEventSidebar}*/}
            {/*/>*/}
          </Col>

          {/* Calendar */}
          <Col className="position-relative">
            <Calendar
              isRtl={isRtl}
              events={events}
              calendarsColor={calendarsColor}
              calendarApi={calendarApi}
              setCalendarApi={setCalendarApi}
              handleAddEventSidebar={handleAddEventSidebar}
              highlightDays={highlightDays} // Pass highlighted days
            />
          </Col>

          {/* Overlay for Sidebar */}
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen === true
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>

      {/* Add Event Sidebar */}
      <AddEventSidebar
        events={events}
        setEvents={setEvents}
        open={addSidebarOpen}
        calendarApi={calendarApi}
        refetchEvents={refetchEvents}
        calendarsColor={calendarsColor}
        handleAddEventSidebar={handleAddEventSidebar}
      />
    </Fragment>
  );
};

export default CalendarComponent;