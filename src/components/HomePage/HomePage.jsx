import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container, Stack } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Lessons from "../Lessons/Lessons";
import { useFirebaseData } from "../../store/firebaseData";
import "./HomePage.css";

const HomePage = () => {
  const [render, setRender] = useState(true);

  // UI in home page
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState("");
  const [swimType, setSwimType] = useState("");
  const [lessonType, setLessonType] = useState("");
  /**
   * Get the data from the store.
   * If the {@link useFirebaseData} function return is null or undefined, return an empty object.
   */
  const { lessons, lessonsTypes, studentsNumber, tutors } =
    useFirebaseData() ?? {};

  return (
    <Container maxWidth="lg" style={{ height: "100%" }}>
      <Stack className="HomePage">
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <TextField
              label="שם מלא"
              value={name}
              onChange={(ev) => {
                setName(ev.target.value);
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"> סגנון שחייה</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={swimType}
              label="סגנון שחייה"
              onChange={(ev) => {
                setSwimType(ev.target.value);
              }}
            >
              <MenuItem value={""}>כל הסגנונות</MenuItem>
              {lessonsTypes.map((lessonType, id) => {
                return (
                  <MenuItem key={id} value={id}>
                    {lessonType.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">מתווה שיעור</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lessonType}
              label="מתווה שיעור"
              onChange={(ev) => {
                setLessonType(ev.target.value);
              }}
            >
              <MenuItem value={1}>פרטי</MenuItem>
              <MenuItem value={2}>קבוצתי</MenuItem>
              <MenuItem value={3}>לא משנה</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label="תאריך"
                inputFormat="dddd DD/MM/yyyy"
                value={startDate}
                onChange={(event) => {
                  setStartDate(event);
                  setRender(!render);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Stack>
        <Container maxWidth="sm"></Container>
      </Stack>

      <Lessons
        date={startDate} // יום השיעור
        swimType={swimType}
        tutors={tutors}
        lessons={lessons} // all the existing lesson
        lessonsTypes={lessonsTypes} // all the swimming type
        lessonType={lessonType} // all the lesson typeפרטי, קבוצתי, לא משנה
        name={name} // student name
        studentsNumber={studentsNumber} // number of  the registered student
      />
    </Container>
  );
};

export default HomePage;
