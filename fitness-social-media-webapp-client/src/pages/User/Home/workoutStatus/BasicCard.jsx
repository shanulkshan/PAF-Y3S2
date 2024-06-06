import React, { useState } from "react";

export default function BasicCard({ name,key,completed,burnedCalories }) {
//  const [completed, setCompleted] = useState(0);
//  const [burnedCalories, setBurnedCalories] = useState(0);

  return (


<div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96" style={{fontFamily:'sans-serif'}}>
  <div class="p-6">
    <h5 class="block mb-2  text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      {name}
    </h5>
    <div class="block  text-base antialiased font-light leading-relaxed text-inherit">
      Sets: {completed}
    </div>
    <div class="block  text-base antialiased font-light leading-relaxed text-inherit">
    Burned Calories: {burnedCalories}
    </div>
  </div>
</div>
    
  );
}