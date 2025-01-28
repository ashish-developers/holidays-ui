
import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Tabs, Tab, Typography, Box } from '@mui/material';
import General from '../components/General';
import Pricing from '../components/Pricing';
import PriceAdjustment from './PriceAdjustment';
import Itinerary from '../components/Itinerary';
import Option from '../components/Option';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CloseIcon from '@mui/icons-material/Close';
import { Category } from '@mui/icons-material';



const apiHost = (window.location.hostname.indexOf('localhost') == -1) ? '16.170.107.234' : 'localhost';
const NewPackage = ({ open, handleClose }) => {

  const closeButtonRef = useRef();    
  const [cat, setCat] = useState([]);
  const [pricesAdjustment, setPricesAdjustment] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [formData, setFormData] = useState({
// General
      ship_profile_image: null,
      sales_banner: null,
      ship_cover_image: "",
      mobile_cruise_banner: "",
      name: "",
      reference: "",
      operator: [],
      ship: [],
      region:[],
      type: [],
      starts_on:null,
      ends_on:null,
      vacation_days: "",
      summery: "",
      sales_message: "",
      text_banner: "",
      overview: "",
      included: "",
      extras: "",
      categories: [],


      cruise_only_price: "",
      adjustment_end_date: "",
      adjustment_start_date: "",
      adjustment_type: "",
      itinerary_description: "",
      itinerary_end_date: "",
      itinerary_end_time: "",
      itinerary_name: "",
      itinerary_start_date: "",
      itinerary_start_time: "",
      itinerary_type: ""

  });

  const [tabIndex, setTabIndex] = useState(0);
  const formRef = useRef(null);
  // Handle tab change
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${apiHost}:9001/api/master/data`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        
        const transformedData = result.pricesAdjustment.map(({ _id, name }) => ({
          value: _id,
          label: name,
        }));
        const transformedCatData = result.category.map(({ _id, name }) => ({
          value: _id,
          label: name,
        }));
        const transformeditIneraryData = result.itinerary.map(({ _id, name }) => ({
          value: _id,
          label: name,
        }));

        setPricesAdjustment(transformedData);
        setCat(transformedCatData);
        setItinerary(transformeditIneraryData);
      } catch (err) {
        console.log('error', err)
      } finally {
        
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const showAlert = () => {
    Swal.fire('Success!', 'Cruise has been successfully submitted.', 'success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const fmData = new FormData(formRef.current);
    console.log(fmData, formData); // Handle form data
    console.log(formData)
    try {
      const response = await fetch(`http://${apiHost}:9001/api/cruise/mycreate`, { method: "POST", body : JSON.stringify(formData)} );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      formRef.current.reset(); // Reset the form
      
      closeButtonRef.current.click();
      showAlert();
    } catch (err) {
      console.log(err)
      //setError(err.message);
    } finally {
      //setLoading(false);
    }
  }
  const handleChange = (key, value) => {
    console.log(key, value)
    setFormData({
      ...formData,
      [key]: value, // Dynamically set the key based on the passed parameter
    });
  };
  return (
    
    <form ref={formRef} onSubmit={handleSubmit} >
      {formData.name}
      <Dialog open={open} onClose={handleClose} className="sub_dialog" fullWidth>
      <DialogTitle>Package Cruise
        <Button onClick={handleClose} ref={closeButtonRef}  color="primary" className='close_btn'><CloseIcon /></Button>
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
          {tabIndex === 0 &&  <General 
                                onChange={handleChange}
                                name="general"
                                value={formData}
                                categories = {cat}
                              />}
          {/* Content for Tab 2 */}
          {tabIndex === 1 && <Pricing 
                                
                                name="pricing"
                                value={formData}
                                
                              />}
          {/* Content for Tab 3 */}
          {tabIndex === 2 && <PriceAdjustment 
                                
                                name="priceAdjustment"
                                value={formData}
                                pricesAdjustment={pricesAdjustment}
                                
                              />}

          {/* Content for Tab 4 */}
          {tabIndex === 3 && <Itinerary 
                              name="itinerary"
                              itinerary={itinerary}
                              value={formData}
                              
                            />}

          {/* Content for Tab 5 */}
          {tabIndex === 4 && <Option 
                              name="option"
                              value={formData}
                              
                            />}
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="success"><SaveAsIcon />Save</Button>
          {/* <button type='submit' onClick={handleSubmit}>Save</button> */}
          <Button variant="contained" color="success"><SaveAsIcon />Save Close</Button>
        </DialogActions>
      </Dialog>
    </form>
    
  );
};

export default NewPackage;
