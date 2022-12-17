import React from 'react';

const ConfirmationModal = ({title,description,actionName,closeModal,operation}) => {
    return (
        <div>
           
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{description}</p>
                    <div className="modal-action">
                        <label htmlFor="confirmation-modal" onClick={operation} className="btn bg-red-800">{actionName}</label>
                        <label htmlFor="confirmation-modal" onClick={closeModal} className="btn">cancel</label>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ConfirmationModal;