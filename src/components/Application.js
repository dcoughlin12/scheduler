import React, { useState, useEffect } from "react";
import axios from 'axios';
import Appointment from "components/Appointment";
import "components/Application.scss";
import DayList from "./DayList"
import { getInterview, getAppointmentsForDay, getInterviewersForDay } from "../helpers/selectors"



export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  //storign all state in an object
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
    interviewers: {}
  });

 // Updates state of day
 const setDay = day => setState({ ...state, day });
 //Updates state of days
//  const setDays = days => setState(prev => ({ ...prev, days }));


useEffect(() => {
  Promise.all([
    Promise.resolve(axios.get("/api/days")),
    Promise.resolve(axios.get("/api/appointments")),
    Promise.resolve(axios.get("/api/interviewers")),
  ]).then((all) => {
    setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  });
}, []);

  // Returns list of appts
  const appointmentList = getAppointmentsForDay(state, state.day).map(appt => {
    const interview = getInterview(state, appt.interview)
    const interviewers = getInterviewersForDay(state, state.day)
    return (
      <Appointment
      // {...appt}
      key={appt.id} 
      id={appt.id}
      time={appt.time}
      interview={interview}
      interviewers={interviewers}
      />
    )
  })


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
