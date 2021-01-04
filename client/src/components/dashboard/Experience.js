import React, { Fragment, useState } from 'react';
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const Experience = ({ experience, addExperience }) => {    
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
            <div class="experience-new">
                <h3 class>Experience</h3>
                <p onClick={ () => setAddExp(true) }><i class="fas fa-plus"></i> Add Experience </p>
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
                        experience.map( (exp, index) => (
                            <div className="card" key={index}>
                                <p className="experience-header">
                                    <span className="company-name">{exp.company}</span>
                                    <span className="edit-experience"> <i className="far fa-edit"></i>
                                        <span className="icon-text"> Edit</span>
                                    </span>
                                </p>
                                <p className="position">{exp.title} <span className="date">{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Present'}</span> </p>
                                <p className="experience-summary">{exp.description}</p>
                            </div>
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
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(Experience);