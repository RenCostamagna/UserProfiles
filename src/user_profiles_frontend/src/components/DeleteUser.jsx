import { useCanister } from '@connect2ic/react';
import React, { useState } from 'react';

const DeleteUser = () => {
  const [userID, setUserId] = useState('');
  const [functions] = useCanister('user_profiles_backend')
  const [visible, setVisible] = useState(false);
;
  const handleDelete = async (e) => {
    e.preventDefault();
    
    try{
      await functions.deleteUser(userID)
      console.log(functions);
    } catch (error){
        console.log(error)
    }finally{
      setVisible(false);
    }
    console.log('User ID to delele:', userID);

  };

  return (
    <div className="delete-user-container">
      <h3 className="delete-user-title">Delete user by ID</h3>
      <form className="delete-user-form" onSubmit={handleDelete}>
        <label>
          User ID:
          <input type="text" value={userID} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export { DeleteUser };