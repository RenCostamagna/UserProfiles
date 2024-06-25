import React, { useState, useEffect } from 'react';
import { useCanister } from '@connect2ic/react';

const GetUser = () => {
  const [userID, setUserID] = useState([]);
  const [functions] = useCanister('user_profiles_backend')

  useEffect(() => {
    const getUsersBackend = async () => {
      try {
        const response = await functions.getUser(userID); 
        setUserID(response);
      } catch (error) {
        console.error('Error to get user:', error);
      }
    };

    getUsersBackend();
  }, []);

  return (
    <div className="get-user-container">
      <h3 className="get-user-title">User</h3>
      <ul className="get-user-list">
        {userID.map((user) => {
          <li key={user.id}>
            ID: {user.id} - Username: {user.username} - Fullname: {user.fullname} - Email: {user.email} - Bio: {user.bio}
          </li>
        })}
      </ul>
    </div>
  );
};

export { GetUser };