import React, { Fragment } from 'react';
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';

const Experience = ({ experience }) => {    

    return (
        <Fragment>
            <div class="experience-new">
                <h3 class>Experience</h3>
                <p><i class="fas fa-plus"></i> Add Experience </p>
            </div>

            { experience.length > 0 ? (
                experience.map( (exp, index) => (
                    <div class="card" key={index}>
                        <p class="experience-header">
                            <span class="company-name">{exp.company}</span>
                            <span class="edit-experience"> <i class="far fa-edit"></i>
                                <span class="icon-text"> Edit</span>
                            </span>
                        </p>
                        <p class="position">{exp.title} <span class="date">{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Present'}</span> </p>
                        <p class="experience-summary">{exp.description}</p>
                    </div>
                ))
            ): 
            (
                <div>
                    No experience to display.
                </div>
            )}
    
        </Fragment> 
    )
}

export default Experience;