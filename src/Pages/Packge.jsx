import React, { useState } from 'react';
import { Grid, Button, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ExistingCruises from './ExistingCruises';
import NewPackage from './NewPackage';

function ParentComponent() {
  const [open, setOpen] = useState(false); 
  const [existingCruiseDialogOpen, setExistingCruiseDialogOpen] = useState(false); 
  const [newPackageDialogOpen, setNewPackageDialogOpen] = useState(false); 

  const handleClick = () => {
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false); 
    setExistingCruiseDialogOpen(false); 
    setNewPackageDialogOpen(false);
  };

  const handleExistingCruiseDialogOpen = () => {
    setExistingCruiseDialogOpen(true); 
  };

  const handleNewPackageDialogOpen = () => {
    setNewPackageDialogOpen(true); 
  };

  return (
    <>
      {/* Main Button to open dialog */}
      <Typography variant="h4">
        <Button size="large" variant="contained" color="success" className="packge_button" onClick={handleClick}>
          <AddBoxIcon /> Create New Package
        </Button>
      </Typography>

      {/* Main Dialog */}
      <Dialog open={open} onClose={handleClose} className="package_popup">
        <DialogTitle>Package Cruise</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Create an entirely new cruise package or create a new package based on an existing cruise.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleExistingCruiseDialogOpen} variant="contained" className="btn_bg">
                <CheckIcon /> Existing Cruise
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleNewPackageDialogOpen} variant="contained" color="success" className="btn_new_bg">
                <CheckIcon /> New Package
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Sub Dialog for "Existing Cruise" */}
      <ExistingCruises open={existingCruiseDialogOpen} handleClose={handleClose} />

      {/* Sub Dialog for "New Package" */}
      <NewPackage open={newPackageDialogOpen} handleClose={handleClose} />
    </>
  );
}

export default ParentComponent;
