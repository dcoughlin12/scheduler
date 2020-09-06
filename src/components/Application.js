import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import "components/Application.scss";
import DayList from "./DayList"
import { getInterview, getAppointmentsForDay, getInterviewersForDay } from "../helpers/selectors"
import useApplicationData from "../hooks/useApplicationData";


export default function Application(props) {
  // From useApplicationData.js
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
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
