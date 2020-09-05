import React, { useState } from 'react'
import Button from "../Button"
import InterviewerList from "../InterviewerList"


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  const reset = function() {
    return (
      setName(""),
      setError(""),
      setInterviewer(null)
    )
  }

  const cancel = function() {
    return (
      reset(),
      props.onCancel()
    )
  }

  const validating = () => {
    if (!name) {
      return setError("Please fill in the student's name");
    }
    if (!interviewer) {
      return setError("Please select an interviewer");
    }
    setError("");
    props.onSave(name, interviewer);
    };
    

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validating} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}
