import React, { useState } from 'react';
import { useCanister } from '@connect2ic/react';
import "./StylesComponents.css";

const UpdateUser = () => {
  const [id, setUserId] = useState();
  const [username, setUsername] = useState();
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [functions] = useCanister("user_profiles_backend");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        await functions.updateUser(id,username,fullname,email,bio);
        console.log("User updated")

    }catch(error){

        console.error(error);
    }

  };

  return (
    <div className='update-user-container'>
      <h3 className='update-user-title'>Update user</h3>
      <form className='update-user-form' onSubmit={handleSubmit}>
        <label>
         User ID to upgrade:
          <input type="text" value={id} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Fullname:
          <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Bio:
          <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <button className='update-user-form-button' type="submit">Save change</button>
      </form>
    </div>
  );
};

export  {UpdateUser}