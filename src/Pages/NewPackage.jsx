
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Tabs, Tab, Typography, Box } from '@mui/material';
import General from '../components/General';
import Pricing from '../components/Pricing';
import PriceAdjustment from './PriceAdjustment';
import Itinerary from '../components/Itinerary';
import Option from '../components/Option';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CloseIcon from '@mui/icons-material/Close';
const NewPackage = ({ open, handleClose }) => {
    const [tabIndex, setTabIndex] = useState(0);

    // Handle tab change
    const handleTabChange = (event, newIndex) => {
      setTabIndex(newIndex);
    };
  return (
    <Dialog open={open} onClose={handleClose} className="sub_dialog" fullWidth>
    <DialogTitle>Package Cruise
      <Button onClick={handleClose} color="primary" className='close_btn'><CloseIcon /></Button>
    </DialogTitle>
    <hr />
    <DialogContent>
      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Package Cruise Tabs" variant="fullWidth">
        <Tab label="General " />
        <Tab label="Pricing " />
        <Tab label="Price Adjustments " />
        <Tab label="Itinerary " />
        <Tab label="Options " />
      </Tabs>

      {/* Content for Tab 1 */}
      {tabIndex === 0 && <General />}

      {/* Content for Tab 2 */}
      {tabIndex === 1 && <Pricing />}

      {/* Content for Tab 3 */}
      {tabIndex === 2 && <PriceAdjustment />}

      {/* Content for Tab 4 */}
      {tabIndex === 3 && <Itinerary />}

      {/* Content for Tab 5 */}
      {tabIndex === 4 && <Option />}
    </DialogContent>

    {/* Dialog Actions */}
    <DialogActions>
    <Button variant="contained" color="success"><SaveAsIcon />Save</Button>
    <Button variant="contained" color="success"><SaveAsIcon />Save Close</Button>
    </DialogActions>
  </Dialog>
  );
};

export default NewPackage;
