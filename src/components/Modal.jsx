import React, { useState } from 'react';
import { useEffect } from 'react';

function Modal({isDeadlock,error,safeSequence,isModalOpen}) {
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    return (
        <>
          
            {isModalOpen && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                                    <span aria-hidden="true">x</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            {error && <p>Need Matrix has negative values, there may be a deadlock.</p>}
                                {isDeadlock && <p style={{ color: 'red' }}>Deadlock detected!</p>}
                                {!isDeadlock && safeSequence.length > 0 && (
                                    <p style={{ color: 'green' }}>No deadlock. System is in a safe state.</p>
                                )}
                                {safeSequence.length > 0 && (
                                    <div>
                                        <h6>One of the generated Safe Sequence is:</h6>
                                        <p>{safeSequence.join(' -> ')}</p>
                                        <p><em>Note: There can be more than one safe sequence possible for the given inputs.</em></p>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Example for an Explanation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
