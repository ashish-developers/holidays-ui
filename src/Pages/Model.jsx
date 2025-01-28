import React, { useState, useEffect, useRef } from 'react'
import { format } from "date-fns";
import 'react-datepicker/dist/react-datepicker.css';

const Model = (cruiseData) => {

  const formRef = useRef(null);
  const closeButtonRef = useRef();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCatOpt, setSelectedCatOpt] = useState('');
  const [selectedItinOpt, setSelectedItinOpt] = useState('');
  const [selectedPricesAdjOpt, setSelectedPricesAdjOpt] = useState('');

  const [cat, setCat] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [pricesAdjustment, setPricesAdjustment] = useState([]);

  //  FORM STATE 
  const initialFormData = {
    ship_profile_image: "",
    sales_banner: "",
    ship_cover_image: "",
    mobile_cruise_banner: "",
    name: cruiseData.data.name,
    starts_on: format(new Date(cruiseData.data.starts_on), "MM/dd/yyyy"),
    vacation_days: cruiseData.data.vacation_days,
    summery: cruiseData.data.summery,
    sales_message: cruiseData.data.sales_message,
    text_banner: cruiseData.data.text_banner,
    overview: cruiseData.data.overview,
    included: cruiseData.data.included,
    extras: cruiseData.data.extras,
    categories: cruiseData.data.categories,
    cruise_only_price: cruiseData.data.cruise_only_price,
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
  }
  const [formData, setFormData] = useState(initialFormData);
  const [itineraryTable, setItineraryTable] = useState([]);
  const [isItineraryVisible, setIsItineraryVisible] = useState(true);
  const toggleVisibility = () => {
    setIsItineraryVisible(!isItineraryVisible);
  };

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9001/api/master/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        setItinerary(result.itinerary);
        setPricesAdjustment(result.pricesAdjustment);
        setCat(result.category);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setSelectedCatOpt(event.target.value);
    console.log('Selected option:', event.target.value);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const itineraryTableSave = () => {
    console.log(formData.itinerary_type)
    let itineraryName = itinerary.find(el => el.name == formData.itinerary_type || el._id == formData.itinerary_type)
    let newItem = {
      id: itineraryTable.length + 1,
      name: formData.itinerary_name,
      start_date: formData.itinerary_start_date,
      end_date: formData.itinerary_end_date,
      start_time: formData.itinerary_start_time,
      end_time: formData.itinerary_end_time,
      itinerary_type: itineraryName.name
    }
    setItineraryTable((prevItems) => [...prevItems, newItem])
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const fmData = new FormData(formRef.current);
    fmData.append('itinerary', JSON.stringify(itineraryTable));
    fmData.append('vendor_id', cruiseData.data.vendor_id);
    fmData.append('operator', cruiseData.data.operator);
    fmData.append('operator_title', cruiseData.data.operator_title);
    fmData.append('ship_title', cruiseData.data.ship_title);
    fmData.append('regions', cruiseData.data.regions);
    fmData.append('type', cruiseData.data.type);

    try {
      const response = await fetch('http://52.87.39.93/api/cruise/create', { method: "POST", body: fmData });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      formRef.current.reset(); // Reset the form
      closeButtonRef.current.click();
      // setItinerary(result.itinerary);
      // setPricesAdjustment(result.pricesAdjustment);
      // setCat(result.category);
    } catch (err) {
      console.log(err)
      setError(err.message);
    } finally {
      //setLoading(false);
    }
  };

  return (

    <>
      <title>Bootstrap Example</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <style dangerouslySetInnerHTML={{ __html: "\n\n.tabs_area{background: #a8783d; color:#fff;} \n.tabs_area button { padding: 15px 25px; color: #fff; text-transform:uppercase; border-radius: 0px;}\n.tabs_area button:hover { background: #fff; color: #000; border-radius: 0px; }\n.tabs_area .active { border-radius: 0px; }\n.form_group {margin-bottom:10px;}\n.form_group span{display:block; font-weight: bold; font-size: 13px; margin-bottom:5px;}\n.box_aa{background:#f0f0f0; border-radius:0px;}\n.modal-footer{justify-content: space-between;}\n.itinerary thead tr td { background: #000000; color: #fff; }\n\n.add_itinerary{margin:30px 0px; display:block;}\n\n" }} />
      {/* The Modal */}
      <div className="modal" id="edit_cruise" data-bs-backdrop="static">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Cruise</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <div className="nav nav-tabs mb-3 tabs_area" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-general-tab" data-bs-toggle="tab" data-bs-target="#nav-general" type="button" role="tab" aria-controls="nav-general" aria-selected="true">General</button>
                <button className="nav-link" id="nav-pricing-tab" data-bs-toggle="tab" data-bs-target="#nav-pricing" type="button" role="tab" aria-controls="nav-pricing" aria-selected="false">Pricing</button>
                <button className="nav-link" id="nav-itinerary-tab" data-bs-toggle="tab" data-bs-target="#nav-itinerary" type="button" role="tab" aria-controls="nav-itinerary" aria-selected="false">Itinerary</button>
              </div>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="tab-content p-3 " id="nav-tabContent">
                  <div className="tab-pane fade active show" id="nav-general" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form_group">
                          <span>Cruise Image</span>
                          <input type="file" value={formData.ship_profile_image} onChange={handleFormChange} name="ship_profile_image" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form_group">
                          <span>Sales Banner</span>
                          <input type="file" value={formData.sales_banner} onChange={handleFormChange} name="sales_banner" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <span>Cruise Banner</span>
                          <input type="file" value={formData.ship_cover_image} onChange={handleFormChange} name="ship_cover_image" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <span>Mobile Cruise Banner</span>
                          <input type="file" value={formData.mobile_cruise_banner} onChange={handleFormChange} name="mobile_cruise_banner" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-12 text-center mt-3 mb-3"><h4>Cruise Properties</h4></div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <span>Name</span>
                          {/* {JSON.stringify(cruiseData.data, null, 2)} */}
                          <input type="text" value={formData.name} onChange={handleFormChange} name="name" className="form-control box_aa" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <span>Start Date</span>
                          <input type="date" name="starts_on" value={formData.starts_on} onChange={handleFormChange} className="form-control box_aa" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <span>Duration</span>
                          <input type="text" name="vacation_days" value={formData.vacation_days} onChange={handleFormChange} className="form-control box_aa" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <span>Summary</span>
                          <input type="text" name="summery" value={formData.summery} onChange={handleFormChange} className="form-control box_aa" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <span>Sales Message</span>
                          <input type="text" value={formData.sales_message} onChange={handleFormChange} name="sales_message" className="form-control box_aa" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <span>Text Banner</span>
                          <input type="text" value={formData.text_banner} onChange={handleFormChange} name="text_banner" className="form-control box_aa" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <span>Overview</span>
                          <textarea type="text" rows={5} value={formData.overview} onChange={handleFormChange} name="overview" className="form-control box_aa" defaultValue={""} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <span>Whats Included</span>
                          <textarea type="text" rows={5} value={formData.included} onChange={handleFormChange} name="included" className="form-control box_aa" defaultValue={""} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <span>Extras</span>
                          <textarea type="text" rows={5} value={formData.extras} onChange={handleFormChange} name="extras" className="form-control box_aa" defaultValue={""} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <span>Categories</span>
                          <select value={formData.categories} onChange={handleFormChange} name="categories" className="form-control box_aa">
                            <option>Select</option>
                            {cat.map((option) => (
                              <option value={option._id}>{option.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="nav-pricing" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div className="row">
                      <div className="col-lg-12 text-center mb-3"><h4>Pricing</h4></div>
                      <div className="col-lg-4">
                        <div className="form_group">
                          <span>Adjustment Type</span>
                          <select name="adjustment_type" value={formData.adjustment_type} onChange={handleFormChange} className="form-control box_aa">
                            <option> - Select price adjustment type -</option>
                            {pricesAdjustment.map((option) => (
                              <option value={option._id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form_group">
                          <span>Amount</span>
                          <input type="text" value={formData.cruise_only_price} onChange={handleFormChange} name="cruise_only_price" className="form-control box_aa" />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form_group">
                          <span><input type="checkbox" name="price_adj" className /> Apply Other Price Adjustments</span>
                          <small>If ticked this price adjustment will be applied with any other global price adjustment. This price adjustment is first applied followed by any other global adjustments.</small>
                        </div>
                      </div>
                      <div className="col-lg-12 text-center mb-3">Restrict price application between certain dates</div>
                      <div className="col-lg-4">
                        <div className="form_group">
                          <span>Start Date</span>
                          <input type="date" value={formData.adjustment_start_date} onChange={handleFormChange} name="adjustment_start_date" className="form-control box_aa" />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form_group">
                          <span>End Date</span>
                          <input type="date" value={formData.adjustment_end_date} onChange={handleFormChange} name="adjustment_end_date" className="form-control box_aa" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="nav-itinerary" role="tabpanel" aria-labelledby="nav-itinerary-tab">
                    <div className="col-lg-12 text-center mb-3"><h4>Itinerary</h4></div>
                    <div className="col-lg-12 text-end mb-3"><a onClick={toggleVisibility} className="btn btn-success" id="add_inv">{isItineraryVisible ? "Add Itinerary" : "Cancel"} </a></div>
                    {isItineraryVisible && (
                      <div className="add_itinerary">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form_group">
                              <span>Name</span>
                              <input type="text" onChange={handleFormChange} value={formData.itinerary_name} name="itinerary_name" className="form-control box_aa" />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="row">
                              <div className="col-lg-3">
                                <div className="form_group">
                                  <span>Start Date</span>
                                  <input type="date" onChange={handleFormChange} value={formData.itinerary_start_date} name="itinerary_start_date" className="form-control box_aa" />
                                </div>
                              </div>
                              <div className="col-lg-3">
                                <div className="form_group">
                                  <span>Start Time</span>
                                  <input type="time" onChange={handleFormChange} value={formData.itinerary_start_time} name="itinerary_start_time" className="form-control box_aa" />
                                </div>
                              </div>
                              <div className="col-lg-3">
                                <div className="form_group">
                                  <span>End Date</span>
                                  <input type="date" onChange={handleFormChange} value={formData.itinerary_end_date} name="itinerary_end_date" className="form-control box_aa" />
                                </div>
                              </div>
                              <div className="col-lg-3">
                                <div className="form_group">
                                  <span>End Time</span>
                                  <input type="time" onChange={handleFormChange} value={formData.itinerary_end_time} name="itinerary_end_time" className="form-control box_aa" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form_group">
                              <span>Description</span>
                              <textarea type="text" onChange={handleFormChange} value={formData.itinerary_description} name="itinerary_description" className="form-control box_aa" defaultValue={""} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form_group">
                              <span>Itinerary Type</span>
                              <select type="text" value={formData.adjustment_type} onChange={handleFormChange} name="itinerary_type" className="form-control box_aa">
                                <option> Select Itinerary Type </option>
                                {itinerary.map((option) => (
                                  <option value={option._id}>
                                    {option.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-12 text-end">
                            <div className="form_group">
                              <a onClick={itineraryTableSave} className="btn btn-success">Add</a>
                              <a href="#" id="inv_cancel" className="btn btn-outline-secondary">Cancel</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <table className="table table-bordered itinerary">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Date</td>
                          <td>Type</td>
                          <td>Action</td>
                        </tr>
                      </thead>
                      <tbody>
                        {itineraryTable.map((option) => (
                          <tr>
                            <td>{option.name}</td>
                            <td>{option.start_date} - {option.end_date}</td>
                            <td>{option.itinerary_type}</td>
                            <td />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className>
                    <button type="button" ref={closeButtonRef} className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  </div>
                  <div className>
                    <button type="submit" className="btn btn-success">Save</button>
                    <button type="button" className="btn btn-danger">Delete</button>
                    <button type="button" className="btn btn-primary">View</button>
                  </div>
                </div>
              </form>
            </div>
            {/* Modal footer */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Model