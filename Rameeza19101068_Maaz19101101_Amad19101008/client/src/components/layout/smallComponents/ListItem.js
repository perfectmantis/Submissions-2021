import React from "react";
import { Link } from "react-router-dom";

export default function ListItem({ getClassName,abc, handleClick, url, title,icon }) {
  return (
    <li className={getClassName}>
          <Link to={url} onClick={handleClick}>
        <i  className={`${icon}`} /> {title}
      </Link>
    </li>
  );
}
