import React, { useState } from 'react';
import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Select from "react-select";
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#65C466',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

const Pricing = () => {
  const [showFareSetContent, setShowFareSetContent] = useState(false);
  const [rows, setRows] = useState([
    {
      availability: 'Available',
      gradeCode: '',
      gradeName: '',
      price: '',
      price2ndPax: '',
      price3rd4thPax: '',
      priceSingle: '',
      flightPrice: '',
      flightsPrice3rd4thPax: '',
    },
  ]);

  const handleToggleFareSet = () => {
    setShowFareSetContent((prevState) => !prevState);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        availability: 'Available',
        gradeCode: '',
        gradeName: '',
        price: '',
        price2ndPax: '',
        price3rd4thPax: '',
        priceSingle: '',
        flightPrice: '',
        flightsPrice3rd4thPax: '',
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  return (
    <>
      {/* Form Content */}
      <Grid container spacing={2} className='price_tab'>
        <Grid item={12} className='price_form'>
          <Typography variant='body2'>
            You can either create your own fixed price options for this cruise package including detailed faresets or if you would like pricing to track the cruise you have based this package on you choose to increase the base parent fares using the the Price Adjustments tab.
          </Typography>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <FormGroup>
              <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                label="Create Custom Static Prices" />
            </FormGroup>
            <Typography variant='body2'>
              When you choose this option you can adjust all individual pricing for cabins and top levels prices. These prices are static and will not change.
            </Typography>
          </Box>
        </Grid>
        <Grid item={6}>
          <Box sx={{ width: 580, maxWidth: '100%' }}>
            <FormGroup>
              <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                label="Track Parent Cruise Prices" />
            </FormGroup>
            <Typography variant='body2'>
              When you choose this option pricing will be updated to match the parent cruise, effectively tracking it to ensure any prices adjustments by the operator are reflected in your package.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <form>
        <Grid container spacing={2} className='price_add_form'>
          <Grid item={6}>
            <Box sx={{ width: 580, maxWidth: '100%' }}>
              <TextField fullWidth label="£" id="fullWidth1" />
            </Box>
          </Grid>
          <Grid item={6}>
            <Box sx={{ width: 580, maxWidth: '100%' }}>
              <TextField fullWidth label="£" id="fullWidth2" />
            </Box>
          </Grid>
          <Grid item={6}>
            <Box sx={{ width: 580, maxWidth: '100%' }}>
              <TextField fullWidth label="£" id="fullWidth3" />
            </Box>
          </Grid>
          <Grid item={6}>
            <Box sx={{ width: 580, maxWidth: '100%' }}>
              <TextField fullWidth label="£" id="fullWidth4" />
            </Box>
          </Grid>
          <Grid item={6}>
            <Box sx={{ width: 580, maxWidth: '100%' }}>
              <TextField fullWidth label="£" id="fullWidth5" />
            </Box>
          </Grid>
          <Grid item={6}>
            <Box sx={{ width: 580, maxWidth: '100%' }}>
              <TextField fullWidth label="£" id="fullWidth6" />
            </Box>
          </Grid>
          <Grid item={12} className='new_fare_btn'>
            <Button
              variant="contained"
              size='large'
              className='new_fare_set'
              onClick={handleToggleFareSet}
            >
              <AddIcon /> New Fare Set
            </Button>
          </Grid>
        </Grid>
      </form>

      <form>
        <Grid container spacing={2} className='new_fare_y'>
          {showFareSetContent && (
            <Grid item={12}>
              {/* Header Row - Inputs for Fare Set Name, Airport Code, Deal Code */}
              <Grid container spacing={2}>
                <Grid item={4}>
                  <Box sx={{ width: 350, maxWidth: '100%'  }}>
                    <TextField
                      label="Fare Set Name"
                      fullWidth
                      placeholder="Fare Set Name"
                    />
                  </Box>
                </Grid>
                <Grid item={4}>
                  <Box sx={{ width: 350, maxWidth: '100%'  }}>
                    <TextField
                      label="Airport Code"
                      fullWidth
                      placeholder="Airport Code"
                    />
                  </Box>
                </Grid>
                <Grid item={4}>
                  <Box sx={{ width: 350, maxWidth: '100%'  }}>
                    <TextField
                      label="Deal Code"
                      fullWidth
                      placeholder="Deal Code"
                    />
                  </Box>
                </Grid>
                <Grid item={1}>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ marginTop: '16px' }}
                    onClick={() => {}}
                  >
                    <DeleteIcon />
                  </Button>
                </Grid>
              </Grid>
              {rows.map((row, index) => (
                <Grid container spacing={2} sx={{ marginTop: '16px' }} key={index}>
                  <Grid item={1}>
                  <Box sx={{ width: 200, maxWidth: '100%'  }}>
                  <Select className='select_option'options='' isMulti onChange=''placeholder="Availability" /></Box>
                  </Grid>
                  <Grid item={1}>
                  <Box sx={{ width: 200, maxWidth: '100%'  }}>
                    <TextField name="gradeCode" value={row.gradeCode} onChange={(e) => handleChange(e, index)}  label="£ Grade Code" />
                  </Box>
                  </Grid>
                  <Grid item={1}>
                  <Box sx={{ width: 200, maxWidth: '100%'  }}>
                    <TextField name="gradeName" value={row.gradeName} onChange={(e) => handleChange(e, index)}  label='£ gradeName'/>
                    </Box>
                  </Grid>
                  <Grid item={1}>
                  <Box sx={{ width: 200, maxWidth: '100%'  }}>
                    <TextField name="price"value={row.price} onChange={(e) => handleChange(e, index)} label='£ price'/>
                    </Box>
                  </Grid>
                  <Grid item={1}>
                  <Box sx={{ width: 200, maxWidth: '100%'  }}>
                    <TextField name="price2ndPax" value={row.price2ndPax} onChange={(e) => handleChange(e, index)} label='£ price2ndPax'/>
                    </Box>
                  </Grid>
                  <Grid item={1}>
                  <Box sx={{ width: 200, maxWidth: '100%'  }}>
                    <TextField name="price3rd4thPax" value={row.price3rd4thPax} onChange={(e) => handleChange(e, index)} label='£ price3rd4thPax'/>
                    </Box>
                  </Grid>
                  <Grid item={1}>
                  <Box sx={{ width: 200, maxWidth: '100%'  }}>
                    <TextField name="priceSingle"value={row.priceSingle} onChange={(e) => handleChange(e, index)} label="£ priceSingle" />
                    </Box>
                  </Grid>
                  <Grid item={1}>
                  <Box sx={{ width: 200, maxWidth: '100%'  }}>
                    <TextField name="flightPrice" value={row.flightPrice} onChange={(e) => handleChange(e, index)} label='£ flightPrice'/>
                    </Box>
                  </Grid>
                  <Grid item={1}>
                  <Box sx={{ width: 200, maxWidth: '100%'  }}>
                    <TextField name="flightsPrice3rd4thPax" value={row.flightsPrice3rd4thPax} onChange={(e) => handleChange(e, index)} label='£ flightsPrice3rd4thPax'/>
                    </Box>
                  </Grid>
                  <Grid item={1}>
                  <Box sx={{ width: 200, maxWidth: '100%'  }}>
                    <Button variant="outlined" color="error"onClick={() => handleDeleteRow(index)}>
                      <DeleteIcon />
                    </Button>
                    </Box>
                  </Grid>
                </Grid>
              ))}
              <Grid container spacing={2} sx={{ marginTop: '16px' }}>
                <Grid item={12} sx={{ textAlign: 'right' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleAddRow}
                  >
                    <AddIcon /> Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </form>
    </>
  );
};

export default Pricing;
