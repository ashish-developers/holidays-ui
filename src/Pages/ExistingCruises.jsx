import React, { useState } from 'react';
import { Grid, TextField, Box, Dialog, DialogTitle, DialogContent, Checkbox, FormControlLabel, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; 
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import SelectExistingCruises from './Selectexitingcruises';

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

function createData(image, name, departs, price, stay) {
  return { image, name, departs, price, stay };
}

const rows = [
  createData(
    'https://via.placeholder.com/50',  
    'Cruise 1', 
    'Miami', 
    '$500', 
    '7 days'
  ),
  createData(
    'https://via.placeholder.com/50',  
    'Cruise 2', 
    'Barcelona', 
    '$600', 
    '5 days'
  ),
];

const ExistingCruises = ({ open, handleClose }) => {
  const sortOptions = [
    { label: 'Price (Low to High)', value: 'price_low_high' },
    { label: 'Price (High to Low)', value: 'price_high_low' },
    { label: 'Departure Date (Soonest First)', value: 'departure_soonest_first' }
  ];

  const [openselect, setSelectOpen] = useState(false); 
  const [selectedCruise, setSelectedCruise] = useState(null);

  // Handle opening the select dialog
  const handleClickOpen = (cruise) => {
    setSelectedCruise(cruise);
    setSelectOpen(true);
  };

  // Handle closing the select dialog
  const handleSelectClose = () => {
    setSelectOpen(false);
    setSelectedCruise(null); 
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} className="sub_dialog">
        <DialogTitle>
          Package Cruise
          <Button onClick={handleClose} color="primary" className="close_btn">
            <CloseIcon />
          </Button>
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body1">
            Based on your cruise admin filters here, these are all of your available cruises.
          </Typography>
          <FormControlLabel control={<Checkbox />} label="Include all faresets from the selected cruise" />
          
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Box className="search_box">
                  <TextField fullWidth label="Search (Enter at least three characters)" id="Reference" />
                </Box>
              </Grid>
              <Grid item={6}>
                <Box sx={{ width: 587, maxWidth: '100%' }}>
                  <Select className="select_option" options="" isMulti onChange="" placeholder="ALL Operator" value="" />
                </Box>
              </Grid>
              <Grid item={6}>
                <Box sx={{ width: 587, maxWidth: '100%' }}>
                  <Select className="select_option" options="" isMulti onChange="" placeholder="ALL Ship" value="" />
                </Box>
              </Grid>
              <Grid item={6}>
                <Box sx={{ width: 587, maxWidth: '100%' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateRangePicker']}>
                      <DateRangePicker
                        defaultValue={[dayjs().startOf('week').subtract(1, 'day'), dayjs().endOf('week').startOf('day')]}
                        shouldDisableDate={(date, position) => {
                          if (position === 'end') {
                            return false;
                          }
                          return date.day() === 0 || date.day() === 6;
                        }}
                        format="DD MMM YYYY" 
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid item xs={6} sx={{ width: 587, maxWidth: '100%' }}>
                <Box className="filter_box">
                  <Select
                    className="select_option"
                    options={sortOptions}
                    isMulti={false}  
                    placeholder="Sort by"
                    onChange={(selectedOption) => console.log(selectedOption)}
                    value={null}  
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>  
                <Button variant="contained" color="success" className="reset_btn">
                  <RestartAltIcon /> Reset
                </Button>
              </Grid>
              <Grid item xs={3}> 
                <Button variant="contained" color="success" className="search_btn">
                  <SearchIcon /> Search
                </Button> 
              </Grid>
            </Grid>
          </form>
          
          {/* Table for displaying cruises */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" className="table_cruises">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Cruises</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Dep</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Stay Day</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell>
                      <img src={row.image} alt={row.name} style={{ width: 100, height: 50 }} />
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 300, height: 50 }}>{row.name}</StyledTableCell>
                    <StyledTableCell style={{ width: 200, height: 50 }}>{row.departs}</StyledTableCell>
                    <StyledTableCell>{row.price}</StyledTableCell>
                    <StyledTableCell>{row.stay}</StyledTableCell>
                    <StyledTableCell>
                      <Button variant="contained" color="success" onClick={() => handleClickOpen(row)}>
                        <CheckIcon /> SELECT
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>

      {/* SelectExistingCruises component to show selected cruise details */}
      <SelectExistingCruises 
        openselect={openselect} 
        handleSelectClose={handleSelectClose} 
        selectedCruise={selectedCruise} 
      />
    </>
  );
};

export default ExistingCruises;
