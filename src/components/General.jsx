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

const apiHost = (window.location.hostname.indexOf('localhost') == -1) ? '16.170.107.234' : 'localhost';

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
    { value: '1', label: 'Azamara' }
  ];

  const shipOptions = [
    { value: '1', label: 'Azamara Quest' },
    { value: '2', label: 'Azamara Journey' },
    { value: '3', label: 'Azamara Pursuit' },
  ];

  const regionOptions = [
    { value: '1', label: 'Africa' },
    { value: '2', label: 'Antarica' },
    { value: '3', label: 'Worldwide' },
  ];
  const type = [
    { value: '1', label: 'Ocean' },
    { value: '2', label: 'River' },

  ];

  // Handle change for Select components
  const handleOperatorChange = (selected) => {
    onChange("operator", (selected[0] ? selected.map(item => item.value) : ''))
  };

  const handleShipChange = (selected) => {
    console.log(selected)
    onChange("ship", (selected[0] ? selected.map(item => item.value) : ''))
  };

  const handleRegionChange = (selected) => {
    onChange("region", (selected[0] ? selected.map(item => item.value) : ''))
  };
  const handleTypeChange = (selected) => {
    onChange("type", (selected[0] ? selected.map(item => item.value) : ''))
  };

  const handleStartOnChange = (selected) => {
    onChange("starts_on", (selected[0] ? selected[0].value : ''))
  }
  const handleCatChange = (selected) => {
    onChange("categories", (selected[0] ? selected.map(item => item.value) : ''))
  };
  const [editorValue, setEditorValue] = useState('');

  const handleFileProfileChange = (event) => {
    const file = event.target.files[0];
    onFileUpload(file, 'ship_profile_image')
  };

  const handleFileSalesChange = (event) => {
    const file = event.target.files[0];
    onFileUpload(file, 'sales_banner')
  };

  const handleFileCruiseChange = (event) => {
    const file = event.target.files[0];
    onFileUpload(file, 'ship_cover_image')
  };

  const handleFileMobileChange = (event) => {
    const file = event.target.files[0];
    onFileUpload(file, 'mobile_cruise_banner')
  };
  

  const onFileUpload = async (fileName, name) => {
    const formData = new FormData();
    formData.append(name, fileName);

    await fetch(`http://${apiHost}:9001/api/file/upload`, {
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
              name={value.operator}
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
              name={value.ship}
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
              name={value.region}
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
              name={value.type}
            />
          </Box>
        </Grid>
        <Grid item={3}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker onChange={(newVal) => onChange("starts_on", newVal.format('YYYY-MM-DD'))} name={value.starts_on} label="Start Date" />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item={3}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker onChange={(newVal) => onChange("ends_on", newVal.format('YYYY-MM-DD'))} name={value.ends_on} label="End Date" />
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
              placeholder="Category"
              onChange={handleCatChange}
              name={value.categories}
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
              <input name={value.ship_profile_image} type="file" hidden onChange={handleFileProfileChange} />
            </Button>
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <Typography variant='h6'>Sales Banner</Typography>
            <Button variant="contained" color="success" sx={{ width: '100%', height: '80px' }} component="label">
              <BackupIcon />  Choose a file or drag it here
              <input name={value.sales_banner} type="file" hidden onChange={handleFileSalesChange} /> </Button>
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <Typography variant='h6'>Cruise Banner</Typography>
            <Button variant="contained" color="success" sx={{ width: '100%', height: '80px' }} component="label">
              <BackupIcon />  Choose a file or drag it here
              <input name={value.ship_cover_image} type="file" hidden onChange={handleFileCruiseChange} /> </Button>
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <Typography variant='h6'>Mobile Cruise Banner</Typography>
            <Button variant="contained" color="success" sx={{ width: '100%', height: '80px' }} component="label">
              <BackupIcon />  Choose a file or drag it here
              <input name={value.mobile_cruise_banner} type="file" hidden onChange={handleFileMobileChange} /> </Button>
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <TextField fullWidth label="Summary" id="fullWidth" onChange={(e) => onChange("summery", e.target.value)} value={value.summery} name={value.summery} />
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <TextField fullWidth label="Sales Message" id="fullWidth" onChange={(e) => onChange("sale_message", e.target.value)} value={value.sale_message} name={value.sale_message} />
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%', height: '100px' }}>
            <Typography >Text Banner</Typography>
            <ReactQuill value={value.text_banner} name={value.text_banner} onChange={(newValue) => onChange("text_banner", newValue)} style={{ height: '100%' }} />

          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%', height: '100px' }}>
            <Typography >Overview</Typography>
            <ReactQuill value={value.overview} name={value.overview} onChange={(newValue) => onChange("overview", newValue)} style={{ height: '100%' }} />
          </Box>
        </Grid>
        <Grid item={6} className='text_edit'>
          <Box sx={{ width: 580, maxWidth: '100%', height: '100px' }}>
            <Typography >Whats Included</Typography>
            <ReactQuill value={value.included} name={value.included} onChange={(newValue) => onChange("included", newValue)} style={{ height: '100%' }} />
          </Box>
        </Grid>
        <Grid item={6} className='text_edit'>
          <Box sx={{ width: 580, maxWidth: '100%', height: '100px' }}>
            <Typography >Extras</Typography>
            <ReactQuill value={value.extras} name={value.extras} onChange={(newValue) => onChange("extras", newValue)} style={{ height: '100%' }} />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default General