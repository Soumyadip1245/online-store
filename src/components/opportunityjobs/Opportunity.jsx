import React,{useState} from 'react'
import './Opportunity.css'
import Headerjob from './headerfooter/Headerjob';
import Footerjob from './headerfooter/Footerjob';

const Opportunity = () => {

  const [showEmpDetails1, setShowEmpDetails1] = useState(false);
    const [showEmpDetails2, setShowEmpDetails2] = useState(false);

    const handleApplyNowClick1 = () => {
        setShowEmpDetails1(true);
    };

    const handleApplyNowClick2 = () => {
        setShowEmpDetails2(true);
    };

    const handleSubmitClick1 = () => {
        setShowEmpDetails1(false);
    };

    const handleSubmitClick2 = () => {
        setShowEmpDetails2(false);
    };

  return (
    <div className='job-container'>
            <Headerjob />
            <h5 className='heading-job'>Job Opportunities</h5>
            <div className='job-head'>
                <div className='job-card'>
                    {showEmpDetails1 ? (
                        <div className='emp-details'>
                            <div className='input-text-job'>
                                <p className='written text-wrap'>Employee Name</p>
                                <input type="text" className='input-field-job' placeholder='enter your name' />
                            </div>
                            <div className='input-text-job'>
                                <p className='written text-wrap'>Mobile Number</p>
                                <input type="text" className='input-field-job' placeholder='enter your mobile number' />
                            </div>
                            <button className='btn-job' onClick={handleSubmitClick1}>Submit</button>
                        </div>
                    ) : (
                        <div className='job-apply'>
                            <div className='store-name'>Store Name</div>
                            <div className='two-combine'>
                                <div className='job-details-po'>Position: Manager</div>
                                <div className='job-details-time'>Timing: 9-5</div>
                            </div>
                            <div className='two-combine'>
                                <div className='job-details-po'>Location: Gurgaon</div>
                            </div>
                            <div className='job-details'>Description: The job is to monitor sales.</div>
                            <button className='btn-job' onClick={handleApplyNowClick1}>Apply Now</button>
                        </div>
                    )}
                </div>
                <div className='job-card'>
                    {showEmpDetails2 ? (
                        <div className='emp-details'>
                            <div className='input-text-job'>
                                <p className='written text-wrap'>Employee Name</p>
                                <input type="text" className='input-field-job' placeholder='enter your name' />
                            </div>
                            <div className='input-text-job'>
                                <p className='written text-wrap'>Mobile Number</p>
                                <input type="text" className='input-field-job' placeholder='enter your mobile number' />
                            </div>
                            <button className='btn-job' onClick={handleSubmitClick2}>Submit</button>
                        </div>
                    ) : (
                        <div className='job-apply'>
                            <div className='store-name'>Store Name</div>
                            <div className='two-combine'>
                                <div className='job-details-po'>Position: Manager</div>
                                <div className='job-details-time'>Timing: 9-5</div>
                            </div>
                            <div className='two-combine'>
                                <div className='job-details-po'>Location: Gurgaon</div>
                            </div>
                            <div className='job-details'>Description: The job is to monitor sales.</div>
                            <button className='btn-job' onClick={handleApplyNowClick2}>Apply Now</button>
                        </div>
                    )}
                </div>
            </div>
            <hr className='hr-line' />
            <Footerjob />
        </div>
  )
}

export default Opportunity