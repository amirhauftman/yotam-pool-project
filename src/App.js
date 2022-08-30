import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/header";
import HomePage from "./components/HomePage/HomePage";
import CoursesCalendar from "./components/CoursesCalendar/CoursesCalendar";
import React, { useState, useCallback, useEffect } from "react";
import { getCollection } from "./Requests";
import { firebaseData } from "./store/firebaseData";

/**
 *
 * @returns {[number, () => void]}
 */

//count the number of students
function useCounter() {
  const [counter, setCounter] = useState();
  //useCallback like use memo run if there is a change in the information, ret a func and help to send data from son to father
  const updateCounter = useCallback(() => setCounter((i) => i + 1), []);
  return [counter, updateCounter];
}

function App() {
  const [tutors, setTutors] = useState([]);
  const [lessonsTypes, setLessonsTypes] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [studentsNumber, setStudentsNumber] = useState();
  const [update, doUpdate] = useCounter();

  useEffect(() => {
    let mounted = true; //its will run when the component added to the DOM -> less renders

    // getting all the data from the DB
    const promisedData = [
      getCollection("Tutors"),
      getCollection("LessonsTypes"),
      getCollection("Lessons"),
      getCollection("Students"),
    ];
    // waiting to all the information
    Promise.all(promisedData).then(
      ([tutors, lessonsTypes, lessons, students]) => {
        if (!mounted) return;
        setTutors(tutors);
        setLessonsTypes(lessonsTypes);
        setLessons(lessons);
        setStudentsNumber(students);

        // over 30 students condition
        if (students[0].names.length >= 30) {
          alert("There is allready 30 students. You can't to register");
        }
      }
    );

    return () => {
      mounted = false; //before the component get out from the DOM
    };
  }, [update]);

  /**
   * infomation flow: db->app->store->everyone who is provided
   */
  return (
    <React.Fragment>
      <firebaseData.Provider
        value={{
          tutors,
          lessonsTypes,
          lessons,
          studentsNumber,
          update: doUpdate,
        }}
      >
        <Header />

        <div
          className="App"
          style={{
            padding: "20px 0",
            height: "100%",
          }}
        >
          {/* the router */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/luz" element={<CoursesCalendar />} />
          </Routes>
        </div>
      </firebaseData.Provider>
    </React.Fragment>
  );
}

export default App;
