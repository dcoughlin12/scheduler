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

