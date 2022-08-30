import React, { useState, useEffect } from "react";
import Lesson from "./Lesson/Lesson";
import "./Lessons.css";

/**
 * @typedef Tutor
 * @property {string} name tutor name
 * @property {boolean[]} days which days he work
 * @property {number[]} hours which hours he work
 * @property {boolean[]} type which swimtype he teaching
 */

/**
 * @typedef Lesson
 * @property {string} tutor tutor name
 * @property {boolean} isPrivate foes the lesson is private
 * @property {Date} start lesson start time
 * @property {Date} end lesson end time
 * @property {number} type swimming type of the lesson
 */

/**
 * lessons table
 * @param {Date} date
 * @param {Tutor[]} tutors
 * @param {string} swimType
 * @param {Lesson[]} lessons array of all the existing lessons
 * @param {string[]} lessonsTypes all the swimtype: תירה תגב פרפר
 * @param {string} lessonType type of lesson (פרטי, קבוצתי, לא משנה)
 * @param {string} name student name
 * @param {number} studentsNumber number of all the student who allready ready registered
 * @returns
 */
const Lessons = ({
  date,
  tutors,
  swimType,
  lessons,
  lessonsTypes,
  lessonType,
  name,
  studentsNumber,
}) => {
  const [actualDay, setActualDay] = useState(); //the day that choosen in the month
  const [weekDay, setWeekDay] = useState(); //which day in the week sunday,monday..  0-6

  useEffect(() => {
    setActualDay(new Date(date).getDate());
    setWeekDay(new Date(date).getDay());
  }, [date]);

  return (
    <div className="Lessons" style={{ height: "500px", overflow: "overlay" }}>
      {tutors.map((tutor, id) => {
        //  all the tutors.
        if (
          tutor.days[weekDay] && // if the tutor working on this day
          ((swimType !== "" && tutor.type[swimType]) || swimType === "") // if there is swimtype match
        ) {
          const tutorLessons = lessons.filter((less) => {
            // filter by tutor and date
            if (less.tutor === tutor.name) {
              // relevant tutor
              if (new Date(less.start).getDate() === actualDay) {
                // rellevsnt day
                return less;
              } else {
                return null;
              }
            } else {
              return null;
            }
          });

          return (
            <div key={id}>
              <div className="Lessons__tutorTitle" style={{ margin: "10px 0" }}>
                {tutor.name}
              </div>
              {tutor.hours.map((hour) => {
                // for every hour that the tutor teach return the lesson
                return (
                  <Lesson
                    key={hour}
                    name={name}
                    hour={hour}
                    tutor={tutor}
                    date={date}
                    swimType={swimType}
                    tutorLessonsAtThisHour={tutorLessons.find(
                      (less) => new Date(less.start).getHours() === hour
                    )}
                    lessonsTypes={lessonsTypes}
                    lessonType={lessonType}
                    studentsNumber={studentsNumber}
                  />
                );
              })}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Lessons;
