export function getAppointmentsForDay(state, day) {
  if (state.days.length < 1) {
    return [];
  } else {
  const filteredDays = state.days.filter(eachDay => eachDay.name === day);
    if (filteredDays.length < 1) {
      return filteredDays
    } else {
    return filteredDays[0].appointments.map((appt) => {
      return state.appointments[appt]
    })
    }
  }
}

export function getInterview(state, interview) {
  if (!interview) {
    return null; 
  } else {
  const returnObj = {}
  const interviewerId = interview.interviewer
  returnObj.student = interview.student
  returnObj.interviewer = state.interviewers[interviewerId]
  return returnObj
  }
}