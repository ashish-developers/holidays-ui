import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Image from '../assets/st.jpg'; // Static image import
import Logo from '../assets/logo.png'; // Static logo import

const API_BASE_URL = "https://www.widgety.co.uk/api/cruises.json";
const APP_ID = "9f8ae7c620357e30f59d1cf1e167ddb4f5b6f1ce";
const TOKEN = "44afd9791417131255f8848f113ce05f05833d11e84c3c75b82c9db4d922ce44";



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

// Define columns with renderCell for image and logo columns
const columns = [
  {
    field: 'Image',
    headerName: 'Image',
    width: 110,
    renderCell: (params) => (
      <img
        src={params.row.cover_image_href || Image} // Dynamic ship image or fallback to default
        alt="Ship"
        style={{ width: '100%' }}
      />
    ),
  },
  {
    field: 'Cruises',
    headerName: 'Cruises',
    width: 300,
    renderCell: (params) =>(params.row.ship_title),
  },
  {
    field: 'DEP',
    headerName: 'DEP',
    width: 100,
    renderCell: (params) =>(params.row.starts_on), // Call formatDate here
  },
  {
    field: 'Price',
    headerName: 'PRICE',
    width: 100,
    renderCell: (params) => `$${params.row.cruise_only_price}`,
  },
  {
    field: 'Ref',
    headerName: 'Ref',
    width: 100,
    renderCell: (params) => params.row.ref,
  },
  {
    field: 'CruiseLogo',
    headerName: 'Logo',
    width: 100,
    renderCell: (params) => (
      <img
        src={params.row.profile_image_href || Logo} // Dynamic logo or fallback to default
        alt="Cruise Logo"
        style={{ width: '100%', height: 'auto' }}
      />
    ),
  },
  {
    field: 'Action',
    headerName: 'ACTION',
    width: 130,
    renderCell: (params) => {
      const [switchChecked, setSwitchChecked] = useState(false);

      const handleSwitchChange = () => {
        setSwitchChecked(!switchChecked); // Toggle the switch
      };

      return (
        <Box display="flex" justifyContent="space-around" alignItems="center">
          {/* Preview Icon Button */}
          <IconButton
            color="primary"
            aria-label="preview"
            onClick={() => alert(`Preview: ${params.row.Cruises}`)}
          >
            <PreviewIcon />
          </IconButton>

          {/* Edit Icon Button */}
          <IconButton
            color="secondary"
            aria-label="edit"
            onClick={() => alert(`Edit: ${params.row.Cruises}`)}
          >
            <EditIcon />
          </IconButton>

          {/* AntSwitch for Toggle Action */}
          <AntSwitch
            checked={switchChecked}
            onChange={handleSwitchChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
      );
    },
  },
];

// Pagination model
const paginationModel = { page: 0, pageSize: 50 }; // Setting the page size to 50

const ShipTable = () => {
  const [cruiseItems, setCruiseItems] = useState([]);
  const [shipDetails, setShipDetails] = useState({});
  const [totalCruises, setTotalCruises] = useState(0); // Track the total number of cruises

  // Fetch cruise types and details
  useEffect(() => {
    const fetchCruiseTypes = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}?app_id=${APP_ID}&token=${TOKEN}&limit=3000`, // Fetching a higher limit of cruises
          { headers: { Accept: "application/json;api_version=2" } }
        );
        const result = await response.json();
        const cruises = result.cruises;
        setCruiseItems(cruises);

        // Set the total number of cruises
        setTotalCruises(result.total_count); // Assuming the API returns a total_count field with the number of cruises

        cruises.forEach((cruise) => {
          // Fetch ship details
          if (cruise.ship) {
            fetchShipDetails(cruise.ship);
          }
        });
      } catch (error) {
        console.error("Error fetching cruise types:", error);
      }
    };

    fetchCruiseTypes();
  }, []);

  // Fetch ship details
  const fetchShipDetails = async (shipUrl) => {
    try {
      const response = await fetch(
        `${shipUrl}?app_id=${APP_ID}&token=${TOKEN}`,
        {
          headers: {
            Accept: "application/json;api_version=2",
          },
        }
      );
      const shipDetail = await response.json();
      const coverImage = shipDetail.cover_image_href;
      const profileImage = shipDetail.profile_image_href;

      setShipDetails((prevState) => ({
        ...prevState,
        [shipUrl]: shipDetail,
      }));
    } catch (error) {
      console.error("Error fetching ship details:", error);
    }
  };

  // Prepare rows with dynamic data
  const rows = cruiseItems.map((cruise, index) => ({
    id: index + 1,
    Cruises: cruise.cruise_name,
    cover_image_href: shipDetails[cruise.ship]?.cover_image_href || Image, // Dynamic or fallback image
    profile_image_href: shipDetails[cruise.ship]?.profile_image_href || Logo, // Dynamic or fallback logo
    start_date: cruise.start_date,
    cruise_only_price: cruise.cruise_only_price,
    cruise_ref: cruise.cruise_ref,
  }));

  return (
    <>
      <Grid container>
        <Grid item xl={12} sm={12}>
          <Typography variant="h4" className="av_cruises">
            Your Available Cruises
          </Typography>
          {/* Display total cruises */}
          <Typography variant="h6">Total Cruises: {totalCruises}</Typography>
        </Grid>
        <Grid item sm={12} xl={12}>
          <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={paginationModel.pageSize} // Set the page size dynamically
              page={paginationModel.page} // Set the initial page (starts from 1, i.e., 0 in DataGrid)
              rowsPerPageOptions={[30, 50]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ShipTable;
