import { Link } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ResumatorRedux } from './resumatorRedux';
export function Resumes() {
  const { id } = useParams();
  const data = useSelector(ResumatorRedux.selectors.selectResume(id));
  const renderSkills = () => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Skills</h5>
          <div className="card-text">

            <ul className="list-group">
              {data.candidate.skills.map((skill, index) => {
                return (
                  <li key={index} className="list-group-item">
                    <span className="badge badge-secondary">{skill}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const renderEdu = () => {
    return (
      <div className="container" id="edu-section">
        <div className="row">
          <div className="col col-md-12">
            <h2><i className="fa-solid fa-building-columns"></i> Education</h2>
            {data.candidate.education.map(({ schoolName, degree, gpa, graduationDate }, index) => (
              <div key={index}>
                <h4>{schoolName}</h4>
                <div className="row">
                  <div className="col-6"><h6>{degree}</h6></div>
                  <div className="col-6 align-right">{graduationDate}</div>
                </div>
                <div className="row">
                  {gpa && <div className="col-6">GPA {gpa}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderWork = () => {
    return (
      <div className="container" id="work-section">
        <div className="row">
          <div className="col col-md-12">
            <h2><i className="fa-solid fa-laptop-file"></i> Work Experience</h2>
            {data.candidate.experience.map(({ company, title, start_date, end_date, responsibilities, location }, index) => {
              return (<div key={index}>
                <h4>{company}</h4>
                <h5>{title}</h5>
                <div className="row">
                  <div className="col-6">{start_date} - {end_date}</div>
                  <div className="col-6 align-right">{location}</div>
                </div>
                <p>
                  {responsibilities}
                </p>
              </div>);
            })}
          </div>
        </div>
      </div>
    );
  }

  const renderProjects = () => {
    return (

      <div className="container" id="project-section">
        <div className="row">
          <div className="col col-md-12">
            <h2><i className="fa-solid fa-list-check"></i> Class Projects</h2>
            {data.candidate.projects.map(({ title, role, tasks }, index) => {
              return (
                <div key={index}>
                  <h4>{title}</h4>
                  <p>{tasks}</p>
                  <h6>Role: {role}</h6>
                  {/* <ul className="list-group">
                    {technologies.split(',').map((tech) => {
                      return(
                        <li className="list-group-item">
                          { tech }
                        </li>);
                    })}
                  </ul> */}
                </div>
              )
            })}

          </div>
        </div>
      </div>
    )
  };

  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous" />
      <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.9.1/font/bootstrap-icons.min.css"
        integrity="sha512-5PV92qsds/16vyYIJo3T/As4m2d8b6oWYfoqV+vtizRB6KhF1F9kYzWzQmsO6T3z3QG2Xdhrx7FQ+5R1LiQdUA=="
        crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <div className="container" id="main-content">
        <div className="row">
          <div className="col col-3" id="sidebar">
            {renderSkills()}
          </div>
          <div className="col col-9" id="experience">
            <h1>{data.candidate.firstName} {data.candidate.middleName} {data.candidate.lastName}</h1>
            <p>{data.resume.intro}</p>
            <div className="container">
              <div className="row">
                <div className="col col-sm-6">
                  <div>
                    <i className="fa-solid fa-envelope"></i>
                    <a href={`mailto:${data.candidate.email}`}> {data.candidate.email}</a>
                  </div>
                  <span><i className="fa-solid fa-phone"></i> {data.candidate.phoneNumber}</span>
                  <div><i className="fa-solid fa-location-pin"></i> {data.candidate.location}</div>
                </div>
                <div className="col col-sm-6">
                  <div>
                    <i className="fa-brands fa-linkedin"></i>
                    <a href={`http://${data.candidate.linkedIn}`}>{data.candidate.linkedIn}</a>
                  </div>
                  <div>
                    <i className="fa-brands fa-github"></i>
                    <a href={`http://${data.candidate.gitHub}`}>{data.candidate.gitHub}</a>
                  </div>
                </div>
                {renderEdu()}
                {renderWork()}
                {renderProjects()}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}