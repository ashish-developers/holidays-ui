import React, { useState } from 'react';
import Select from 'react-select';
import { Box, Grid, Typography, Checkbox, FormGroup, FormControlLabel, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const PriceAdjustment = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [amount, setAmount] = useState('');

  // Options for the Select dropdown
  const selectOptions = [
    { value: 'increase_percentage', label: 'Increase price by %' },
    { value: 'decrease_percentage', label: 'Decrease price by %' },
    { value: 'increase_amount', label: 'Increase price by amount' },
    { value: 'decrease_amount', label: 'Decrease price by amount' },
    { value: 'package_price', label: 'Package price' },
  ];

  // Handle Select option change
  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  // Handle Amount input change
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <>
    <form>
      <Grid container spacing={2}>
        {/* Select Dropdown */}
        <Grid item={4}>
          <Typography>Adjustment Type</Typography>
          <Box sx={{ width: 380, maxWidth: '100%' }}>
            <Select
              className='select_option'
              options={selectOptions}
              isMulti={false}
              onChange={handleSelectChange}
              placeholder="Select"
            />
          </Box>
        </Grid>
          <Grid item={4}>
          <Typography>Amount</Typography>
            <Box sx={{ width: 380, maxWidth: '100%' }}>
            <TextField fullWidth label="Amaount" id="fullWidth" />
            </Box>
          </Grid>
       

        {/* Price Adjustment Checkbox */}
        <Grid item={4}>
          <Box sx={{ width: 380, maxWidth: '100%' }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Apply Other Price Adjustments"
              />
            </FormGroup>
            <Typography variant='body2'>
              If ticked, this price adjustment will be applied with any other global price adjustment. This price adjustment is first applied, followed by any other global adjustments.
            </Typography>
          </Box>
        </Grid>
        <Grid item={12}>
          <Typography>Restrict price application between certain dates</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        
        <Grid item ={6}>
          <Box >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Start Date" fullWidth />
      </DemoContainer>
    </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item ={6}>
          <Box >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Start Date" fullWidth />
      </DemoContainer>
    </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
      </form>
    </>
  );
};

export default PriceAdjustment;
