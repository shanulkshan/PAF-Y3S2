import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from './pages/Admin/components/AdminLayout/AdminLayout';
import PublicLayout from './components/PublicLayout/PublicLayout';
import HomePage from './pages/User/Home/HomePage';
import AdminDashboard from './pages/Admin/pages/AdminDashboard/AdminDashboard';
import ErrorPage from './components/404/ErrorPage';
import PrimaryLayout from './components/PrimaryLayout/PrimaryLayout';
 import BasicCard from './pages/User/Home/workoutStatus/BasicCard'
import SharedWorkoutStatus from './pages/User/Home/workoutStatus/SharedWorkoutStatus'
import MyStatus from './pages/User/Home/workoutStatus/MyStatus';
import Updatestatus from './pages/User/Home/workoutStatus/Updatestatus';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <div className="">
        <Routes>
          {/* Public routes */}
          <Route
            path="/*"
            element={
              <PrimaryLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/CreateStatus" element={<SharedWorkoutStatus />} />
                  <Route path="*" element={<ErrorPage />} /> 
                  <Route path="/BasicCard" element={<BasicCard />} />
                  <Route path="/MyStatus" element={<MyStatus />} />
                  <Route path="/Updatestatus/:id" element={<Updatestatus />} />
                  {/* Auth routes */}

                </Routes>
              </PrimaryLayout>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="dashboard" />} />
                  <Route path="/dashboard" element={<AdminDashboard />} />
                   {/* <Route path="game-center" element={<GameCenter />} />
                  <Route path="gaming-room-bookings" element={<GamingRoomBookings />} /> */}
                  <Route path="*" element={<ErrorPage />} /> 
                </Routes>
              </AdminLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  </>
  )
}

export default App
