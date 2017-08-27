import React from 'react';

const Logout = (props) => {
  return(
    <form method="post" action="api/logout">
      <input type="submit" value="Logout" />
    </form>
  );
}

export default Logout;
