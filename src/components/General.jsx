import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Grid, Box, Typography, TextField, Slider, Button } from '@mui/material';
import Select from "react-select";
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

import 'dayjs/locale/en';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BackupIcon from '@mui/icons-material/Backup';
const isWeekend = (date) => {
  return date.day() === 0 || date.day() === 6;
};
const lastSunday = dayjs().startOf('week').subtract(1, 'day');
const nextSunday = dayjs().endOf('week').startOf('day');

const General = ({ categories, value, onChange }) => {

  const [selectedOperator, setSelectedOperator] = useState([]);
  const [selectedShip, setSelectedShip] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedCat, setSelectedCat] = useState([]);

  //  FORM STATE 
  const initialFormData = {
    name: "",
    reference: "",
    operator: "",
    ship: "",
    region: "",
    type: "",
    starts_on: " ",
    end_date: " ",
    categories: " ",
    price_filter: " ",
    img: " ",
    img1: " ",
    img2: " ",
    img3: " ",
    summery: " ",
    sale_message: "",
    text: " ",
    text1: " ",
    text2: " ",
    text3: " ",
  }

  const [formData, setFormData] = useState(initialFormData);
  // Sample options for the select fields
  const operatorOptions = [
    { value: 'operator1', label: 'Operator 1' },
    { value: 'operator2', label: 'Operator 2' },
    { value: 'operator3', label: 'Operator 3' },
  ];

  const shipOptions = [
    { value: 'ship1', label: 'Ship 1' },
    { value: 'ship2', label: 'Ship 2' },
    { value: 'ship3', label: 'Ship 3' },
  ];

  const regionOptions = [
    { value: 'region1', label: 'Region 1' },
    { value: 'region2', label: 'Region 2' },
    { value: 'region3', label: 'Region 3' },
  ];
  const type = [
    { value: 'ocean', label: 'ocean' },
    { value: 'river', label: 'river' },

  ];

  // Handle change for Select components
  const handleOperatorChange = (selectedOptions) => {
    setSelectedOperator(selectedOptions);
  };

  const handleShipChange = (selectedOptions) => {
    setSelectedShip(selectedOptions);
  };

  const handleRegionChange = (selectedOptions) => {
    setSelectedRegion(selectedOptions);
  };
  const handleTypeChange = (selectedType) => {
    setSelectedType(selectedType);
  };
  const handleCatChange = (selectedCat) => {
    console.log(selectedCat[0].value);
    onChange("categories", selectedCat[0].value)
  };
  const [editorValue, setEditorValue] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileUpload(file)
  };

  const onFileUpload = async (fileName) => {
    const formData = new FormData();
    formData.append("ship_profile_image", fileName);

    await fetch("http://52.87.39.93/api/file/upload", {
      method: "POST",
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("File uploaded successfully", data);
      onChange(data.name, data.path)
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
  };

  return (
    <>

      <Grid container spacing={2} className='form_tab'>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <TextField fullWidth label="name" onChange={(e) => onChange("name", e.target.value)} id="name" name={value.name} value={value.value} />
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <TextField fullWidth label="Reference" onChange={(e) => onChange("reference", e.target.value)} id="Reference" name={value.reference} value={value.reference} />
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <Select
              className="select_option"
              options={operatorOptions}
              isMulti
              onChange={handleOperatorChange}
              placeholder="Operator"
              name={value.operator} value={value.operator}
            />
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <Select
              className="select_option"
              options={shipOptions}
              isMulti
              onChange={handleShipChange}
              placeholder="Ship"
              name={value.ship} value={value.ship}
            />
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <Select
              className="select_option"
              options={regionOptions}
              isMulti
              onChange={handleRegionChange}
              placeholder="Region"
              name={value.region} value={value.region}
            />
          </Box>
        </Grid>


        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <Select
              className="select_option"
              options={type}
              isMulti
              onChange={handleTypeChange}
              placeholder="Type"
              name={value.type} value={value.type}
            />
          </Box>
        </Grid>
        <Grid item={3}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker name={value.starts_on} value={value.starts_on} label="Start Date" />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item={3}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="End Date" name={value.ends_on} value={value.ends_on} />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <Select
              className="select_option"
              options={categories}
              isMulti
              placeholder={value.categories}
              onChange={handleCatChange}
              name={value.categories} value={value.categories}
            />

          </Box>
        </Grid>

        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" name='price_filter' />
          </Box>
        </Grid>


        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <Typography variant='h6'>Cruise Image</Typography>
            <Button variant="contained" color="success" sx={{ width: '100%', height: '80px' }} component="label">
              <BackupIcon />Choose a file or drag it here
              <input name={value.ship_profile_image} type="file" hidden onChange={handleFileChange} />
            </Button>
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <Typography variant='h6'>Sales Banner</Typography>
            <Button variant="contained" color="success" sx={{ width: '100%', height: '80px' }} component="label">
              <BackupIcon />  Choose a file or drag it here
              <input type="file" hidden name={value.sales_banner} value={value.sales_banner} /> </Button>
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <Typography variant='h6'>Cruise Banner</Typography>
            <Button variant="contained" color="success" sx={{ width: '100%', height: '80px' }} component="label">
              <BackupIcon />  Choose a file or drag it here
              <input name={value.ship_cover_image} value={value.ship_cover_image} type="file" hidden /> </Button>
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <Typography variant='h6'>Mobile Cruise Banner</Typography>
            <Button variant="contained" color="success" sx={{ width: '100%', height: '80px' }} component="label">
              <BackupIcon />  Choose a file or drag it here
              <input name={value.mobile_cruise_banner} value={value.mobile_cruise_banner} type="file" hidden /> </Button>
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <TextField fullWidth label="Summary" id="fullWidth" name='summary' />
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <TextField fullWidth label="Sales Message" id="fullWidth" name='sale_message' />
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%', height: '100px' }}>
            <Typography >Text Banner</Typography>
            <ReactQuill value={editorValue} onChange={setEditorValue} style={{ height: '100%' }} name='text' />

          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%', height: '100px' }}>
            <Typography >Overview</Typography>
            <ReactQuill value={editorValue} onChange={setEditorValue} style={{ height: '100%' }} name='text1' />
          </Box>
        </Grid>
        <Grid item={6} className='text_edit'>
          <Box sx={{ width: 580, maxWidth: '100%', height: '100px' }}>
            <Typography >Whats Included</Typography>
            <ReactQuill value={editorValue} onChange={setEditorValue} style={{ height: '100%' }} name='text2' />
          </Box>
        </Grid>
        <Grid item={6} className='text_edit'>
          <Box sx={{ width: 580, maxWidth: '100%', height: '100px' }}>
            <Typography >Extras</Typography>
            <ReactQuill value={editorValue} onChange={setEditorValue} style={{ height: '100%' }} name='text3' />
          </Box>
        </Grid>

      </Grid>




    </>
  )
}

export default General