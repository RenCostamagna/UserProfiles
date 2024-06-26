import { useCanister } from "@connect2ic/react";
import React, { useState } from "react";
import "./StylesComponents.css";

function NewUser ()  {

    const [username, setUsername] = useState(""); 
    const [fullname, setFullname] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [bio, setBio] = useState(""); 

    const [functions] = useCanister("user_profiles_backend");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{

            const newUser = await functions.createUser(username,fullname,email,bio);
            console.log(newUser)

        }catch(error){

            console.error(error);
        }
    };

    return(
        <div className="new-user-container">
            <h3 className="new-user-title">Create new user</h3>
            <form className="new-user-form" onSubmit={handleSubmit}>
                <label> Username: </label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label> Fullname: </label>
                <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />

                <label> Email: </label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label> Bio: </label>
                <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />

                <button type="submit">Save user</button>
            </form>
        </div>

    );
};

export default NewUser;
