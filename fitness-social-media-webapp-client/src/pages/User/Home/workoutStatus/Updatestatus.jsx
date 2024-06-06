import React, { useEffect, useState } from "react";
import axios from "axios";


import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Await, useParams } from "react-router-dom";



function updatestatus() {

  const {id} = useParams();

  const handleAddCard = () => {
    const newPlan = {
      name: "",
      completed: "",
      burend_callary: ""

    };
    setWorkoutPlans([...workoutPlans, newPlan]);
  };


  const handleRemoveCard = (index) => {
    const updatedPlans = [...workoutPlans];
    updatedPlans.splice(index, 1);
    setWorkoutPlans(updatedPlans);
  };


  // make array and  make object as main data 
  const handleInputChange = (e, index, key) => {
    const updatedPlans = [...workoutPlans];
    if(key === "completed" || key === "burend_callary") {
      if (e.target.value < 0) {
        updatedPlans[index][key] = 0
      }
      else{
        updatedPlans[index][key] = e.target.value;
      }
      
    }

    // Convert updatedPlans to a new formData object
    const newFormData = {
      ...formData,
      state: updatedPlans
    };

    setFormData(newFormData);
  };

  // set data 
  const [workoutPlans, setWorkoutPlans] = useState([]);



  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };




  const [formData, setFormData] = useState()

  // sete date separatly
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData, [name]: value,

    })

  }

  useEffect(() => {
    const fechwokoutstatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/Workout/${id}`);
        const data = await response.json();
        setFormData(data);
        setWorkoutPlans(data.state)
      } catch (error) {
        console.error("Error fetching workout status", error.message)
      }
    }
    fechwokoutstatus();
  }, [])


  // submit haddl 
  const haddleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await fetch(`http://localhost:8080/Workout/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json" // Specify the content type as JSON
        },
        body: JSON.stringify(formData) // Convert formData to JSON string and send in the body
      });

      if (response.ok) {
        // Handle successful response
        console.log("Workout data updated successfully!");
        alert("Workout data updated successfully!");
        window.location.replace("/");
      } else {
        // Handle unsuccessful response
        console.error("Failed to submit workout data.");
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error occurred while submitting workout data:", error);
    }
  }



  return (
    <div style={{
      position: 'absolute',
      margin: -10,
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '',
      minHeight: '110vh',
      minWidth: '210vh',
      backgroundColor: '#eef2f3',
      backgroundImage: `url("https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg")`,
      backgroundAttachment: 'fixed', // Fix the background image
      backgroundSize: 'cover', // Resize the background image to cover the entire container
    }}>

      <div style={{ position: 'relative', marginLeft: '-400px', marginTop: '100px', }}>
        <form action="" method="post" onSubmit={haddleSubmit}>
          <h3 style={{ display: 'flex', justifyContent: 'center', fontFamily: 'monospace', fontSize: '20px', color: 'black' }}>Update workout Status</h3>

          <Box
            sx={{
              display: 'flow',
              flexWrap: 'wrap',
              '& > :not(style)': {
                mt: 3, mb: 3, width: 510, height: 270, color: '#B2BABF',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: 10,
              },
            }}>

            <Box component="form" sx={{ '& > :not(style)': { ml: 4, mt: 3, width: '50ch', border: "ButtonText" }, }} noValidate autoComplete="off" >

             
              <TextField
                id="standard-basic"
                label="Workout Status"
                value={formData?.workoutState}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                name="workoutState"
              />
              <br />
              <TextField
                id="standard-basic"
                label="description"
                value={formData?.description}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                name="description"
              />
              <br />
              <input type="date"
                 value={formData?.date?.split('T')[0]}
                 onChange={handleChange}
                //  renderInput={(params) => <TextField {...params} />}
              />
              <br />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flow',
              flexWrap: 'wrap',
              '& > :not(style)': {
                mt: 3,
                width: 510,
                height: 350,
                borderRadius: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
              },
            }}>

            {workoutPlans?.map((plan, index) => (
              <Paper key={index} elevation={3}>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { ml: 4, mt: 3, width: '50ch', border: "ButtonText" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="Name"
                    value={plan.name}
                    onChange={(e) => handleInputChange(e, index, "name")}
                  />
                  <br />
                  <TextField
                    type="number"
                    label="Completed sets"
                    value={plan.completed}
                    onChange={(e) => handleInputChange(e, index, "completed")}
                  />
                  <br />
                  <TextField
                    type="number"
                    label="Burned Calories"
                    value={plan.burend_callary}
                    onChange={(e) => handleInputChange(e, index, "burend_callary")}
                  />
                </Box>
                <br />
                <br />
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleRemoveCard(index)} sx={{ marginLeft: 4 }}
                >
                  Remove
                </Button>
              </Paper>
            ))}
          </Box>
          <br />
          <Button color="primary" variant="contained" onClick={handleAddCard} sx={{ marginLeft: 3, mb: 5 }}>New Workout</Button>
          <Button color="inherit" variant="contained"  type="submit" sx={{ marginLeft: 3, mb: 5 }}>Submit</Button>
        </form>

      </div>

    </div>
  );
}

export default updatestatus;
