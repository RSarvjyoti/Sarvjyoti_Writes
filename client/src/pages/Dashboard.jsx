import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';


export function Dashboard() {
  const locaton = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParms = new URLSearchParams(locaton.search);
    const tabFromUrl = urlParms.get('tab');
    if(tabFromUrl) {
      setTab(tabFromUrl);
    }
    
  },[locaton.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row '>
      {/* sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* Profile */}
      <div className="">
        {tab === 'profile' && <DashProfile />}
      </div>
    </div>
  )
}