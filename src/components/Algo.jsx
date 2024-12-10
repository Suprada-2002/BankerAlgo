import React, { useState, useEffect } from 'react';
import { calculateAvailable, calculateNeed, checkSafeState } from './Helper';
import Flow from './ReactFlow';
import '../App.css'
import NeedandAvailMat from './NeedandAvailMat';
import Modal from './Modal';

const BankersAlgorithm = () => {
    const [processes, setProcesses] = useState();
    const [resources, setResources] = useState();
    const [totalResources, setTotalResources] = useState([]); // Example total resources
    const [alloc, setAlloc] = useState([]);
    const [max, setMax] = useState([]);
    const [safeSequence, setSafeSequence] = useState([]);
    const [isDeadlock, setIsDeadlock] = useState(false);
    const [error, setError] = useState(false);
    const [need, setNeed] = useState([]);
    const [available, setAvailable] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Initialize alloc and max matrices based on number of processes and resources
    useEffect(() => {
        resetMatrices(processes, resources);
    }, [processes, resources]);

    const resetMatrices = (numProcesses, numResources) => {
        // Initialize allocation and max matrices
        setAlloc(Array.from({ length: numProcesses }, () => Array(numResources).fill(0)));
        setMax(Array.from({ length: numProcesses }, () => Array(numResources).fill(0)));
    };

    const handleProcessesChange = (value) => {
        const num = parseInt(value);
        if (!isNaN(num) && num > 0) {
            setProcesses(num);
        }
    };

    const handleResourcesChange = (value) => {
        const num = parseInt(value);
        if (!isNaN(num) && num > 0) {
            setResources(num);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const available = calculateAvailable(alloc, totalResources, resources);
        setAvailable(available);

        const need = calculateNeed(alloc, max, processes, resources, setError);
        setNeed(need);
        checkSafeState(alloc, max, processes, available, need, setSafeSequence, setIsDeadlock);

        setIsModalOpen(true);
        console.log(isModalOpen)
    };

    return (
        <div className="container">
            <blockquote className="blockquote text-center">
                <h4 className="mb-0">Banker's Algorithm</h4>
            </blockquote>

            <form onSubmit={handleSubmit}>
                <div className='container text-center'>
                    <div className="row">
                        <div className='col'>

                            <div>
                                <label htmlFor="validationTooltip01">Number of Processes:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    data-toggle="tooltip" data-placement="bottom" title="Total Number of Processes required"
                                    placeholder="Enter no of process"
                                    value={processes}
                                    onChange={(e) => handleProcessesChange(e.target.value)}
                                    min="0"
                                />
                            </div>
                            <div>
                                <label htmlFor="validationTooltip02">Number of Resources:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    data-toggle="tooltip" data-placement="bottom" title="Number of Resources required"
                                    placeholder="Enter no of Resources:"
                                    value={resources}
                                    onChange={(e) => handleResourcesChange(e.target.value)}
                                    min="1"
                                />
                            </div>

                            <div>
                                <label htmlFor="validationTooltip03">Total Resources:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Give comma separated values: 2,1,2'
                                    value={totalResources.join(', ')}
                                    data-toggle="tooltip" data-placement="bottom" title="Total Number of Resources required"
                                    onChange={(e) => setTotalResources(e.target.value.split(',').map(Number))}
                                />
                            </div>
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
                        <div className='col'>
                            {error && <p>Need Matrix has negative values, there may be a deadlock.</p>}
                            {isDeadlock && <p style={{ color: 'red' }}>Deadlock detected!</p>}
                            {!isDeadlock && safeSequence.length > 0 && (
                                // <p style={{ color: 'green' }}>No deadlock. System is in a safe state.</p>
                                <Flow safeSequence={safeSequence} />
                            )}

                        </div>
                    </div>
                </div>


                <div className='container text-center'>
                    <div className="row">
                        <div className="col">

                            <a href="#" className='text-decoration-none' data-bs-toggle="tooltip" data-bs-title="Default tooltip">Max Matrix</a>
                            {Array.from({ length: processes }).map((_, i) => (
                                <div key={i}>
                                    {Array.from({ length: resources }).map((_, j) => (
                                        <input
                                            key={j}
                                            type="text"
                                            // value={max[i]?.[j] || 0}
                                            value={parseInt(max[i]?.[j]) || 0}
                                            onChange={(e) => {
                                                const newMax = [...max];
                                                newMax[i][j] = parseInt(e.target.value) || 0;
                                                setMax(newMax);
                                            }}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className='col'>
                            <a href="#" className='text-decoration-none' data-bs-toggle="Allocation Matrix" data-bs-title="Default tooltip">Allocation Matrix</a>
                            {Array.from({ length: processes }).map((_, i) => (
                                <div key={i}>
                                    {Array.from({ length: resources }).map((_, j) => (
                                        <input
                                            key={j}
                                            type="text"
                                            className=''
                                            // value={alloc[i]?.[j] || 0}
                                            value={parseInt(alloc[i]?.[j]) || 0}
                                            onChange={(e) => {
                                                const newAlloc = [...alloc];
                                                newAlloc[i][j] = parseInt(e.target.value) || 0;
                                                setAlloc(newAlloc);
                                            }}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                    </div>

                    <button className="btn btn-primary mt-3" type="submit">Check Safe State</button>
                </div>
            </form>

            <NeedandAvailMat need={need} alloc={alloc} />

        </div>
    );
};

export default BankersAlgorithm;

