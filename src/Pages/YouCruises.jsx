import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Select from "react-select";

import { Grid, Card, CardContent, Box, Slider, Typography, Checkbox, Button,TextField, IconButton, InputAdornment,FormControlLabel,FormGroup    } from '@mui/material';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TablePagination from '@mui/material/TablePagination';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Model from './Model';
import Packge from './Packge';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
function valuetext(value) {
    return `${value}°C`;
  }
const YouCruises = ({ cruises, shipDetails,  onView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [modalData, setModalData] = useState(null);

  const handleOpenPackageModal = (item) => {
    setModalData(item); // Pass the data to the modal
    setShowModal(true);
  };
  
 // console.log("test:",cruises);
   {/*SELECT OPRATOR CODE Start Here*/}
   const [selectedCruiseLine, setSelectedCruiseLine] = useState(null);
   const cruiseLineOptions = cruises
     .map(cruise => cruise.operator_title) 
     .filter((value, index, self) => self.indexOf(value) === index) 
     .map(operator => ({ value: operator, label: operator })); 
 
   const handleCruiseLineChange = (selectedOption) => {
     setSelectedCruiseLine(selectedOption);
   };
   {/*SELECT OPRATOR CODE END Here*/}
   {/*SELECT SHIP CODE Start Here*/}
   const [selectedShip, setSelectedShip] = useState(null);
   const shipOptions = cruises.map(cruise => ({
     value: cruise.ship_title,  
     label: cruise.ship_title, 
   }));
 
   // Handle changes for Ship selection
   const handleShipChange = (selectedOption) => {
     setSelectedShip(selectedOption);
   };
   {/* SHIP SELECT CODE END Here*/}

    {/* SELECT REGIONS CODE START HERE */}
   const [selectedRegions, setSelectedRegions] = useState([]);

   // Extract unique regions across all cruises
   const regionOptions = cruises
     .flatMap(cruise => cruise.regions) 
     .filter((value, index, self) => self.indexOf(value) === index) 
     .map(region => ({
       value: region,
       label: region,
     }));
 
   const handleRegionChange = (selectedOptions) => {
     setSelectedRegions(selectedOptions);
   };

   {/* SELECT REGIONS CODE END HERE */}
   {/* SELECT PORT CODE START HERE */}
   const [selectedDeparturePorts, setSelectedDeparturePorts] = useState([]);

   const departurePortOptions = cruises
     .map(cruise => cruise.starts_at) 
     .filter((value, index, self) => self.indexOf(value) === index) 
     .map(port => ({
       value: port,
       label: port, 
     }));
 
   const handleDeparturePortChange = (selectedOptions) => {
     setSelectedDeparturePorts(selectedOptions);
   };
   {/* SELECT PORT CODE END HERE */}

    {/* DATE PICKER CODE Start Here*/}
    
    const [page, setPage] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(10); 
  
    // Handle page change
    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };
  
    // Handle rows per page change
    const handleRowsPerPageChange = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0); // Reset to the first page
    };
  
    const handleToggleSwitch = (event, item) => {
      const newValue = event.target.checked;
      console.log(`Toggle status for ${item.name || item.title}: ${newValue}`);
      // Add your logic to update the status
    };
  
    const paginatedCruises = cruises.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  
    const paginatedShipDetails = shipDetails.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
 
  {/* DATE PICKER CODE END HERE */}



 
  const [loading, setLoading] = useState(false);
  
 {/* CHECKBOX CODE START HERE */}
 const [showCruiseEdit, setShowCruiseEdit] = useState(false);

 // Handle the checkbox change
 const handleCheckboxChange = (event) => {
   setShowCruiseEdit(event.target.checked); // Set state based on checkbox value
 };

 // Handle clearing all
 const handleClearAll = () => {
   setShowCruiseEdit(false);
 };
 const [showCruisePackages, setShowCruisePackages] = useState(false);
 const handleCheckboxShow = (event) => {
   setShowCruisePackages(event.target.checked); 
 };
 const handleClearAllShow = () => {
    setShowCruisePackages(false); 
  };
 {/* CHECKBOX CODE END HERE */}

  {/* PRICE SLIDER STSRT HERE */}
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [allduration, setAllDuration] = React.useState([20, 37]);

  const handleDuration = (event, newValue) => {
    setAllDuration(newValue);
  };
  const [price, setPrice] = useState ([0,100]);
  const handlePrice =(event, newValue) =>{
    setPrice(newValue);
  }
   {/* PRICE SLIDER END HERE */}
   const [open, setOpen] = useState(false);

  // Function to open the dialog
  const handleClick = () => {
    setOpen(true); // Open the dialog
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false); // Close the dialog
  };
  return (
    <>
   
   <Grid container className="main_you_cruiess" spacing={2}>
   <Grid item xs={12} md={6}>
   <Typography variant='h4'>Your Cruise Filter</Typography>
   </Grid>
   {/* PAKAGE PAGE CLICK BUTOON START HERE  */}
        <Grid item xs={12} md={6} className="packge_btn">
        <Packge open={open} handleClose={handleClose} />
         
        </Grid>
  
        
     {/* PAKAGE PAGE CLICK BUTOON END HERE  */}
<Grid item xs={12} md={4}>
  <Card>
    <CardContent>
      {/* Date Pickers in the same line */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Start Date"
            customInput={
              <TextField
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton edge="start">
                        <CalendarMonthIcon style={{ cursor: "pointer" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            }
          />
        </Grid>

        <Grid item xs={6}>
          {/* End Date Picker */}
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="End Date"
            customInput={
              <TextField
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton edge="start">
                        <CalendarMonthIcon style={{ cursor: "pointer" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            }
          />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
</Grid>


   {/* Cruise Line Selector */}
   <Grid item xs={12} md={4}>
        <Box className="main_box_you">
          <Card>
            <CardContent>
            <Select
        className="select_option"
        options={cruiseLineOptions} 
        onChange={handleCruiseLineChange} 
        placeholder="Select Cruise Line"
        value={selectedCruiseLine} 
      />
            </CardContent>
          </Card>
        </Box>
      </Grid>
      

   {/* Select Ship Selector */}
      <Grid item xs={12} md={4}>
        <Box className="main_box_you">
          <Card>
            <CardContent>
              <Select
                className="select_option"
                options={shipOptions} 
                isMulti={true} 
                onChange={handleShipChange} 
                placeholder="Select Ships"
                value={selectedShip} 
              />
            </CardContent>
          </Card>
        </Box>
      </Grid>

  {/* Fourth Item (this will wrap to the next row) */}
  <Grid item xs={12} md={4}>
    <Box className="main_box_you">
      <Card>
        <CardContent>
           <Select className='select_option' options=''isMulti onChange=''placeholder="Select Types"value='' />
        </CardContent>
      </Card>
    </Box>
  </Grid>
  {/* Select Destination Regions */}
      <Grid item xs={12} md={4}>
        <Box className="main_box_you">
          <Card>
            <CardContent>
              <Select
                className="select_option"options={regionOptions} isMulti  onChange={handleRegionChange} placeholder="Select Destination"
                value={selectedRegions}
              />
            </CardContent>
          </Card>
        </Box>
      </Grid>
     {/* Select Departure Port */}
      <Grid item xs={12} md={4}>
        <Box className="main_box_you">
          <Card>
            <CardContent>
              <Select
                className="select_option" options={departurePortOptions}  isMulti  onChange={handleDeparturePortChange} 
                placeholder="Select Departure Port"
                value={selectedDeparturePorts} 
              />
            </CardContent>
          </Card>
        </Box>
      </Grid>

    
      <Grid item xs={12} md={4} clas>
        <Typography variant='body2'>Ship Capacity: All Capacity</Typography>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      </Grid>
      <Grid item xs={12} md={4}>
      <Typography variant='body2'>Duration: All durations</Typography>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={allduration}
        onChange={handleDuration}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      </Grid>
      <Grid item xs={12} md={4}>
      <Typography variant='body2'>Price Range: All prices</Typography>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={price}
        onChange={handlePrice}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      </Grid>
      <Grid item xs={12} md={6}>
  <Box className="main_box_you">
      {/* Checkbox with the label "Show cruise with edit" */}
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={showCruiseEdit} onChange={handleCheckboxChange} />}
          label="Show cruise with edit"
        />
      </FormGroup>

      {/* Show the "Clear All" button when the checkbox is checked */}
      {showCruiseEdit && (
        <Box marginTop={2}>
          <Button variant="contained" color="secondary" onClick={handleClearAll}>
            Clear All
          </Button>
        </Box>
      )}
    </Box>
    </Grid>
    <Grid item xs={12} md={6}>
        <Box className="main_box_you">
          {/* Checkbox with the label "Show cruise packages" */}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={showCruisePackages} onChange={handleCheckboxShow} />}
              label="Show cruise packages"
            />
          </FormGroup>

          {/* Show the "Clear All" button when the checkbox is checked */}
          {showCruisePackages && (
            <Box marginTop={2}>
              <Button variant="contained" color="secondary" onClick={handleClearAllShow}>
                Clear All
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
      
</Grid>
  {/* Cruise Information */}
  <h2 style={{ margin: '20px 0' }}>Your Cruises</h2>
  {cruises.length > 0 ? (
        <TableContainer component={Paper} style={{ marginBottom: '40px', overflowX: 'auto' }}>
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell><b>Name</b></StyledTableCell>
                <StyledTableCell><b>Ship</b></StyledTableCell>
                <StyledTableCell><b>Imgage</b></StyledTableCell>
                <StyledTableCell><b>Ref</b></StyledTableCell>
                <StyledTableCell><b>Date</b></StyledTableCell>
                <StyledTableCell><b>Price</b></StyledTableCell>
                <StyledTableCell><b>Logo</b></StyledTableCell>
                <StyledTableCell><b>Place</b></StyledTableCell>
                <StyledTableCell><b>Actions</b></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCruises.map((cruise, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{cruise.name}</StyledTableCell>
                  <StyledTableCell>{cruise.ship_title}</StyledTableCell>
                  <StyledTableCell>
                    {cruise.ship_cover_image && (
                      <img src={cruise.ship_cover_image} width={50} height={50} alt="Ship Cover" />
                    )}
                    {!cruise.ship_cover_image && (
                      <img src={(paginatedCruises.find(el => el.ship_title == cruise.ship_title).ship_cover_image)} width={50} height={50} alt="Ship Cover" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell>${cruise.vendor_id}</StyledTableCell>
                  <StyledTableCell>{new Date(cruise.starts_on).toLocaleDateString()}</StyledTableCell>
                  <StyledTableCell>${cruise.cruise_only_price}</StyledTableCell>
                  <StyledTableCell>
                    {cruise.ship_profile_image && (
                      <img src={cruise.ship_profile_image} width={75} alt="Ship Profile" />
                    )}
                    {!cruise.ship_profile_image && (
                      <img src={(paginatedCruises.find(el => el.ship_title == cruise.ship_title).ship_profile_image)} width={50} height={50} alt="Ship Cover" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell>{cruise.starts_at}</StyledTableCell>
                  <StyledTableCell>
                    <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                      <Tooltip title="Toggle Status">
                        <Switch
                          checked={cruise.isActive}
                          onChange={(e) => handleToggleSwitch(e, cruise)}
                          color="success"
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </Tooltip>


                     {/* <Model show={showModal} onHide={() => setShowModal(false)} data={cruise}  /> */}
                     <div className="container mt-3">
                        <button onClick={() =>handleOpenPackageModal(cruise)} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit_cruise">
                        <EditIcon />
                        </button>
                      </div>
                      <Tooltip title="View">
                        <IconButton onClick={() => onView(cruise)} color="info">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          {showModal && (
          <Model data={modalData}  />
          )}
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={cruises.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </TableContainer>
      ) : (
        <p>No cruises available</p>
      )}
    </>
  )
}

export default YouCruises