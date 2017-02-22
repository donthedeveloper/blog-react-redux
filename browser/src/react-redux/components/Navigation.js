import React from 'react';
import { Link } from 'react-router';

export default (props) => {
  return(
    <nav>
      <ul>
        {/*
          props.links.map((link) => (
            <Link to={ link.route }>{ link.value }</Link>
          ))
        */}
        <Link to="/">Blog</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/contact">Contact</Link>
      </ul>
    </nav>
  );
}