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
      await functions.getUser(userx)
      
    }catch(error){
      console.error(error);
    }
  }

  return (
    <div className="get-user-container">
      <h2 className="get-user-title">User ID:</h2>
      <form className='get-user-form' onSubmit={getUserxBackend}>
        <input className='get-user-input' type="text" value={userx} onChange={(e)=>setUserX(e.target.value)} />
        <button type='submit' >Confirm</button>
          <div>
            Username: {userx.username} Fullname: {userx.fullname} Email: {userx.email} Bio: {userx.bio} 
          </div>   
        </form>
    </div>
  );
};

export { GetUser };