import React, { useState } from 'react';

import NewUser from './NewUser';
import { UpdateUser } from './UpdateUser';
import { DeleteUser } from './DeleteUser';
import { GetUser } from './GetUser';
const Home = () => {
  const [accion, setAccion] = useState('set');

  return (
    <div>
      <h2>Home</h2>
      <label>
        Options:
          <select value={accion} onChange={(e) => setAccion(e.target.value)}>
          <option value="set">Create User</option>
          <option value="update">Update user</option>
          <option value="get">Get user</option>
          <option value="delete">Delete user</option>
        </select>
      </label>
      {(() => {
        switch (accion) {
          case 'set':
            return <NewUser />;
          case 'update':
            return <UpdateUser />;
          case 'get':
            return <GetUser />;
          case 'delete':
            return <DeleteUser />;
          default:
            return null;
        }
      })()}
    </div>
  );
};

export   {Home}