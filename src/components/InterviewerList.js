import React from "react";
import "components/InterviewerList.scss";
import classnames from "classnames"
import InterviewerListItem from "./InterviewerListItem";


export default function InterviewerList(props) {
  const interviewerlist = props.interviewers.map(mentor => {
    return (
    <InterviewerListItem
     key = {mentor.id}
     name = {mentor.name}
     avatar = {mentor.avatar}
     selected = {mentor.id === props.interviewer}
     setInterviewer = {event => {props.setInterviewer(mentor.id)}}
     />
    )  
  })
  
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewerlist}</ul>
</section>
  )
}