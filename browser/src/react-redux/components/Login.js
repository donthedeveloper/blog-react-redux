import React from 'react';

export default (props) => {
  return(
    <form method="post" action="api/login">
      <label for="username">Username: </label>
      <input id="username" name="username" type="text" />
      <br />
      <label for="password">Password: </label>
      <input id="password" name="password" type="text" />
      <br />
      <input type="submit" value="Login" />
    </form>
  );
}