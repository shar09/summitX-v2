import React, { useState } from 'react';
import formatDate from '../../utils/formatDate';

const EditEducation = ({ edu, editEducation, deleteEducation }) => {
    const initialState = {
        school: edu.school,
        degree: edu.degree,
        fieldofstudy: edu.fieldofstudy,
        from: formatEdu(formatDate(edu.from)),
        to: formatEdu(formatDate(edu.to)),
        description: edu.description
    }

    const [showEdit, setShowEdit] = useState([ edu._id, false ]);

    const [editEdu, setEditEdu] = useState(initialState);

    const { school, degree, fieldofstudy, from, to, description } = editEdu;

    const handleChange = e => {
        setEditEdu({
            ...editEdu,
            [e.target.name]: e.target.value
        });
    }

    const setInitialState = () => {
        setEditEdu({
            ...initialState
        });
    }

    const handleSubmit = (e, id) => {
        e.preventDefault();
        setShowEdit([id, false]);
        editEducation(id, editEdu);
    }

    return (
        !showEdit[1] ? (
            <div key={edu._id} className="card">
                <p className="experience-header">
                    <span className="company-name">{edu.school}</span>
                    <span className="edit-experience" onClick={ () => setShowEdit([edu._id, true]) }> <i className="far fa-edit"></i>
                        <span className="icon-text"> Edit</span> 
                    </span>
                </p>
                <p className="position">{degree}, {fieldofstudy} <span className="date">{formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Present'}</span> </p>
                <p className="experience-summary">{edu.description}</p>
            </div>
        ) : (
            <div className="add-experience card">
                <p className="experience-header">
                    <span className="company-name">{edu.school}</span>
                    <span className="edit-experience">
                        <button className="add-exp-button" type="submit" form="edit-edu-form"
                            onClick= {(e) => handleSubmit(e, edu._id)}
                        >
                            Save
                        </button>
                        <button className="delete-exp-button"
                            onClick={() => deleteEducation(edu._id) }    
                        >Delete
                        </button>
                        <span onClick={() => { setShowEdit([edu._id, false]); setInitialState(); }} className="exp-cancel">Cancel</span>
                    </span>
                </p>
                <form id="add-edu-form" className="exp-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="company">School</label>
                            <input type="text" id="school" placeholder="School" 
                                name="school"
                                value={school} 
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="degree">Degree</label>  
                            <input type="text" id="degree" placeholder="BS, MS, etc" 
                                name="degree"
                                value={degree} 
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fieldofstudy">Field Of Study</label>  
                            <input type="text" id="fieldofstudy" placeholder="Computer Science, Mechanical Engineering, etc" 
                                name="fieldofstudy"
                                value={fieldofstudy} 
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
                            <label htmlFor="to">To Date</label>
                            <input id="to" type="date" 
                                name="to" 
                                value={to}
                                onChange={handleChange}
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
                            />
                        </div>
                    </form>  
            </div>
        )
    );
}

function formatEdu(d) {
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

export default EditEducation;