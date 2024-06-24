import { useCanister } from "@connect2ic/react";

import React, { useState } from "react";


const UserItem = (props) => {
    const { user, refresh } = props;
    const [users] = useCanister("user_profile_backend");

    const [loading, setLoading] = useState("");
    const [username, setMessage] = useState(user[1].username);
    const [visible, setVisible] = useState(false);

    const handleUpdate = async (event) => {
        event.preventDefault();

        setLoading("Loading...");
        try {
            await users.updateUser(user[0], username, fullname, email, bio);
            await refresh();
            setLoading("");
        } catch(e) {
            setLoading("There was an error.");
            console.log(e);
        } finally {
            setVisible(false);
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();

        setLoading("Loading...");
        try {
            await users.deleteUser(post[0]);
            await refresh();
            setLoading("");
        } catch(e) {
            setLoading("There was an error.");
            console.log(e);
        } finally {
            setVisible(false);
        }
    }

    return(
        <div className="border border-gray-500 p-2">
            <p className="border-b border-gray-500"><strong>Internet ID: </strong>{user[1].internetName}</p>
            <div className="mb-2">
                <p>{user[1].username}</p>
                <p>{user[1].fullname}</p>
                <p>{user[1].email}</p>
                <p>{user[1].bio}</p>
            </div>
            <div className={`${visible ? `flex` : `hidden`} flex-col items-center justify center w-full space-y-2 my-2`}>
                <input className="border border-gray-500 px-2 w-full" type="text" value={username} onChange={(e) => setMessage(e.target.value)}/>
                <br />
                <input className="border border-gray-500 px-2 w-full" type="text" value={fullname} onChange={(e) => setMessage(e.target.value)}/>
                <br />
                <input className="border border-gray-500 px-2 w-full" type="text" value={email} onChange={(e) => setMessage(e.target.value)}/>
                <br />
                <input className="border border-gray-500 px-2 w-full" type="text" value={bio} onChange={(e) => setMessage(e.target.value)}/>
                <button className="w-full bg-gray-950 hover:bg-gray-900 text-white p-2 font-bold" onClick={handleUpdate}>Update</button>
            </div>
            <p>{loading}</p>
            <div className={`${visible ? `hidden` : `flex`} items-center justify center w-full space-x-2 mt-2"`}>
                <button className="w-full bg-gray-950 hover:bg-gray-900 text-white p-2 font-bold" onClick={() => setVisible(true)}>Edit</button>
                <button className="w-full bg-gray-950 hover:bg-gray-900 text-white p-2 font-bold" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export {UserItem}