import React from "react";

function Tableitem({ name, age, address, department, salary, married, id }) {
  const onDelete = (id) => {
    fetch(`http://localhost:3004/posts/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  };
  return (
    <tr key={id + "b"}>
      <td>{name}</td>
      <td>{age}</td>
      <td>{address}</td>
      <td>{department}</td>
      <td>{salary}</td>
      <td>{married}</td>
      <td>
        <button
          onClick={() => {
            onDelete(id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Tableitem;
