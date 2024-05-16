import React, { useState } from 'react'
import './Opportunity.css'
import Headerjob from './headerfooter/Headerjob';
import Footerjob from './headerfooter/Footerjob';
import { useQuery } from 'react-query';
import axios from 'axios'
const Opportunity = () => {

    const [showEmpDetails1, setShowEmpDetails1] = useState(false);
    const [showEmpDetails2, setShowEmpDetails2] = useState(false);
    const [opportunity, setOpportunity] = useState([])
    const [empDetails, setEmpDetails] = useState({
        name: '',
        phoneNumber: ''
    });
    const handleApplyNowClick1 = () => {
        setShowEmpDetails1(true);
    };

    const handleApplyNowClick2 = () => {
        setShowEmpDetails2(true);
    };

    const handleSubmitClick1 = async (opportunity) => {
        console.log(empDetails)
        if(!empDetails.name && !empDetails.phoneNumber) return
        const response = await axios.post("/fetchDatabase/applyPosition", {
            name: empDetails.name,
            phoneNumber: empDetails.phoneNumber,
            opportunityId: opportunity.opportunityId,
            storeName: opportunity.storeName
        })
        console.log(response)
        if(response.status == 200){
            setShowEmpDetails1(false);
        }
    };

    const handleSubmitClick2 = () => {
        setShowEmpDetails2(false);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmpDetails({
            ...empDetails,
            [name]: value
        });
    };
    const getAll = async () => {
        const response = await axios.get("/fetchDatabase/getOpportunity")
        if (response.status == 200) {
            setOpportunity(response.data.message)
        }
    }
    const { data } = useQuery("opportunityStaff", getAll)
    return (
        <div className='job-container'>
            <Headerjob />
            <h5 className='heading-job'>Job Opportunities</h5>
            {opportunity.map((opportunity) => (
                <div className='job-head'>
                    <div className='job-card'>
                        {showEmpDetails1 ? (
                            <div className='emp-details'>
                            <div className='input-text-job'>
                                <p className='written text-wrap'>Employee Name</p>
                                <input type="text" className='input-field-job' name="name"value={empDetails.name}
                onChange={handleInputChange} placeholder='enter your name' />
                            </div>
                            <div className='input-text-job'>
                                <p className='written text-wrap'>Mobile Number</p>
                                <input type="text" className='input-field-job' name="phoneNumber" value={empDetails.phoneNumber}
                onChange={handleInputChange} placeholder='enter your mobile number' />
                            </div>
                            <button className='btn-job' onClick={() => handleSubmitClick1(opportunity)}>Submit</button>
                        </div>
                        ) : (
                            <div className='job-apply'>
                                <div className='store-name'>{opportunity.storeName}</div>
                                <div className='two-combine'>
                                    <div className='job-details-po'>Position: {opportunity.position}</div>
                                    <div className='job-details-time'>Timing: {opportunity.timings}</div>
                                </div>
                                <div className='two-combine'>
                                    <div className='job-details-po'>Location: {opportunity.location}</div>
                                </div>
                                <div className='job-details'>Description: {opportunity.description}</div>
                                <button className='btn-job' onClick={handleApplyNowClick1}>Apply Now</button>
                            </div>
                        )}
                    </div>
                    
                </div>
            ))}
            <hr className='hr-line' />
            <Footerjob />
        </div>
    )
}

export default Opportunity