import React, { useEffect, useState } from "react";
import AccessList from "./AccessList";
import Seller from "../../models/seller";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../login/Auth";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Loader from "../../utils/loader/Loader";
import { useSelector } from "react-redux";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Access from "../../models/access";
import { useQuery } from "react-query";
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition";
import { speakMessage } from "../../utils/voice-recognition/Speak";
import Opp from "./opportunity/opp";
import useLocalData from "../../utils/localSetting";
const AccessDetails = () => {
  const {activateJobs}=useLocalData();
  const [seller, setSeller] = useState(new Seller());
  const user = useSelector((state) => state.auth.user);
  const [loader, setLoader] = useState(true);
  const [accessList, setAccess] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    const userData = await GetUser(user);
    const accessData = await Access.getAllAccessBySeller(userData._id);
    return { userData, accessData }
  };
  const { data, isLoading } = useQuery("access", fetchData, { enabled: !!user })
  useEffect(() => {
    if (data) {
      setAccess(data.accessData)
      setSeller(data.userData)
    }
  }, [data])
  const deleteAccess = async (id) => {
    const access = new Access();
    access._id = id._id;
    await access.delete();
    const updatedList = accessList.filter((access) => access._id !== id._id);
    setAccess(updatedList);
  };
  const commands = [];

  return (
    <>
      {/* <VoiceRecognition commands={commands} /> */}

      <Box>
        {isLoading && <Loader />}
        {!isLoading && (
          <AccessList
            seller={seller}
            accessList={accessList}
            deleteAccess={deleteAccess}
          />
        )}
        
      </Box>
      {activateJobs && <Opp/>}
      
      
    </>
  );
};

export default AccessDetails;
