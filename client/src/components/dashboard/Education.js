import React, { Fragment, useState } from 'react';
import EditEducation from './EditEducation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation, editEducation, deleteEducation } from '../../actions/profile';

const Education = ({ education, addEducation, editEducation, deleteEducation }) => {    
    const [addEdu, setAddEdu] = useState(false);

    const initialState = {
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        description: ''
    }

    const [newEdu, setNewEdu] = useState(initialState);
    const { school, degree, fieldofstudy, from, to, description } = newEdu;

    const handleChange = e => {
        setNewEdu({
            ...newEdu,
            [e.target.name]: e.target.value
        });
    }

    const setInitialState = () => {
        setNewEdu({
            ...initialState
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        setAddEdu(false);
        addEducation(newEdu);
        setInitialState();
    }

    return (
        <Fragment>
            <div className="experience-new">
                <h3>Education</h3>
                <p onClick={ () => setAddEdu(true) }><i className="fas fa-plus"></i> Add Education </p>
            </div>

            { addEdu ? (           
                <div className="fadeIn add-experience card">
                    <p className="experience-header">
                        <span className="company-name">Add Education</span>
                        <span className="">
                            <button className="add-exp-button" 
                                type="submit"
                                form="add-edu"
                            >
                                Add
                            </button>
                            <span onClick={() => { setAddEdu(false); setInitialState(); }} className="exp-cancel">Cancel</span>
                        </span>
                    </p>
                    <form id="add-edu" className="exp-form" onSubmit={handleSubmit}>
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
                </div> ) : (

                <Fragment>
                    { education.length > 0 ? (
                        education.map( edu => (
                            <EditEducation
                                key={edu._id} 
                                edu={edu} 
                                editEducation={editEducation} 
                                deleteEducation={deleteEducation}
                            />
                        ))
                    ): 
                    (
                        <div>
                            No education to display.
                        </div>
                    )}
                </Fragment> )
            }
        </Fragment> 
    )
}

Education.propTypes = {
    addEducation: PropTypes.func.isRequired,
    editEducation: PropTypes.func.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation, editEducation, deleteEducation })(Education);