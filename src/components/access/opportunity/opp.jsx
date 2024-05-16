import React, { useEffect, useState } from 'react';
import './opp.css';
import useLocalData from '../../../utils/localSetting';
import { useSelector } from 'react-redux';
import axios from 'axios'
import Seller from '../../../models/seller';
import { useQuery } from 'react-query';
import { GetUser } from '../../login/Auth';
import Access from '../../../models/access';
const Opp = () => {
    const [showForm, setShowForm] = useState(false);
    const [showJobOpening, setShowJobOpening] = useState(true);
    const [showApplications, setShowApplications] = useState(false);
    const [seller, setSeller] = useState(new Seller());
    const [staffs, setStaff] = useState([])
    const [opportunity, setOpportunity] = useState(null)
    const user = useSelector((action) => action.auth.user)
    const fetchData = async () => {
        return await GetUser(user);
    };
    const { data, isLoading } = useQuery("opportunity", fetchData, { enabled: !!user })



    const [formData, setFormData] = useState({
        storeName: '',
        phoneNumber: '',
        location: '',
        description: '',
        timings: '',
        position: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            "phoneNumber": user.phoneNumber > 5 ? user.phoneNumber : user.email
        });
    };

    const handleCreateClick = () => {
        setShowForm(true);
        setShowJobOpening(false);
    };
    const createOpportunity = async (formData) => {
        const response = await axios.post("/fetchDatabase/postOpportunity", formData)
        const text = response.data.message;
        const regex = /Opportunity posted with id : (\w+)/;
        const match = text.match(regex);
        return match[1]
    }
    const getStaff = async () => {
        const response = await axios.post("/fetchDatabase/getStaff", { "opportunityId": seller.opportunityId })
        setStaff(response.data.message)
    }
    const getOpportunity = async () => {
        const response = await axios.post("/fetchDatabase/getOpportunitybyId", { "opportunityId": seller.opportunityId })
        setOpportunity(response.data.message)
    }
    const deleteOpportunity = async () => {
        const response = await axios.delete("/fetchDatabase/deleteOpportunity", { "opportunityId": seller.opportunityId })
        if (response.status == 200) {
            setOpportunity(null)
            setStaff([])
            seller.opportunityId = ""
            await seller.updateOpportunity()
        }
    }
    const addStaff = async (staff) => {
        const access = new Access()
        access.staffName = staff.name
        access.sellerId = seller._id
        access.sellerEmail = seller.profile.email.value
        access.sellerMobile = seller.mobile.number
        access.mobile = staff.phoneNumber
        await access.create()
    }
    const { data: opportunityData } = useQuery("opportunityData", getOpportunity, { enabled: !!seller.opportunityId })
    const { data: staffData } = useQuery("opportunityStaff", getStaff, { enabled: !!seller.opportunityId })
    const handleSubmitOpportunity = async () => {
        console.log(formData)
        const id = await createOpportunity(formData)
        setOpportunity(data)
        if (id) {
            seller.opportunityId = id
            setOpportunity({ ...formData, opportunityId: id });
            getStaff()
            await seller.updateOpportunity()
        }

        setShowForm(false);
        setShowJobOpening(true);
    };

    const toggleApplications = () => {
        setShowApplications(!showApplications);
    };

    useEffect(() => {
        if (data) setSeller(data)
    }, [data])

    return (
        <div className='opp-container'>
            <div className='card-design'>
                <p className='staff-name'>Add Staff Openings</p>
                <div className='opp-create'>
                    <p className='written text-wrap'> Create new openings for your staff.</p>
                    <button className='btn-design' onClick={handleCreateClick}>Create</button>
                </div>



                {opportunity && showJobOpening && (
                    <div className='job-opening'>
                        <div className='card-design '>
                            <div className='opp-card-one'>
                                <div className='opp-card-one-items'>ID: {opportunity.opportunityId}</div>
                                <div className='opp-card-one-items-des' onClick={deleteOpportunity}> <i className="fa-solid fa-trash"></i></div>
                            </div>
                            <div className='opp-card-one'>
                                <div className='opp-card-one-items-pos'>Position: {opportunity.position}</div>
                                <div className='opp-card-one-items'>Timing: {opportunity.timings}</div>
                            </div>

                            <div className='opp-card-one-items-pos'>Location: {opportunity.location}</div>
                            <div className='opp-card-one-items-des'>Description: {opportunity.description}</div>
                        </div>
                    </div>
                )}
                {!opportunity && showJobOpening && (
                    <p className='written text-wrap'> No opportunities is posted</p>

                )}

                {showForm && (
                    <div className='opp-form'>
                        <div className='input-text'>
                            <p className='written text-wrap'>Store Name</p>
                            <input type="text" className='input-field send-app' name="storeName" value={formData.storeName} onChange={handleInputChange} placeholder='enter your store name' />
                        </div>
                        <div className='opp-two'>
                            <div className='input-text position-timing'>
                                <p className='written text-wrap'>Position</p>
                                <input type="text" className='input-field send-app' name="position" value={formData.position} onChange={handleInputChange} placeholder='enter the position' />
                            </div>
                            <div className='input-text position-timing'>
                                <p className='written text-wrap'>Timing</p>
                                <input type="text" className='input-field send-app' name="timings" value={formData.timings} onChange={handleInputChange} placeholder='enter the timing of the job' />
                            </div>
                        </div>
                        <div className='input-text'>
                            <p className='written text-wrap'>Location</p>
                            <input type="text" className='input-field send-app' name="location" value={formData.location} onChange={handleInputChange} placeholder='enter the location' />
                        </div>
                        <div className='input-text'>
                            <p className='written text-wrap'>Description</p>
                            <textarea className='opp-desc' name="description" value={formData.description} onChange={handleInputChange} cols="30" rows="5" placeholder='enter the description of the job'></textarea>
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

                {staffs.length > 0 && showApplications && (
                    <div className='job-apps'>
                        {
                            staffs.map((staff) => (
                                <div className='card-design'>
                                    <div className='opp-applications'>
                                        <div className='opp-app-one'>{staff.name}</div>
                                        <div className='opp-app-one' onClick={() => addStaff(staff)}><i className="fa-solid fa-plus"></i></div>
                                    </div>
                                    <div className='opp-app-one'>Contact: {staff.phoneNumber}</div>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default Opp;
