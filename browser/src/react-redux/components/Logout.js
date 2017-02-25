import React from 'react';

export default (props) => {
  return(
    <form method="post" action="api/logout">
      <input type="submit" value="Logout" />
    </form>
  );
}