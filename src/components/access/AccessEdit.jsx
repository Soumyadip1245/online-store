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
    }else {
      setAccess((prevAccess) => ({
        ...prevAccess,
        [name]: value,
      }));
    }
  };
  const enroll= () =>{
    const data = {
      "phoneNumber": access.mobile,
      "name": access.staffName
    }
    
    enrollUser(data)
  }

  return (
    <>
    {/* <VoiceRecognition commands={commands} /> */}
     
      {loader && <Loader />}
      {!loader && (
        <form onSubmit={handleSubmit}>
          <Box m={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Staff Details</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Staff Name"
                  name="staffName"
                  value={access.staffName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Staff Mobile"
                  name="mobile"
                  value={access.mobile}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Staff Email"
                  name="email"
                  value={access.email}
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox name="security" checked={access.isFace} onChange={handleChange} />
                    }
                    label="Enable Security"
                  />
                </FormGroup>
              </Grid> */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="roles-label">Roles</InputLabel>
                  <Select
                    labelId="roles-label"
                    id="roles"
                    name="roles"
                    multiple
                    value={access.roles}
                    onChange={handleChange}
                    input={<OutlinedInput label="Roles" />}
                    renderValue={(selected) => (
                      <div>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </div>
                    )}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{display: 'flex'}}>
                {/* {access.isFace && <Button sx={{mr: '1rem'}} type="button" onClick={enroll} variant="contained" color="primary">
                  Enroll
                </Button>} */}
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
                </Box>
                
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
    </>
  );
};

export default AccessEdit;
