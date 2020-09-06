import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //storign all state in an object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  console.log('INITIAL STATE', state)
   // Promise all to resolve all the api routes.
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);
  
   // Updates state of day
 const setDay = day => setState({ ...state, day });

  //sets interview to Null in db and reseets appointments list
  function cancelInterview(id) {
    const appointment = {...state.appointments[id], interview : null}
    const appointments = {...state.appointments, [id]: appointment}
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => axios.get(`/api/days`))
      .then((response) => {
        const days = response.data
        setState({...state, appointments, days})
      }) 
  }

  // Function to allow the local state to change when we book an interview
  function bookInterview(id, interview) {
    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => axios.get(`/api/days`))  
    .then((response) => {
        const days = response.data
        setState({...state, appointments, days})
      }) 
  }
  return {
    state, 
    setDay, 
    bookInterview,
    cancelInterview
  }

}