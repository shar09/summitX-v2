import React from 'react';

const ExperienceConfirmDialog = ({ deleteExperience, showConfirmDialog, exp }) => {
    return (
        <div class="modal-bg delete-box">
            <div class="delete-modal">
                <h4 class="confirm-delete">Confirm Delete</h4>
                <p class="delete-text">
                    Are you sure you want delete {exp.company} permenantly?
                </p>
                <div class="confirm-buttons">
                    <button class="delete-no"
                        onClick = { () => showConfirmDialog(false) }
                    >
                        No
                    </button>
                    <button class="delete-yes"
                        onClick = { () => deleteExperience(exp._id) }
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExperienceConfirmDialog;