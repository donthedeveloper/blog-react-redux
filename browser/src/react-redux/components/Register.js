import React from 'react';

export default (props) => {
  return(
    <form method="post" action="api/register">
      <label for="username">Username: </label>
      <input id="username" name="username" type="text" />
      <br />
      <label for="password">Password: </label>
      <input id="password" name="password" type="text" />
      <br />
      <label for="first-name">First Name: </label>
      <input id="first-name" name="firstName" type="text" />
      <br />
      <label for="last-name">Last Name: </label>
      <input id="last-name" name="lastName" type="text" />
      <br />
      <label for="email">Email: </label>
      <input id="email" name="email" type="text" />
      <br />
      <input type="submit" value="Register" />
    </form>
  );
}