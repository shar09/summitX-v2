import React, { useState, Fragment } from 'react';
import formatDate from '../../utils/formatDate';
import ExperienceConfirmDialog from './ExperienceConfirmDialog';

const EditExperience = ({ exp, editExperience, deleteExperience }) => {
    const initialState = {
        company: exp.company,
        title: exp.title,
        from: formatExp(formatDate(exp.from)),
        to: formatExp(formatDate(exp.to)),
        current: exp.current,
        description: exp.description
    }

    const [showEdit, setShowEdit] = useState([ exp._id, false ]);

    const [editExp, setEditExp] = useState(initialState);

    const [confirmDialog, showConfirmDialog] = useState(false);

    const { company, title, from, to, current, description } = editExp;

    const handleChange = e => {
        setEditExp({
            ...editExp,
            [e.target.name]: e.target.value
        });
    }

    const setInitialState = () => {
        setEditExp({
            ...initialState
        });
    }

    const handleSubmit = (e, id) => {
        e.preventDefault();
        setShowEdit([id, false]);
        editExperience(id, editExp);
    }

    return (
        !showEdit[1] ? (
            <div key={exp._id} className="card">
                <p className="experience-header">
                    <span className="company-name">{exp.company}</span>
                    <span className="edit-experience" onClick={ () => setShowEdit([exp._id, true]) }> <i className="far fa-edit"></i>
                        <span className="icon-text"> Edit</span> 
                    </span>
                </p>
                <p className="position">{title} <span className="date">{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Present'}</span> </p>
                <p className="experience-summary">{exp.description}</p>
            </div>
        ) : (
            <Fragment >
                <div className="fadeIn add-experience card">
                    <p className="experience-header">
                        <span className="company-name">{exp.company}</span>
                        <span className="edit-experience">
                            <button className="add-exp-button" type="submit" form="edit-form"
                            >
                                Save
                            </button>
                            <button className="delete-exp-button"  
                                onClick = { () => showConfirmDialog(true)}
                            >Delete
                            </button>
                            <span onClick={() => { setShowEdit([exp._id, false]); setInitialState(); }} className="exp-cancel">Cancel</span>
                        </span>
                    </p>
                    <form id="edit-form" className="exp-form" onSubmit= {(e) => handleSubmit(e, exp._id)}>
                        <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input type="text" id="company" placeholder="Company" 
                                name="company"
                                value={company} 
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>  
                            <input type="text" id="title" placeholder="Developer, Analyst, etc" 
                                name="title"
                                value={title} 
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="from">From Date</label>
                            <input id="from" type="date" 
                                name="from" 
                                value={from}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input type="checkbox" id="current-job" 
                                name="current" 
                                checked={current}
                                value={current}
                                onChange={() => {
                                    setEditExp({ ...editExp, current: !current });
                                }} 
                            /> 
                            <label htmlFor="current-job">Current Job</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="to">To Date</label>
                            <input id="to" type="date" 
                                name="to" 
                                value={to}
                                onChange={handleChange}
                                disabled={current}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>  
                            <textarea
                                id="description" cols="30" rows="5" placeholder="What did you do? What were your accomplishments?"
                                name="description"
                                value={description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </form>
                </div>
                { confirmDialog ? (
                    <ExperienceConfirmDialog deleteExperience={deleteExperience} showConfirmDialog={showConfirmDialog} exp={exp} />
                ): <Fragment />
                }
            </Fragment>
        )
    );
}

function formatExp(d) {
    if(d === null) {
        return null;
    }

    let dateArray = d.split('/');
    let month = "";
    let day = "";

    let year = dateArray[2];
  
    if( dateArray[0].length === 1) {
      month = "0" + dateArray[0];
    }
    else {
      month = dateArray[0];
    }
  
    if(dateArray[1].length === 1) {
      day = "0"+dateArray[1];
    }
    else {
      day = dateArray[1];
    }
  
    return year + '-' +month + '-' +day;
}

export default EditExperience;