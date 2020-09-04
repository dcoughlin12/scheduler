import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status"
import useVisualMode from '../../hooks/useVisualMode'




export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  

  // Pass this function to the Form component. 
  // The Form should capture the name and interviewer and pass them to props.onSave as arguments.
  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
   
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {return transition(CREATE)}} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />)}

      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers} 
          onSave={save} 
          onCancel={() => {return back(EMPTY)}}/>}
       {mode === SAVING &&
        <Status message={SAVING} />
       }   
    </article>
  )
}