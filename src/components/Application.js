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
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

 // Updates state of day
 const setDay = day => setState({ ...state, day });

useEffect(() => {
  Promise.all([
    Promise.resolve(axios.get("/api/days")),
    Promise.resolve(axios.get("/api/appointments")),
    Promise.resolve(axios.get("/api/interviewers")),
  ]).then((all) => {
    setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  });
}, []);

  function cancelInterview(id) {
    console.log('cancelInterview')
    const appointment = {...state.appointments[id], interview : null}
    const appointments = {...state.appointments, [id]: appointment}

    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({...state, appointments})
    }) 
  }

  // Function to allow the local state to change when we book an interview
  function bookInterview(id, interview) {
    const appointment = {...state.appointments[id], interview: { ...interview }};
    console.log('APPT', appointment)

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log('this is where its from', id, interview);
    console.log('Appointments', appointments)

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({...state, appointments})
    }) 
  }


  // Returns list of appts
  const appointmentList = getAppointmentsForDay(state, state.day).map(appt => {
    const interview = getInterview(state, appt.interview)
    const interviewers = getInterviewersForDay(state, state.day)
    return (
      <Appointment
      key={appt.id} 
      id={appt.id}
      time={appt.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
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
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
