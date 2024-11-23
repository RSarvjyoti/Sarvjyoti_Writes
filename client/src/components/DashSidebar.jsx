import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import {HiArrowSmRight, HiUser} from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {

    const locaton = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
      const urlParms = new URLSearchParams(locaton.search);
      const tabFromUrl = urlParms.get('tab');
      if(tabFromUrl) {
        setTab(tabFromUrl);
      }
      
    },[locaton.search]);

  return <Sidebar className="w-full md:w-56">
    <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor="dark">
                Profile
            </Sidebar.Item>
            </Link>
            <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" >
                Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>;
};

export default DashSidebar;
