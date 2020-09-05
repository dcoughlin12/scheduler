import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from '../../hooks/useVisualMode'




export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDITING = "EDITING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  

  // Pass this function to the Form component. 
  // The Form should capture the name and interviewer and pass them to props.onSave as arguments.
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE))
  }

  function deleteAppt(confirmationNeeded) {
    if(!confirmationNeeded)
    transition(CONFIRM)
    if(confirmationNeeded) {
      transition(DELETING, true)
      props.cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch(error => transition(ERROR_DELETE, true))
    }
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {return transition(CREATE)}} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => deleteAppt(false)}
          onEdit={() => transition(EDITING)}
        />)}

      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers} 
          onSave={save} 
          onCancel={() => {return back(EMPTY)}}/>}
       {mode === CONFIRM &&
       
        <Confirm 
            message="Delete the Appointment?"
            onConfirm={() => deleteAppt(true)}
            onCancel={back}
        /> }
       {mode === EDITING && 
       <Form
       interviewers={props.interviewers}
       name={props.interview.student}
       interviewer={props.interview.interviewer.id}
       onSave={save} 
       onCancel={() => {return back(SHOW)}}

         />} 
       { mode === SAVING && <Status message={SAVING} /> } 
       { mode === DELETING && <Status message={DELETING} /> } 
       { mode === ERROR_SAVE && <Error message={"Please try again"} onClose={back}/>}  
       { mode === ERROR_DELETE && <Error message={"Please try again"} onClose={back}/>}  
    </article>
  )
}