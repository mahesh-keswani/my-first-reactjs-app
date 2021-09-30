import React, { useState } from "react";
import "./AddUser.css";
import ShowUsers from "./ShowUsers";

function AddUser(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usersList, setUsers] = useState([]);

  const [isValid, setIsValid] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  function addUser(userData) {
    setUsers(previousUsers => {
      return [userData, ...previousUsers];
    });
  }

  const submitHandler = event => {
    event.preventDefault();

    if (username.trim().length === 0 || password.trim().length === 0) {
      setIsValid(false);
      console.log(isValid);
      return;
    } else {
      let userData = {
        id:Math.random().toString(),
        username: username,
        password: password
      };

      setUsername("");
      setPassword("");

      addUser(userData);
      if (isEditing === true){
        setIsEditing(false);
      }
    }
  };

  const setUsernameHandler = event => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setUsername(event.target.value);
  };

  const setPasswordHandler = event => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setPassword(event.target.value);
  };

  function deleteUserHandler(userId) {
    const updatedUsers = usersList.filter( user => user.id !== userId );
    setUsers(updatedUsers);
    console.log(usersList);
  }

  function editUserHandler(userId) {
    let user = usersList.filter(user => user.id === userId)[0];
    setUsername(user.username);
    setPassword(user.password);

    setIsEditing(true);

    deleteUserHandler(userId);
  }
  
  return (
    <div>
      <form
        onSubmit={submitHandler}
        className={`formBody ${!isValid ? "inValid" : ""}`}
      >
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={setUsernameHandler}
          autoComplete="off"
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={setPasswordHandler}
        />
        <br />
        <button type="submit">{isEditing ? "Update User" : "Add User"}</button>
      </form>

      <ShowUsers
        users={usersList}
        userToDelete={deleteUserHandler}
        editUser={editUserHandler}
      />
    </div>
  );
}

export default AddUser;
