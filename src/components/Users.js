import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { initialState, usersReducer } from "../reducers/usersReducer";

const Users = () => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 500);
    return clearTimeout(timer);
  }, []);

  const fetchUsers = async () => {
    dispatch({ type: "USERS_PENDING" });
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      dispatch({ type: "USERS_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "USERS_FAILED" });
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search user..."
        onChange={(e) =>
          dispatch({ type: "SEARCH_USER", payload: e.target.value })
        }
      />
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Full Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {state.data.length > 0 ? state.data
            .filter((user) => {
              return (
                user.username.toLowerCase().includes(state.query) ||
                user.name.toLowerCase().includes(state.query) ||
                user.email.toLowerCase().includes(state.query)
              );
            })
            .map((user) => {
              return (
                <tr>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              );
            }) : <h1>No data found!</h1>}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
