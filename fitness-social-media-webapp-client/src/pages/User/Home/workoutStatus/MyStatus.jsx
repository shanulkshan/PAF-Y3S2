import React, { useEffect, useState } from "react";
import BasicCard from "./BasicCard";

export default function MyStatus() {
  const handleDelete = async (id) => {
    try {
      // Perform the deletion operation on the backend
      await fetch(`http://localhost:8080/Workout/${id}`, {
        method: 'DELETE',
      });

      // Filter out the workout with the specified id
      const updatedWorkoutStatus = workoutstatus.filter(workout => workout.id !== id);
      // Update the state with the filtered workout status
      setWorkoutstatus(updatedWorkoutStatus);
      handleClose(); // Close the popover
    } catch (error) {
      console.error('Error deleting workout:', error);
      // Handle error if necessary
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 

  const handleEdit = (id) => {
    // Navigate to the updatestatus page and pass the ID as a URL parameter
   // history.push(`/updatestatus/${id}`);
   window.location.replace(`/Updatestatus/${id}`);
    handleClose(); // Close any modal or dropdown if needed
  };

  const [workoutstatus, setWorkoutstatus] = useState([]);

  useEffect(() => {
    const fechwokoutstatus = async () => {
      try {
        const response = await fetch("http://localhost:8080/Workout");
        const data = await response.json();
        setWorkoutstatus(data);
      } catch (error) {
        console.error("Error fetching workout status", error.message)
      }
    }
    fechwokoutstatus();
  }, [])

  return (
    <div className="items-center justify-center gap-20 bg-no-repeat bg-cover " style={{ backgroundImage: `url("https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b")`}} >

     <div >
     <div className="container mx-auto mt-20 font-mono">
  <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
    {workoutstatus?.map((workout, index) => (
      <div key={workout.id} className="w-full max-w-sm mx-auto mb-6 overflow-hidden rounded-lg shadow-lg g bg-gray-50" style={{fontFamily:'monospace'}}>
        <div className="flex justify-between px-4 py-2">
        
          <p>{new Date(workout.date).toLocaleDateString('en-US')}</p>
        </div>
        <img className="w-full" src={'https://cdn-icons-png.flaticon.com/512/4042/4042356.png'} alt="Workout Image" />
        <div className="px-4 py-2">
          <h2 className="mb-2 text-xl font-bold">{workout.workoutState}</h2>
          <p className="text-base text-gray-700">{workout.description}</p>
        </div>
        <div className="flex flex-wrap justify-between gap-10 mx-4 my-2">
          {workout.state.map((item, index) => (
            <BasicCard key={index} name={item.name} completed={item.completed} burnedCalories={item.burend_callary} />
          ))}
        </div>
        <div className="flex items-center justify-between px-4 py-2">
        <button
      class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-cyan-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button"
      onClick={() => handleEdit(workout.id)}>
      Edit
    </button>
          {/* <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(workout.id)}>Edit</button> */}
          <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-red-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button" onClick={() => handleDelete(workout.id)}>Delete</button>
        </div>
      </div>
    ))}
  </div>
</div>

     </div>
    </div>
  )
};
