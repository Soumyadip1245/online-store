import React, { useEffect, useState } from "react";
import Access from "../../models/access";
import { Avatar, Box, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Delete , Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import { DeleteIcon,EditIcon } from "@mui/icons-material";
const AccessShow = ({ access: initialAccess, deleteAccess }) => {
  const navigate = useNavigate()
  const [accessOriginal, setAccess] = useState(new Access());
  useEffect(() => {
    setAccess(initialAccess);
  }, [initialAccess]);
  const editButton = () =>{
    navigate("/access-edit/"+accessOriginal._id)
  }
  const deleteButton = () =>{
    deleteAccess(accessOriginal)
  }
  return <Box mb={2}>
    <Card sx={{border: '1px solid lightgrey', display: 'flex',justifyContent: 'space-between'}} >
  <CardContent style={{ display: 'flex', alignItems: 'center' }}>
    <Avatar sx={{ bgcolor: deepOrange[500] }} >{accessOriginal.staffName.slice(0,1)}</Avatar>
    <Typography variant="h6" style={{ marginLeft: '10px' }}>
      {accessOriginal.staffName}
    </Typography>
  </CardContent>
  <CardActions>
    <IconButton onClick={editButton}>
      <Edit/>
    </IconButton>
    <IconButton onClick={deleteButton}>
      <Delete />
    </IconButton>
  </CardActions>
</Card>
  </Box>
};

export default AccessShow;
