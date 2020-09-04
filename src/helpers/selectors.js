//returns array of objects for the appts given a certain day
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

//retuns an object showing all interview details for a specific interview.
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

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(item => item.name === day)
  const interviewersDay = [];
  if (!filteredDays[0]) {
      return interviewersDay;
  } else {
      const interviewersID = filteredDays[0].interviewers
      for (let id of interviewersID) {
        interviewersDay.push(state.interviewers[id]);
      }
      return interviewersDay
  };
};



// export function getInterviewersForDay(state, day) {
//   if (state.days.length < 1) {
//     return [];
//   } else {
//   const filteredDays = state.days.filter(eachDay => eachDay.name === day);
//     if (filteredDays.length < 1) {
//       return filteredDays
//     } else {
//     return filteredDays[0].interviewers.map((eachInt) => {
//       console.log('RETURNING', state.interviewer[eachint])
//       return state.interviewer[eachInt]
//     })
//     }
//   }
// }