import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Access from "../../models/access";
import Seller from "../../models/seller";
import { useSelector } from "react-redux";
import { GetUser } from "../login/Auth";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import "./Access.css"
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Loader from "../../utils/loader/Loader";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { enrollUser } from "../../utils/face-recognition/face";
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition";
import { speakMessage } from "../../utils/voice-recognition/Speak";
import { message } from "antd";
const AccessEdit = () => {
  const [seller, setSeller] = useState(new Seller());
  const [access, setAccess] = useState(new Access());
  const [originalAccess, setOriginal] = useState(new Access());
  const [selectedRoles, setSelectedRoles] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const names = [
    "Store",
    "Orders",
    "Transactions",
    "Products",
    "Rentals",
    "Access",
  ];
  useEffect(() => {
    if (user != null) {
      const fetchData = async () => {
        const userData = await GetUser(user);
        setSeller(userData);
        if (id) {
          const accessData = await Access.getById(id);
          setOriginal(accessData);
          setAccess(accessData);
          setLoader(false);
          return;
        } else {
          setLoader(false);
        }
      };
      fetchData();
    }
  }, [user]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (id) {
      originalAccess.staffName = access.staffName;
      originalAccess.mobile = access.mobile;
      originalAccess.email = access.email;
      originalAccess.roles = access.roles;
      originalAccess.isFace = access.isFace
      await originalAccess.updateAccess();
      message.success("Details updated")
      navigate("/access");
      return;
    }

    originalAccess.staffName = event.target.elements.staffName.value;
    originalAccess.mobile = event.target.elements.mobile.value;
    originalAccess.email = event.target.elements.email.value;
    originalAccess.roles = access.roles;
    originalAccess.sellerId = seller._id;
    originalAccess.isFace = access.isFace
    originalAccess.sellerEmail = seller.profile.email.value;
    originalAccess.sellerMobile = seller.mobile.number;
    await originalAccess.create();
    message.success("Details created")
    navigate("/access");
  };

  const handleRoleChange = (event, name) => {
    const isChecked = event.target.checked;
    let updatedRoles = [...access.roles];
    if (isChecked) {
      updatedRoles.push(name);
    } else {
      updatedRoles = updatedRoles.filter((role) => role !== name);
    }
    setAccess((prevAccess) => ({
      ...prevAccess,
      roles: updatedRoles,
    }));
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === "roles") {
      const data = [...value];

      setAccess((prevAccess) => ({
        ...prevAccess,
        roles: data,
      }));
    } else if (name === "security") {
      const isChecked = event.target.checked;
      setAccess((prevAccess) => ({
        ...prevAccess,
        isFace: isChecked,
      }));
    } else {
      setAccess((prevAccess) => ({
        ...prevAccess,
        [name]: value,
      }));
    }
  };
  const enroll = () => {
    const data = {
      "phoneNumber": access.mobile,
      "name": access.staffName
    }

    enrollUser(data)
  }

  return (
    <>
      {loader && <div>Loading...</div>}
      {!loader && (
        <form onSubmit={handleSubmit}>
          <div>
            <h6>Staff Details</h6>
          </div>
          <div className="storedetails-container">
            <div className="card-design">
              <p className="store-name">Staff Details</p>
              <div className="input-text">
                <input
                  type="text"
                  placeholder="enter your staff name"
                  name="staffName"
                  className="input-field"
                  value={access.staffName}
                  onChange={handleChange}
                />
                <p className="written text-wrap">The staff name will be displayed for all visitors to see.</p>

              </div>
              <div className="input-text">
                <input
                  type="text"
                  placeholder="enter your mobile number"
                  className="input-field"
                  name="mobile"
                  value={access.mobile}
                  onChange={handleChange}
                />
                <p className="written text-wrap">The mobile number will be visible only to the store owner.</p>

              </div>
              <div className="input-text">
                <input
                  type="email"
                  placeholder="enter your email address"
                  name="email"
                  className="input-field"
                  value={access.email}
                  onChange={handleChange}
                />
                <p className="written text-wrap">The email will be visible exclusively to the store owner.</p>

              </div>
              <div className="input-text">
                {names.map((name) => (
                  <label key={name} className="checkbox-label">
                    <input
                      type="checkbox"
                      label={name}
                      className="input-field"
                      checked={access.roles.includes(name)}
                      onChange={(event) => handleRoleChange(event, name)}
                    />
                    {name}
                  </label>

                ))}

                <p className="written text-wrap">Choose the roles for your staff members.</p>

              </div>
              <div>
              <button className="btn-design" type="submit">Save</button>
              </div>

            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default AccessEdit;
