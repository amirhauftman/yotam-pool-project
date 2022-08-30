import React, { useMemo, useCallback } from "react";
import "./Lesson.css";
import { setDocument, setStudent } from "../../../Requests";
import { useFirebaseData } from "../../../store/firebaseData";

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
 * טבלה של שיעור
 * @param {string} name student name
 * @param {Tutor} tutor totur informaion
 * @param {Date} date date of the lesson
 * @param {number} hour lessons hour
 * @param {string} swimType
 * @param {Lesson} tutorLessonsAtThisHour the lesson that the tutor teach at this hour
 * @param {string[]} lessonsTypes swimming type
 * @param {string} lessonType type of the lesson: private,group,dont care
 * @param {number} studentsNumber number of the stunts
 * @returns
 */
const Lesson = ({
  name,
  tutor,
  date,
  hour,
  swimType,
  tutorLessonsAtThisHour,
  lessonsTypes,
  lessonType,
  studentsNumber,
}) => {
  const { update } = useFirebaseData() ?? {}; // update from the store, if nothing there or any problom we getting empty object
  const lessonTypeName = useMemo(() => {
    if (!tutorLessonsAtThisHour)
      return null; // if there no lesson at this hour -> null
    else if (tutorLessonsAtThisHour.type === "")
      return "כל הסגנונות"; // if no swimtype choosen return "כל הסגנונות"
    else return lessonsTypes[tutorLessonsAtThisHour.type].name; // else return the swimtype
  }, [lessonsTypes, tutorLessonsAtThisHour]); // the function will run when one of this will change

  /**hide lessons that not with the same swimType */
  const hideLesson = tutorLessonsAtThisHour // check if there is lesson at this hour
    ? swimType !== "" && // check if the student choose swimtype
      tutorLessonsAtThisHour.type !== "" && // בודק שהשיעור שיש למדריך הוא לא "כל הסגנונות"
      tutorLessonsAtThisHour.type !== swimType // check if thre is match between the student and the tutor about the swimtype
    : false;

  /**
   * useCallbac like useMemo, we want to run the function just if there is changes
   * return the date in format
   */
  const setHour = useCallback(
    (hour, mins = 0) => {
      const lessonsDate = new Date(date);

      const lessonsDateFinaly = new Date(
        lessonsDate.getFullYear(),
        lessonsDate.getMonth(),
        lessonsDate.getDate(),
        hour,
        mins,
        0
      );

      return lessonsDateFinaly.toISOString();
    },
    [date]
  );

  let isPrivate;
  if (tutorLessonsAtThisHour) {
    isPrivate = tutorLessonsAtThisHour.isPrivate;
  } else {
    isPrivate = false;
  }

  /**sign to the lesson */
  const clicked = useCallback(() => {
    setDocument(
      setHour(hour),
      lessonType === 1 ? setHour(hour, 45) : setHour(hour + 1),
      tutor.name,
      swimType,
      lessonType === 1 ? true : false
    );

    setStudent(name);
    setTimeout(() => update?.(), 500).then(() => {
      alert("You subscribe with sucess to the lesson");
    });
  }, [setHour, hour, name, tutor, swimType, lessonType, update]);

  if (hideLesson) {
    return null;
  }

  return (
    <div
      style={{
        border: "1px black solid",
        margin: "5px 0",
        display: "flex",
        justifyContent: "space-evenly",
        padding: "5px 0",
      }}
    >
      <span>
        {tutor.name}
        {!lessonTypeName
          ? " isn't teaching yet "
          : " is teaching " + lessonTypeName + " "}
        at {hour}
        {isPrivate
          ? " on a private lesson "
          : lessonTypeName
          ? " on a group lesson "
          : null}
      </span>

      <button
        type="button"
        onClick={clicked}
        disabled={studentsNumber[0].names.length >= 30 || isPrivate || !name}
      >
        תרשום אותי
      </button>
    </div>
  );
};

export default Lesson;
