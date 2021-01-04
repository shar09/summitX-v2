import React, { Fragment, useState } from 'react';
import formatDate from '../../utils/formatDate';
import EditExperience from './EditExperience';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience, editExperience } from '../../actions/profile';

const Experience = ({ experience, addExperience, editExperience }) => {    
    const [addExp, setAddExp] = useState(false);

    const initialState = {
        company: '',
        title: '',
        from: '',
        to: '',
        current: false,
        description: ''
    }

    const [newExp, setNewExp] = useState(initialState);
    const { company, title, from, to, current, description } = newExp;

    const handleChange = e => {
        setNewExp({
            ...newExp,
            [e.target.name]: e.target.value
        });
    }

    const setInitialState = () => {
        setNewExp({
            ...initialState
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        setAddExp(false);
        addExperience(newExp);
    }

    return (
        <Fragment>
            <div className="experience-new">
                <h3>Experience</h3>
                <p onClick={ () => setAddExp(true) }><i className="fas fa-plus"></i> Add Experience </p>
            </div>

            { addExp ? (           
                <div className="fadeIn add-experience card">
                    <p className="experience-header">
                        <span className="company-name">Add Experience</span>
                        <span className="">
                            <button className="add-exp-button" 
                                type="submit"
                                form="add-exp"
                            >
                                Add
                            </button>
                            <span onClick={() => { setAddExp(false); setInitialState(); }} className="exp-cancel">Cancel</span>
                        </span>
                    </p>
                    <form id="add-exp" className="exp-form" onSubmit={handleSubmit}>
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
                                value={current}
                                onChange={() => {
                                    setNewExp({ ...newExp, current: !current });
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
                </div> ) : (

                <Fragment>
                    { experience.length > 0 ? (
                        experience.map( exp => (
                            <EditExperience 
                                key={exp._id} 
                                exp={exp} 
                                editExperience={editExperience} 
                            />
                        ))
                    ): 
                    (
                        <div>
                            No experience to display.
                        </div>
                    )}
                </Fragment> )
            }
        </Fragment> 
    )
}

Experience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    editExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience, editExperience })(Experience);