import React, { useState } from 'react';
import { Box, Grid, Typography, Button, TextField } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import AddIcon from '@mui/icons-material/Add';
import Select from "react-select";
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
const Option = () => {

  const [showContent, setShowContent] = useState(false);

  const handleButtonClick = () => {
    setShowContent(!showContent);
  };

 
  const selectOptions = [
    { value: 'Increase price by amount', label: 'Increase price by amount' },
    { value: 'Decrease price by amount', label: 'Decrease price by amount' },
  ];


  const handleDelete = () => {
    setShowContent(false); 
  };


  const handleDone = () => {

    console.log("Form Done!");
  };

  return (
    <>
      <Grid container spacing={2} className='warning_meg'>
        <Grid item={12}>
          <Box>
            <Typography className='warning_text'>
              <WarningIcon /> No options have been defined yet.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Button className='add_btn_t'
        variant="contained"
        color="success"
        onClick={handleButtonClick}
      >
        <AddIcon /> ADD
      </Button>

      {showContent && (
        <Grid container spacing={2} className='added_content'>
          <Grid item={4}>
            <Box sx={{ width: 380, maxWidth: '100%' }}>
              <TextField fullWidth label="Name" id="name" name="option_name" />
            </Box>
          </Grid>

          <Grid item={4}>
            <Box sx={{ width: 380, maxWidth: '100%' }}>
              <TextField fullWidth label="Amount" id="amount" name="option_amount" />
            </Box>
          </Grid>

          {/* Replace the last TextField with a Select dropdown */}
          <Grid item={4}>
            <Box sx={{ width: 380, maxWidth: '100%' }}>
              <Select
                options={selectOptions}
                placeholder="Select an option"
              />
            </Box>
          </Grid>

          {/* Add Delete and Done buttons below the form */}
          <Grid item={12} sx={{ marginTop: '16px', textAlign: 'right' }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              sx={{ marginRight: '8px' }}
            >
             <DeleteIcon /> Delete
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleDone}
            >
              <CloudDoneIcon />Done
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Option;
