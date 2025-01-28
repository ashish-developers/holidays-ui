import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Grid, Button, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Select2 from "react-select";
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight: personName === name
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Itinerary = ({ itinerary, value }) => {

  //  FORM STATE 
  const initialFormData = {
    port: "",
    date: "",
    end_date: "",
    dec: "",
    name: "",
  }
  const [formData, setFormData] = useState(initialFormData);
  const [showTable, setShowTable] = useState(false);
  const [personName, setPersonName] = useState('');
  const [tableData, setTableData] = useState([]);
  const [editorValue, setEditorValue] = useState('');
  const theme = useTheme();

  const handleButtonClick = () => {
    setShowTable(!showTable);
  };

  const handleChange = (event) => {
    const { target: { value } } = event;
    setPersonName(value);
  };

  const handleAddItem = () => {
    if (personName) {
      setTableData([...tableData, personName]);
      setPersonName('');
    }
  };

  const handleDelete = (name) => {
    setTableData(tableData.filter(item => item !== name));
  };
  const renderFormContent = () => {
    switch (personName) {

      case 'Cruise':
        return (
          <>
            <Grid container spacing={2}>

              <Grid item={6}><Box sx={{ width: 580, maxWidth: '100%' }}>
                <TextField label="Port" fullWidth margin="normal" name="port" />
              </Box>
              </Grid>
              <Grid item={6}><Box sx={{ width: 580, maxWidth: '100%' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Check In Date" fullWidth name="date" />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              </Grid>
              <Grid item={6}><Box sx={{ width: 580, maxWidth: '100%' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Check Out Date" fullWidth name="end_date" />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              </Grid>
              <Grid item={6}><Box sx={{ width: 580, maxWidth: '100%' }}>
                <Typography >Description</Typography>
                <ReactQuill
                  value={editorValue}
                  onChange={setEditorValue}
                  style={{ height: '100%' }}
                  name="dec"
                />
              </Box>
              </Grid>
            </Grid>
          </>
        );

      case 'Miscellaneous':
        return (
          <>
            <TextField label="Item Name" fullWidth margin="normal" name="name" />
            <TextField label="Description" fullWidth margin="normal" name="dec" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item={12}>
          <Box sx={{ textAlign: 'right' }}>
            <Button variant="contained" color="success" onClick={handleButtonClick}>
              <AddIcon /> ADD
            </Button>
          </Box>
        </Grid>
      </Grid>

      {showTable && (
        <TableContainer component={Paper} sx={{ marginTop: '20px', padding: '10px' }} className="table_container">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((name, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{name}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(name)}
                    >
                      <DeleteIcon /> DELETE
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>

          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-single-name-label">Type</InputLabel>
            <Select
              labelId="demo-single-name-label"
              id="demo-single-name"
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {itinerary.map((value) => (

                <MenuItem
                  key={value.value}
                  value={value.value}
                // style={getStyles(value, personName, theme)}
                >
                  {value.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {personName && (
            <Grid item={12} sx={{ marginTop: '20px' }}>
              <h3>Selected Type: {personName}</h3>
              {renderFormContent()}
            </Grid>
          )}

          <Grid container spacing={2} sx={{ marginTop: '20px' }}>
            <Grid item={6}>
              <Button variant="contained" color="success" onClick={handleAddItem} fullWidth className='btn_se'>
                <CloudDoneIcon /> DONE
              </Button>
            </Grid>
            <Grid item={6}>
              <Button variant="outlined" color="error" fullWidth className='btn_se'>
                <DeleteIcon /> DELETE
              </Button>
            </Grid>
          </Grid>
        </TableContainer>
      )}
    </>
  );
};

export default Itinerary;
