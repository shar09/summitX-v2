import React from 'react';

const EducationConfirmDialog = ({ deleteEducation, showConfirmDialog, edu }) => {
    return (
        <div class="modal-bg delete-box">
            <div class="delete-modal">
                <h4 class="confirm-delete">Confirm Delete</h4>
                <p class="delete-text">
                    Are you sure you want delete {edu.school} permenantly?
                </p>
                <div class="confirm-buttons">
                    <button class="delete-no"
                        onClick = { () => showConfirmDialog(false) }
                    >
                        No
                    </button>
                    <button class="delete-yes"
                        onClick = { () => deleteEducation(edu._id) }
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EducationConfirmDialog;