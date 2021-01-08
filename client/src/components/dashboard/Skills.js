import React, { Fragment, useState } from 'react';
import PropTypes from'prop-types';
import { connect }from 'react-redux';
import { addSkill, deleteSkill } from '../../actions/profile';

const Skills = ({ skills, addSkill, deleteSkill }) => {

    const [editSkills, setEditSkills] = useState(false);

    const [text, setText] = useState('');

    const handleChange = e => {
        setText(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        addSkill({ text });
        setText('');
    }

    return (
        <Fragment>
            <div className="experience-new">
                <h3 className>Skills</h3>
            </div>
            
            { !editSkills ? (
                <div className="card">
                    <p className="experience-header">
                        <span className="company-name">Technical Skills</span>
                        <span className="edit-experience" onClick={ () => setEditSkills(true) }> <i className="far fa-edit"></i>
                            <span className="icon-text"> Edit</span>
                        </span>
                    </p>
                    
                    <div className="skills-container">
                        { skills.length > 0 ? (
                        <Fragment>
                            { skills.map (skill => (
                                <span key={skill._id} className="skill"> {skill.text} </span>
                            ))}
                        </Fragment>
                        ) : (
                            <div style={{ margin: '0 10px 5px' }}> No skills to display. </div>
                        )}
                    </div>
                </div>        
                ) : (
                    <div class="card">
                        <p class="experience-header">
                            <span class="company-name">Technical Skills</span>
                            <span class="">
                                <button class="add-exp-button" type="submit" onClick={ () => setEditSkills(false) }>Save</button>
                            </span>
                        </p>
                    
                        <div class="skills-form">
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="Add Skills" 
                                    name="text"
                                    value={text}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="submit"> Add </button>
                            </form>
                        </div>

                        <div class="skills-container">
                            { skills.map (skill => (
                                <span key={skill._id} className="skill edit-padding"> {skill.text} 
                                    <i class="fas fa-window-close skill-delete" 
                                        onClick={ () => deleteSkill(skill._id)}
                                    /> 
                                </span>
                            ))}
                        </div>
                    </div>
                )
            }
        </Fragment>    
    );
}

Skills.propTypes = {
    addSkill: PropTypes.func.isRequired,
    deleteSkill: PropTypes.func.isRequired,
    skills: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    skills: state.profile.profile.skills
});

export default connect(mapStateToProps, { addSkill, deleteSkill })(Skills);