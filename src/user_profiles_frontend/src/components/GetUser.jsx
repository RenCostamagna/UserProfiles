import React, { useState, useEffect } from 'react';
import "./StylesComponents.css";
import { useCanister } from '@connect2ic/react';


function GetUser () {
  const [userId, setUserId] = useState('');
  const [users, setUser] = useState(null);
  const [functions] = useCanister('user_profiles_backend')

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  const getUserxBackend = async (e) => {
    e.preventDefault();

    try{
      let neUser = await functions.getUser(userId)
      setUser(neUser)
    }catch(error){
      console.error(error);
    }
  }

  return (
    <div className="get-user-container">
      <h2 className="get-user-title">User ID:</h2>
      <form className='get-user-form' onSubmit={getUserxBackend}>
        <input className='get-user-input' type="text" value={userId} onChange={handleChange} />
        <button type='submit' >Confirm</button>
      </form>
        {users ? (
          <div>
            <h3>Detalles del Usuario</h3>
            <p>ID: {users.fullname}</p>
            <p>Nombre: {users.username}</p>
          </div>
        ):(
          <p>Loading user</p>
        )}
    </div>
  );
};

export default  GetUser ;