import React, { useState, useEffect } from 'react';
import "./StylesComponents.css";
import { useCanister } from '@connect2ic/react';

const GetUser = () => {
  const [userx, setUserX] = useState('');
  const [users, setUser] = useState([]);
  const [functions] = useCanister('user_profiles_backend')

  const getUserxBackend = async (e) => {
    e.preventDefault();

    try{
      const getUserx = await functions.getUser(userx)
      console.log(getUserx)
    }catch(error){
      console.error(error);
    }
  }

  return (
    <div className="get-user-container">
      <h2 className="get-user-title">User ID:</h2>
      <label onSubmit={getUserxBackend}></label> 
        <input className='get-user-input' type="text" value={userx} onChange={(e)=>setUserX(e.target.value)} />
      <ul className="get-user-list">
          <li>
            ID: {userx.id} - Username: {userx.username} - Fullname: {userx.fullname} - Email: {userx.email} - Bio: {userx.bio}
          </li>
      </ul>
    </div>
  );
};

export { GetUser };