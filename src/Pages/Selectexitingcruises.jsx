import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const SelectExistingCruises = ({ openselect, handleSelectClose, selectedCruise }) => {
  return (
    <Dialog open={openselect} onClose={handleSelectClose}>
      <DialogTitle>Selected Cruise Details
      <DialogActions>
        <Button onClick={handleSelectClose} color="primary"><CloseIcon /></Button>
      </DialogActions>
      </DialogTitle>
      <DialogContent>
        {selectedCruise && (
          <div>
            <h4>{selectedCruise.name}</h4>
            <p><strong>Departs:</strong> {selectedCruise.departs}</p>
            <p><strong>Price:</strong> {selectedCruise.price}</p>
            <p><strong>Stay Duration:</strong> {selectedCruise.stay}</p>
          </div>
        )}
      </DialogContent>
    
    </Dialog>
  );
};

export default SelectExistingCruises;
