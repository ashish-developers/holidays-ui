import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Grid, Box, Typography,TextField, Slider,Button  } from '@mui/material';
import Select from "react-select";
import dayjs from 'dayjs';
import 'dayjs/locale/en'; 
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import BackupIcon from '@mui/icons-material/Backup';
const isWeekend = (date) => {
  return date.day() === 0 || date.day() === 6; 
};
const lastSunday = dayjs().startOf('week').subtract(1, 'day');
const nextSunday = dayjs().endOf('week').startOf('day');

const General = () => {
  const [editorValue, setEditorValue] = useState('');
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); 
    }
  };
  return (
   <>
   <form >
   <Grid container  spacing={2} className='form_tab'>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
      <TextField fullWidth label="name" id="name" name="name" />
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
      <TextField fullWidth label="Reference" id="Reference" />
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
      <Select className="select_option" options='' isMulti onChange='' placeholder="Operator" value=''/>
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
      <Select className="select_option" options='' isMulti onChange='' placeholder="Ship" value=''/>
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
      <Select className="select_option" options='' isMulti onChange='' placeholder="Region" value=''/>
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DateRangePicker
          defaultValue={[lastSunday, nextSunday]}
          shouldDisableDate={(date, position) => {
            if (position === 'end') {
              return false;
            }
            return isWeekend(date);
          }}
          format="DD MMM YYYY" 
        />
      </DemoContainer>
    </LocalizationProvider>
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
      <Select className="select_option" options='' isMulti onChange='' placeholder="Type" value=''/>
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
        <Typography variant='h6'>Cruise Image</Typography>
      <Button variant="contained" color="success" sx={{ width: '100%', height: '80px' }} component="label">
      <BackupIcon />Choose a file or drag it here
      <input type="file" hidden onChange={handleFileChange} />
      </Button>
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
      <Typography variant='h6'>Sales Banner</Typography>
      <Button  variant="contained" color="success" sx={{ width:'100%', height: '80px' }} component="label">
      <BackupIcon />  Choose a file or drag it here<input type="file" hidden /> </Button>
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
      <Typography variant='h6'>Cruise Banner</Typography>
      <Button  variant="contained" color="success" sx={{ width:'100%', height: '80px' }} component="label">
      <BackupIcon />  Choose a file or drag it here<input type="file" hidden /> </Button>
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
      <Typography variant='h6'>Mobile Cruise Banner</Typography>
      <Button  variant="contained" color="success" sx={{ width:'100%', height: '80px' }} component="label">
      <BackupIcon />  Choose a file or drag it here<input type="file" hidden /> </Button>
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
      <TextField fullWidth label="Summary" id="fullWidth" />
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
      <TextField fullWidth label="Sales Message" id="fullWidth" />
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%', height: '100px'  }}>
      <Typography >Text Banner</Typography>
      <ReactQuill
        value={editorValue}
        onChange={setEditorValue}
        style={{ height: '100%' }}
      />
  
      </Box>
    </Grid>
    <Grid item={6}>
      <Box sx={{ width: 580, maxWidth: '100%', height: '100px' }}>
        <Typography >Overview</Typography>
      <ReactQuill
        value={editorValue}
        onChange={setEditorValue}
        style={{ height: '100%' }}
      />
      </Box>
    </Grid>
    <Grid item={6} className='text_edit'>
      <Box sx={{ width: 580, maxWidth: '100%', height: '100px' }}>
        <Typography >Whats Included</Typography>
      <ReactQuill
        value={editorValue}
        onChange={setEditorValue}
        style={{ height: '100%' }}
      />
      </Box>
    </Grid>
    <Grid item={6} className='text_edit'>
      <Box sx={{ width: 580, maxWidth: '100%', height: '100px' }}>
        <Typography >Extras</Typography>
      <ReactQuill
        value={editorValue}
        onChange={setEditorValue}
        style={{ height: '100%' }}
      />
      </Box>
    </Grid>
    <Grid item={12} className='category_field'>
      <Box sx={{ width: 580, maxWidth: '100%' }}>
      <Select className="select_option" options='' isMulti onChange='' placeholder="Categories" value=''/>
      </Box>
    </Grid>
   </Grid>
   
   </form>
  
   
   </>
  )
}

export default General