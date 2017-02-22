import React from 'react';

export default (props) => {
  return(
    <ul>
      {
        props.social.map((link) => (
          <Link to={ link.route } />
        ))
      }
    </ul>
  );
}