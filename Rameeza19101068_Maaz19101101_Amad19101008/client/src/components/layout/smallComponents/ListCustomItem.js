import React from "react";
import { Link } from "react-router-dom";
export default function ListCustomItem({
  provided,
  snapshot,
  item,
  getClassName,
  handleClick,
}) {
  return (
    <li
      style={{
        ...provided.draggableProps.style,
        boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
      }}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={getClassName(item.url)}
    >
      <Link to={`/${item.url}`} onClick={() => handleClick(item.url)}>
        <i {...provided.dragHandleProps} className={`${item.icons}`} />{" "}
        {item.title}
      </Link>
    </li>
  );
}
