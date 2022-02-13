import React, { useState, useRef } from "react";
import styles from "./Form.module.css";

function Form() {
  const [formData, setFormData] = useState([]);
  const fileRef = useRef();
  const [pic,setPic] = useState(null)

  const onChangeHandle = (e) => {
    const { name, value, type, checked } = e.currentTarget;
    let formValue = type === "checkbox" ? checked : value;
    if (name === "files") {
      console.log(fileRef.current.files[0]);
      setPic(fileRef.current.files[0]);
    }
    if (formValue === true) formValue = "true";
    else if (formValue === false) formValue = "false";
    setFormData({ ...formData, [name]: formValue });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    postData();
  };

  const postData = () => {
    // data to be sent to the POST request

    fetch("http://localhost:3004/posts/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>User Form Details</h1>
      <form onSubmit={onFormSubmit}>
        <label>
          <input
            type="text"
            name="ename"
            placeholder="Enter Name"
            onChange={onChangeHandle}
            value={formData.ename}
          />
        </label>

        <label>
          <input
            type="number"
            name="eage"
            placeholder="Enter Age"
            onChange={onChangeHandle}
            value={formData.eage}
          />
        </label>
        <label>
          <textarea
            name="eaddress"
            cols="30"
            rows="10"
            placeholder="Enter Address"
            onChange={onChangeHandle}
            value={formData.eaddress}
          ></textarea>
        </label>
        <label>
          <select
            value={formData.edepartment}
            name="edepartment"
            onChange={onChangeHandle}
          >
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Tester">Tester</option>
            <option value="Marketing">Marketing</option>
          </select>
        </label>
        <label>
          <input
            type="number"
            name="esalary"
            placeholder="Enter Salary"
            onChange={onChangeHandle}
            value={formData.esalary}
          />
        </label>
        <label>
          Marital Status :<span> Check if Married</span>
          <input
            type="checkbox"
            name="isMarried"
            checked={formData.isMarried}
            onChange={onChangeHandle}
          />
        </label>
        <label>
          Profile Photo
          <input
            type="file"
            name="files"
            ref={fileRef}
            onChange={onChangeHandle}
          />
          <img src={pic?URL.createObjectURL(pic):null} alt="Your Profile" height="150px" width="120px" />
        </label>
        <label>
          <button type="submit">Submit</button>
        </label>
      </form>
    </>
  );
}

export default Form;
