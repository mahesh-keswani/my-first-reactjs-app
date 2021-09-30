import React from "react";
import classes from "./ShowUsers.module.css";

function ShowUsers(props) {
  if (props.users.length === 0) {
    return <h3 className={classes.noUsers}> No users has been added yet !!! </h3>;
  }

  function deleteHandler(userid, username) {
    const areYouSure = window.confirm(
      "Are you sure you want to delete the user " + username
    );

    if (areYouSure === true) {
      console.log(userid);
      props.userToDelete(userid);
    } else {
      return;
    }
  }

  function editHandler(userId){
    props.editUser(userId);
  }

  return (
    <div>
      <table className={classes.tableStyle}>
        <tbody>
          <tr className={classes.tableHeader}>
            <td>User ID</td>
            <td>Username</td>
            <td>Password</td>
            <td></td>
            <td></td>
          </tr>
          {props.users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td><button className={classes.editButton} onClick={() => editHandler(user.id)}>Edit User</button></td>
              <td><button className={classes.deleteButton} onClick={() => deleteHandler(user.id, user.username)}>Delete User</button></td>
                           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowUsers;
