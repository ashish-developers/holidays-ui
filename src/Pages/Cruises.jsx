import React, { useState, useEffect, useRef } from 'react';
import Select from "react-select";
import { styled } from '@mui/material/styles';
import { Grid, Card, CardContent, Box, Tab, Tabs, Typography, FormGroup, Stack, Switch, Button, Checkbox,FormControlLabel,TextField, IconButton, InputAdornment   } from '@mui/material';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Swal from 'sweetalert2'; // Import SweetAlert2
import YouCruises from './YouCruises';
import GloablPrice from './GloablPrice';

const API_OPRATER_BASE = "https://www.widgety.co.uk/api/operators.json";
const API_BASE_URL = "https://www.widgety.co.uk/api/cruises.json";
const APP_ID = "9f8ae7c620357e30f59d1cf1e167ddb4f5b6f1ce";
const TOKEN = "44afd9791417131255f8848f113ce05f05833d11e84c3c75b82c9db4d922ce44";

// Styled AntSwitch component
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], { duration: 200 }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const Cruises = () => {
  const [operators, setOperators] = useState([]);  // Operators data
  const [selectedOperator, setSelectedOperator] = useState([]);  // Selected operator
  const [cruises, setCruises] = useState([]);  // Cruise data
  const [shipDetails, setShipDetails] = useState([]);// Ship details state
  const [value, setValue] = useState(0);  // Active tab state
  const [switchesState, setSwitchesState] = useState({ operatorSwitch: false, });
    // Track already fetched ships to prevent redundant calls
    const fetchedShips = useRef(new Set());


  // Fetch operator data from the API
  const fetchOperator = async () => {
    try {
      const response = await fetch(
        `${API_OPRATER_BASE}?app_id=${APP_ID}&token=${TOKEN}&limit=100`,
        { headers: { Accept: "application/json;api_version=2" } }
      );
      const result = await response.json();
      const fetchedOperators = result.operators.map(operator => ({
        value: operator.title,
        label: operator.title,
        id: operator.id, // Store operator ID
      }));
      setOperators(fetchedOperators);
    } catch (error) {
      console.error("Error fetching operators:", error);
    }
  };

  // Fetch cruise data based on the selected operator's ID
  const fetchCruiseData = async (operatorIds) => {
    if (!operatorIds || operatorIds.length === 0) return;

    try {
      const allCruiseData = await Promise.all(
        operatorIds.map(async id => {
          const response = await fetch(
            `${API_BASE_URL}?app_id=${APP_ID}&token=${TOKEN}&operator=${id}&limit=3000`,
            { headers: { Accept: "application/json;api_version=2" } }
          );
          const result = await response.json();
  
          return result.cruises || [];
        })
      );

      const cruises = allCruiseData.flat();
      setCruises(cruises);

      // Fetch ship details for each cruise (only if not already fetched)
      cruises.forEach(cruise => {
        if (cruise.ship && !fetchedShips.current.has(cruise.ship)) {
          fetchedShips.current.add(cruise.ship); // Mark ship as fetched
          fetchShipDetails(cruise,cruise.ship);
        }
      });
    } catch (error) {
      console.error("Error fetching cruise data:", error);
    }
  };

  // Fetch ship details from the provided URL with authentication
  const fetchShipDetails = async (cruise, shipUrl) => {
    try {
      const response = await fetch(
        `${shipUrl}?app_id=${APP_ID}&token=${TOKEN}`,
        { headers: { Accept: "application/json;api_version=2" } }
      );
      if (!response.ok) {
        throw new Error(`Error fetching ship details: ${response.statusText}`);
      }
      const details = await response.json();
       
      setShipDetails(prevDetails => [...prevDetails, details]);

      // Update the cruise with the ship details
      const updatedCruise = {
        ...cruise,
        shipDetails: details,
        ship_cover_image: details.cover_image_href, 
        ship_profile_image: details.profile_image_href 
      };
      // Console log the updatedCruise object
      console.log(updatedCruise);
      setCruises(prevState => {
        return prevState.map(c => (c.ref === updatedCruise.ref ? updatedCruise : c)); // Update only the matching cruise
      });
    } catch (error) {
      console.error("Error fetching ship details:", error);
    }
  };

  // Handle operator change event
  const handleChangeOperator1 = (selectedOperator2) => {
    const selectedIds = selectedOperator2.map(operator => operator.id);
    setSelectedOperator(selectedOperator2);
    fetchCruiseData(selectedIds); // Fetch cruise data for all selected operators
  };

  // Handle switch change
  const handleSwitchChange = (switchKey) => {
    setSwitchesState(prevState => ({
      ...prevState,
      [switchKey]: !prevState[switchKey],
    }));
    if (switchKey === 'operatorSwitch') {
      setSelectedOperator([]);
    }
  };


 // Save the current filter state to localStorage
  const handleSaveFilter = () => {
    const filterState = {
      selectedOperator,
      switchesState,
    };
    localStorage.setItem('cruiseFilterState', JSON.stringify(filterState));
    Swal.fire({
      title: 'Success!',
      text: 'Filter saved successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  // Load the filter state from localStorage
  const loadFilterState = () => {
    const savedState = localStorage.getItem('cruiseFilterState');
    if (savedState) {
      const { selectedOperator, switchesState } = JSON.parse(savedState);
      setSelectedOperator(selectedOperator);
      setSwitchesState(switchesState);
    }
  };

  // Trigger the fetch of cruise data after loading saved filter state
  useEffect(() => {
    fetchOperator(); // Fetch operators on initial load
    loadFilterState(); // Load saved filter state
  }, []);

  // Trigger the fetch of cruise data when the selected operators change
  useEffect(() => {
    if (value === 1 && selectedOperator.length > 0) {
      const selectedIds = selectedOperator.map(operator => operator.id);
      fetchCruiseData(selectedIds); // Fetch cruise data only when "Your Cruises" tab is selected
    }
  }, [value, selectedOperator]);



const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const [valuenum, setValuenum] = useState("");

  const handleChangenum = (event) => {
    setValuenum(event.target.valuenum);
  };
  
   useEffect(() => {
    // Only fetch cruise data when the "Your Cruises" tab is selected
    if (value === 1) {
      const selectedIds = selectedOperator.map(operator => operator.id);
      if (selectedIds.length > 0) {
        fetchCruiseData(selectedIds); // Fetch cruise data when the "Your Cruises" tab is selected
      }
    }
  }, [value, selectedOperator]);
  
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="Cruise Tabs">
        <Tab label="Cruise Filter" />
        <Tab label="Your Cruises" />
        <Tab label="Global Pricing" />
      </Tabs>

      {/* Cruise Filter Tab */}
      {value === 0 && (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h5">Cruise Filter</Typography>
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
          <Grid item xs={12} md={4}>
  <Card>
    <CardContent>
      <Typography variant="h5" component="div" className='switch_com'>
        Regions
        <FormGroup className='switch_btn'>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography>Off</Typography>
            <AntSwitch
              checked={switchesState.regionSwitch}
              onChange={() => handleSwitchChange('regionSwitch')}
              inputProps={{ 'aria-label': 'Region Switch' }}
            />
            <Typography>On</Typography>
          </Stack>
        </FormGroup>
      </Typography>

      <Select
        className='select_option'
        options={cruises.length > 0 ? 
          [...new Set(cruises.flatMap(cruise => cruise.regions))].map(region => ({
            value: region, 
            label: region
          })) : []
        }
        isMulti
        onChange={(selectedRegions) => {
        }}
        placeholder="Select regions"
      />
    </CardContent>
  </Card>
</Grid>
            {/* Operator Filter */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div" className="switch_com">
                    Operators
                    <FormGroup className="switch_btn">
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Typography>Off</Typography>
                        <AntSwitch
                          checked={switchesState.operatorSwitch}
                          onChange={() => handleSwitchChange('operatorSwitch')}
                          inputProps={{ 'aria-label': 'Operator Switch' }}
                        />
                        <Typography>On</Typography>
                      </Stack>
                    </FormGroup>
                  </Typography>

                  <Select
                    className="select_option"
                    options={operators}
                    isMulti
                    onChange={handleChangeOperator1}
                    placeholder="Select Operator"
                    value={selectedOperator}
                  />
                </CardContent>
              </Card>
            </Grid>
                   {/* Type Filter */}
        <Grid item xs={12} md={4}>
  <Card>
    <CardContent>
      <Typography variant="h5" component="div" className='switch_com'>
        Type
        <FormGroup className='switch_btn'>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography>Off</Typography>
            <AntSwitch
              checked={switchesState.typeSwitch}
              onChange={() => handleSwitchChange('typeSwitch')}
              inputProps={{ 'aria-label': 'Type Switch' }}
            />
            <Typography>On</Typography>
          </Stack>
        </FormGroup>
      </Typography>

      <Select
        className='select_option'
        options={cruises.length > 0 ? 
          [...new Set(cruises.flatMap(cruise => cruise.cruise_type))].map(type => ({
            value: type, 
            label: type
          })) : []
        }
        isMulti
        onChange={(selectedTypes) => {
        }}
        placeholder="Select Types"
      />
    </CardContent>
  </Card>
</Grid>
          {/* Ship Filter */}
             <Grid item xs={12} md={4}>
  <Card>
    <CardContent>
      <Typography variant="h5" component="div" className='switch_com'>
        Ship
        <FormGroup className='switch_btn'>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography>Off</Typography>
            <AntSwitch
              checked={switchesState.shipSwitch}
              onChange={() => handleSwitchChange('shipSwitch')}
              inputProps={{ 'aria-label': 'Ship Switch' }}
            />
            <Typography>On</Typography>
          </Stack>
        </FormGroup>
      </Typography>

      <Select
        className='select_option'
        options={cruises.length > 0 ? 
          [...new Set(cruises.map(cruise => cruise.ship_title))].map(ship => ({
            value: ship, 
            label: ship
          })) : []
        }
        isMulti
        onChange={(selectedShips) => {
        }}
        placeholder="Select Ships"
      />
    </CardContent>
  </Card>
</Grid>
          {/* Port Filter */}
               <Grid item xs={12} md={4}>
  <Card>
    <CardContent>
      <Typography variant="h5" component="div" className='switch_com'>
        Port
        <FormGroup className='switch_btn'>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography>Off</Typography>
            <AntSwitch
              checked={switchesState.portSwitch}
              onChange={() => handleSwitchChange('portSwitch')}
              inputProps={{ 'aria-label': 'Port Switch' }}
            />
            <Typography>On</Typography>
          </Stack>
        </FormGroup>
      </Typography>

      <Select
        className='select_option'
        options={cruises.length > 0 ? 
          [...new Set(cruises.map(cruise => cruise.starts_at))].map(port => ({
            value: port, 
            label: port
          })) : []
        }
        isMulti
        onChange={(selectedPorts) => {
        }}
        placeholder="Select Port"
      />
    </CardContent>
  </Card>
</Grid>
        {/* Airports Filter */}
              <Grid item xs={12} md={4}>
  <Card>
    <CardContent>
      <Typography variant="h5" component="div" className='switch_com'>
        Airports
        <FormGroup className='switch_btn'>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography>Off</Typography>
            <AntSwitch
              checked={switchesState.airportSwitch}
              onChange={() => handleSwitchChange('airportSwitch')}
              inputProps={{ 'aria-label': 'Airport Switch' }}
            />
            <Typography>On</Typography>
          </Stack>
        </FormGroup>
      </Typography>

      <Select
        className="select_option"
        options={cruises.length > 0 ? 
          [...new Set(cruises.flatMap(cruise => cruise.travel_type))].map(travelType => ({
            value: travelType, 
            label: travelType
          })) : []
        }
        isMulti
        onChange={(selectedTravelTypes) => {
        }}
        placeholder="Select Travel Type"
      />
    </CardContent>
  </Card>
</Grid>

             <Grid item xs={12} md={6}>
              <Card>
               <CardContent>
                <Typography variant="h6" component="div" className="date_select_sec">
                       Filter cruises departing by specific or dynamic dates.
                     </Typography>
					<Grid container spacing={2}>
	<Grid item xs={6}>
          {/* Start Date Picker */}
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
					   <Grid container spacing={2}>
                 {/* Number Input Field */}
            <Grid item xs={6}>
          <TextField
            label="Days Away"
            type="number"
            variant="outlined"
            value={valuenum}
            onChange={handleChangenum}
            fullWidth
          />
        
        </Grid>
        <Grid item xs={6}>
        <TextField
          label="Days To"
          type="number"
          variant="outlined"
          value={valuenum}
          onChange={handleChangenum}
          fullWidth
        />
      
      </Grid>
      </Grid>
	    <Typography variant='body2' className='des_a'>Only show cruises up to this many days away from the current date/time</Typography>
					 </CardContent>
					 </Card>
					 
					 </Grid>
					 <Grid item xs={12} md={6}>
              <Card>
               <CardContent>
                 <Typography variant="h6" component="div" className='date_select_sec'>
                  Cruise Package Filters</Typography>

                  {/* Ship select dropdown */}
                  <FormControlLabel required control={<Checkbox />} label="Show Packages Only" />
                  <Typography variant='body2'>Checking this will only show the packages you have created on the website.</Typography>
                
					
					 </CardContent>
					 </Card>
					 
					 </Grid>
            {/* Save Filter Button */}
            <Grid item xs={12} md={4}>
              <Button variant="contained" color="success" onClick={handleSaveFilter}>
                <FilterAltIcon /> Save Filter
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Other tabs */}
    {/* Your Cruises Tab */}
      {value === 1 && (
        <Box sx={{ padding: 2 }}>
          {/* Fetch and display your cruises data */}
          <YouCruises cruises={cruises} shipDetails={shipDetails} />
        </Box>
      )}
      {value === 2 && <Box sx={{ padding: 2 }}><GloablPrice /></Box>}
    </Box>
  );
};

export default Cruises;
