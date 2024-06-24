import { useCanister, useConnect } from "@connect2ic/react";
import React, { useEffect, useState } from "react";
import { UserItem } from "./UserItem";

const User = () => {
    const [user] = useCanister("user_profiles_backend");
    
    const [loading, setLoading] = useState("");
    const [users, setUsers] = useState([]);

    const {principal} = useConnect();

    useEffect(() => {
        handleSubmit();
    },[]);

    const refreshUser = async () => {
        setLoading("Loading...");
        try {
            const result = await user.getAllUser();
            setUsers(result);
            setLoading("Done");
        } catch(e) {
            console.log(e);
            setLoading("Error happened fetching user list");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading("Loading...");
        const inputValueUsername = e.target.elements.username.value;
        const inputValueFullname = e.target.elements.fullname.value;
        const inputValueEmail = e.target.elements.email.value;
        const inputValueBio = e.target.elements.bio.value;

        await user.createUser(inputValueUsername, inputValueFullname, inputValueEmail, inputValueBio);
        await refreshUser();

    };

    const handleRefresh = async () => {
        await refreshUser();

    };


    return(
        <div className="flex items-center justify-center flex-col p-4 w-full">
            <h1 className="h1 text-center border-b border-gray-500 pb-2">Hi {principal ? principal : ", connect with Internet Identity to continue"}!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center border mt-4 border-gray-500 p-5 space-x-2 w-96">
                        <div className="flex flex-col space-y-2 w-full">
                            <label htmlFor="message">Username </label>
                            <input id="username" required type="text" />
                            <br />
                            <label htmlFor="message">Fullname </label>
                            <input id="fullname" required type="text" />
                            <br />
                            <label htmlFor="message">Email </label>
                            <input id="email" required type="text" />
                            <br />
                            <label htmlFor="message">Bio </label>
                            <input id="bio" required type="text" />
                            <button type="submit" className="w-full p-2 rounded-sm bg-gray-950 hover:bg-gray-900 text-white text-lg font-bold">Create</button>
                        </div>                
                    </div>
                </form>

            <p className="mx-2">{loading}</p>

            <div className="mt-4 space-y-2 w-96">
                <h2 className="h2 font-bold text-xl text-start">Users</h2>
                <button className="w-full bg-gray-950 hover:bg-gray-900 text-white p-2 font-bold" onClick={handleRefresh}>Refresh</button>
                {users.map((user) => {
                    return(<UserItem key={user[0]} user={user} refresh={handleRefresh} />) 
                })}
            </div>
        </div>
    )
}

export {User}