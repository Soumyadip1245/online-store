import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Notify = ({ message, type }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpen(false);
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={type}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Notify;
