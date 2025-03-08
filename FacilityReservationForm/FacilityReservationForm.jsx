/* eslint-disable no-unused-vars */
import  {  useContext, useEffect, useReducer, useRef, useState } from "react";
import "./FacilityReservationForm.css";
import axios from "axios";
import { initials, reducer ,actions} from "../../../functions/formrequest";
import { useCallback } from "react";
import cleanData from "../../../functions/cleandata";

const FacilityReservationForm = () => {
  const [state, dispatch] = useReducer(reducer,initials)
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [error , setError] = useState();
  const [result , setResult] = useState()
  const [reqstCODE , setCODE] = useState(); 
  const [formData , setFormData] = useState({
    "facilityID": "FCT-000",
    "reqstType":"Facility",
    "participants":0, 
    "activityType": "TYpe",
    "activity": "",
    "activityDateStart": "",
    "activityTimestart": "",
    "activityDateEnd": "",
    "activityTimeEnd": "", 
    "note": "",
    "notification": "Your Facility Request is Submitted Wait for Faculty Approval!",
    "purpose":"",
    "materials": [ ]
}
); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const venue = useCallback(() => {
    if (!state) return; // Prevent running if state is undefined
    
    const token = localStorage.getItem('token'); 
    axios.get(`/api/venue`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
  
      const jsonData = cleanData(res);
      setCODE(jsonData.reqstCODE);
      if (!jsonData.facility || !Array.isArray(jsonData.facility)) {
        return;
      }
       
      dispatch({ type: actions.fetch_venue, payload: jsonData.facility });
  
      // console.log("Dispatched Data:", jsonData.facility);
    })
    .catch((error) => {
      console.error(" Error:", error);
    });
  }, [dispatch]); 
  

  const hasFetched = useRef(false); 
  useEffect(() => {
    if (!hasFetched.current) { 
      venue(); 
      hasFetched.current = true; 
    }
  }, []);
  


  const handleSubmit = async (e) =>{
  const token = localStorage.getItem('token');
  const formatDateTime = (date, time) => (date && time ? `${date} ${time}:00` : ""); 

  const formattedData = {
    ...formData,
    activityDateStart: formatDateTime(formData.activityDateStart, formData.activityTimeStart),
    activityDateEnd: formatDateTime(formData.activityDateEnd, formData.activityTimeEnd),
  };
    console.log("dtas" , formattedData)
  axios.post('/api/facility-request', formattedData,{
    headers:{
        Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    const cleanData = response.data.replace(/<!--.*?-->/g, "").trim();
    const jsonData = JSON.parse(cleanData);
    setResult("Submitted"); 

  })
  .catch( error => {
    console.error('Error:',error)
    const cleanData = error.response.data.replace(/<!--.*?-->/g, "").trim();
    const jsonData = JSON.parse(cleanData);
    const validationErrors = Object.values(jsonData.errors).flat().join("\n");
    setResult(`Validation Error:\n${validationErrors}`);
  });
 
}

   return (
    <div className="form-container">
      <div className="form-box">
           <h6 className="form-coder">{reqstCODE}</h6>
        <h2 className="form-title">Facility Reservation Form</h2>
        <p className="form-subtitle">Kindly fill out all the required fields.</p>
        <p className="form-recommendation">
          Recommendation: Reserve facility 7 days before the event.
        </p>
        {result && (
  <div className={`alert ${result.includes("Submitted") ? "alert-success" : "alert-danger"}`}>
    {result}
  </div>
)}
        {/* Venue and Activity */}
        <div className="form-row">
          <div className="form-group">
            <label>Venue</label>
            <select required name="facilityID" onChange={handleChange} value={formData.facilityID}>
              <option>Select Venue</option>
              {state.items.length > 0 ? (
                 state.items.map((venue ,index)=>(
                  <option key={index} value = {venue.facilityID}>{venue.facilityName}</option>
                 ))
              ): (
                    <option>VENUE...</option>
              )}
         </select>
          </div>

          <div className="form-group">
            <label>Nature of Activity</label>
            <select value={formData.activityType} name="activityType" onChange={handleChange}>
              <option>Select Activity Type</option>
               <option  value="Curricular">Curricular</option>
               <option value="Co-Curricular">Co-Curricular</option>
               <option value="Extra-Curricular">Extra-Curricular</option>
            </select>
          </div>
        </div>

        {/* Date and Time */}
        <div className="form-row">
          <div className="form-group">
            <label>Date Start</label>
            <input type="date" value= {formData.activityDateStart} name="activityDateStart" required onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Time Start</label>
            <input type="time" value={formData.activityTimeStart} name ="activityTimeStart" required onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date Ended</label>
            <input type="date" value={formData.activityDateEnd} name="activityDateEnd" required onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Time End</label>
            <input type="time" value={formData.activityTimeEnd} name="activityTimeEnd" required onChange={handleChange}/>
          </div>
        </div>

        {/* Activity and Purpose */}
        <div className="form-group">
          <label>Activity</label>
          <input type="text" value={formData.activity} name="activity" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Purpose</label>
          <input type="text" value={formData.purpose} name="purpose" onChange={handleChange} required />
        </div>

        {/* Materials and Equipment */}
        {/* Materials and Equipment */}
<div className="form-group">
  <label>Materials and Equipment Needed</label>
  <div className="grid-container">
    {[
      "Projector",
      "Microphone",
      "Chairs",
      "Tables",
      "LED Monitor",
      "LCD Projector",
      "Electric Fans",
      "Whiteboards",
      "Water Dispenser",
    ].map((item, index) => (
      <div key={index} className="grid-item">
        <label>{item}</label>
        <input
          type="number"
          min="0"
          value={
            formData.materials.find((mat) => mat.materialName === item)?.quantity || 0
          }
          onChange={(e) => {
            const quantity = Number(e.target.value);
            setFormData((prevData) => {
              const updatedMaterials = prevData.materials.filter((mat) => mat.materialName !== item);

              if (quantity > 0) {
                updatedMaterials.push({ materialName: item, quantity });
              }

              return { ...prevData, materials: updatedMaterials };
            });
          }}
        />
      </div>
    ))}

    {/* Others Checkbox and Input */}
   {/* Others Checkbox and Input */}
<div className="grid-item">
  <div className="others-container">
    <input
      type="checkbox"
      onChange={() => setShowOtherInput(!showOtherInput)}
    />
    <label>Others</label>
  </div>
  </div>
 </div>

  {showOtherInput && (
  <div className="others-input">
  <input
    type="text"
    placeholder="Specify material..."
    value={formData.otherMaterial || ""}
    onChange={(e) => {
      const materialName = e.target.value;
      setFormData((prevData) => {
        const updatedMaterials = prevData.materials.filter((mat) => mat.materialName !== prevData.otherMaterial);

        if (materialName.trim()) {
          updatedMaterials.push({ materialName, quantity: prevData.otherQuantity || 1 });
        }

        return { ...prevData, materials: updatedMaterials, otherMaterial: materialName };
      });
    }}
  />
  <input
    type="number"
    min="1"
    placeholder="Quantity"
    value={formData.otherQuantity || ""}
    onChange={(e) => {
      const quantity = Number(e.target.value);
      setFormData((prevData) => {
        const updatedMaterials = prevData.materials.map((mat) =>
          mat.materialName === prevData.otherMaterial ? { ...mat, quantity } : mat
        );

        return { ...prevData, materials: updatedMaterials, otherQuantity: quantity };
      });
    }}
  />
</div>
  )}
</div>

        {/* Special Note */}
        <div className="form-group">
          <label>Special Note</label>
          <textarea value={formData.note} name="note" onChange={handleChange}></textarea>
        </div>

        {/* Submit Button */}
        <button className="submit-button" onClick={handleSubmit}> Submit Request</button>
      </div>
    </div>
  );
};

export default FacilityReservationForm;
