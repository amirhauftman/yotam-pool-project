import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from "@mui/system";
import { useFirebaseData } from "../../store/firebaseData";

/**
 * loading all the lesson from the DB (firebase)
 */
const CoursesCalendar = () => {
  const { lessons } = useFirebaseData() ?? {};

  /**
   * we want that the memorey will load himself just when there is a change in the calendar
   * so we use useMemo
   * useMemo return the value from the function
   */
  const events = React.useMemo(() => {
    /** @type {EventInput[]} */
    const event = [];
    lessons.forEach((lesson) => {
      //we push all the events, showing just tutor name and hour
      event.push({
        start: new Date(lesson.start),
        end: new Date(lesson.end),
        title: `${lesson.isPrivate ? "Private lesson" : "Public lesson"}, ${
          lesson.type !== "" ? lesson.type : "all types"
        }, by ${lesson.tutor}`,
      });
    });
    return event;
  }, [lessons]);

  return (
    <Container maxWidth="lg">
      <div className="CoursesCalendar">
        <h1>CoursesCalendar</h1>

        <FullCalendar
          // default headerToolbar properties
          headerToolbar={{
            start: "title",
            //center: '',
            end: "today prev,next",
            center: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="75vh"
        />
      </div>
    </Container>
  );
};
export default CoursesCalendar;
