import React, { useState } from 'react';
import './opp.css';

const Opp = () => {
    const [showForm, setShowForm] = useState(false);
    const [showJobOpening, setShowJobOpening] = useState(true);

    const handleCreateClick = () => {
        setShowForm(true);
        setShowJobOpening(false);
    };

    const handleSubmitOpportunity = () => {
        setShowForm(false); 
        setShowJobOpening(true);
    };

    return (
        <div className='opp-container'>
            <div className='card-design'>
                <p className='staff-name'>Add Staff Openings</p>
                <div className='opp-create'>
                    <p className='written text-wrap'> Create new openings for your staff.</p>
                    <button className='btn-design' onClick={handleCreateClick}>Create</button>
                </div>

                {showJobOpening && (
                    <div className='job-opening'>
                        <div className='card-design '>
                            <div className='opp-card-one'>
                                <div className='opp-card-one-items'>ID: 2yqio</div>
                                <div className='opp-card-one-items-des'> <i class="fa-solid fa-trash"></i></div>
                            </div>
                            <div className='opp-card-one'>
                                <div className='opp-card-one-items-pos'>Position: Manager</div>
                                <div className='opp-card-one-items'>Timing: 9AM- 5PM(IST)</div>
                            </div>

                            <div className='opp-card-one-items-pos'>Location: Gurgaon</div>
                            <div className='opp-card-one-items-des'>Description: The job will be to manage the store supplies.</div>

                        </div>
                    </div>
                )}

                {showForm && (
                    <div className='opp-form'>
                        <div className='input-text'>
                            <p className='written text-wrap'>Store Name</p>
                            <input type="text" className='input-field' placeholder='enter your store name' />
                        </div>
                        <div className='opp-two'>
                            <div className='input-text'>
                                <p className='written text-wrap'>Position</p>
                                <input type="text" className='input-field-access' placeholder='enter the position' />
                            </div>
                            <div className='input-text'>
                                <p className='written text-wrap'>Timing</p>
                                <input type="text" className='input-field-access' placeholder='enter the timing of the job' />
                            </div>
                        </div>
                        <div className='input-text'>
                            <p className='written text-wrap'>Location</p>
                            <input type="text" className='input-field' placeholder='enter the location' />
                        </div>
                        <div className='input-text'>
                            <p className='written text-wrap'>Description</p>
                            <textarea className='opp-desc' name="" id="" cols="30" rows="5" placeholder='enter the description of the job'></textarea>
                        </div>
                        <button className='btn-design' style={{ "marginTop": "20px" }} onClick={handleSubmitOpportunity}>Submit Opportunity</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Opp;
