import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import {HiArrowSmRight, HiUser} from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import axios from "axios";

const DashSidebar = () => {

    const locaton = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
      const urlParms = new URLSearchParams(locaton.search);
      const tabFromUrl = urlParms.get('tab');
      if(tabFromUrl) {
        setTab(tabFromUrl);
      }
      
    },[locaton.search]);

    const handleSignout = async () => {
      try {
        const res = await axios.post('/api/user/signout');
        dispatch(signoutSuccess());
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };

  return <Sidebar className="w-full md:w-56">
    <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor="dark" as="div">
                Profile
            </Sidebar.Item>
            </Link>
            <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignout} >
                Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>;
};

export default DashSidebar;
