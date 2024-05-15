import React, { useState } from 'react';
import './opp.css';
import useLocalData from '../../../utils/localSetting';

const Opp = () => {
    const [showForm, setShowForm] = useState(false);
    const [showJobOpening, setShowJobOpening] = useState(true);
    const [showApplications, setShowApplications] = useState(false);
    

    const handleCreateClick = () => {
        setShowForm(true);
        setShowJobOpening(false);
    };

    const handleSubmitOpportunity = () => {
        setShowForm(false);
        setShowJobOpening(true);
    };

    const toggleApplications = () => {
        setShowApplications(!showApplications);
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
                                <div className='opp-card-one-items-des'> <i className="fa-solid fa-trash"></i></div>
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
                            <input type="text" className='input-field send-app' placeholder='enter your store name' />
                        </div>
                        <div className='opp-two'>
                            <div className='input-text position-timing'>
                                <p className='written text-wrap'>Position</p>
                                <input type="text" className='input-field send-app' placeholder='enter the position' />
                            </div>
                            <div className='input-text position-timing'>
                                <p className='written text-wrap'>Timing</p>
                                <input type="text" className='input-field send-app' placeholder='enter the timing of the job' />
                            </div>
                        </div>
                        <div className='input-text'>
                            <p className='written text-wrap'>Location</p>
                            <input type="text" className='input-field send-app' placeholder='enter the location' />
                        </div>
                        <div className='input-text'>
                            <p className='written text-wrap'>Description</p>
                            <textarea className='opp-desc' name="" id="" cols="30" rows="5" placeholder='enter the description of the job'></textarea>
                        </div>
                        <button className='btn-design' style={{ "marginTop": "20px" }} onClick={handleSubmitOpportunity}>Submit Opportunity</button>
                    </div>
                )}
                {!showForm && (
                    <div className='open-app' onClick={toggleApplications}>
                        <div className='written text-wrap'>Show Applications</div>
                        <div className='show-apps'>
                            <span className="arrow-show">
                                <i className={`fa-solid ${showApplications ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: '20px', transition: 'transform 1s' }}></i>
                            </span>
                        </div>
                    </div>
                )}

                {showApplications && (
                    <div className='job-apps'>
                        <div className='card-design'>
                            <div className='opp-applications'>
                                <div className='opp-app-one'>Shubham</div>
                                <div className='opp-app-one'><i className="fa-solid fa-plus"></i></div>
                            </div>
                            <div className='opp-app-one'>Contact: +91-9958098940</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Opp;
