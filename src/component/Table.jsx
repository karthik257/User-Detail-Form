import React, { useEffect, useState } from "react";
import Tableitem from "./Tableitem";
import styles from "./Table.module.css"

function Table() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [all,setAll] = useState(0)

  const handleAsc = () => {
    data.sort((a, b) => a.esalary - b.esalary);
    setData([...data]);
  };

  const handleDes = () => {
    data.sort((a, b) => b.esalary - a.esalary);
    setData([...data]);
  };

  const showDep = (dept) => {
    
    const temp = data.filter((item) => {
      return item.edepartment === dept
    })
    setData([...temp])
  };

  useEffect(() => {
    // `http://localhost:3004/posts?_page=${page}&_limit=2`;
    fetch(`http://localhost:3004/posts?_page=${page}&_limit=5`)
      .then((response) => response.json())
      .then(setData);
  }, [page,all]);

  return (
    <div>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Married</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <Tableitem
                key={e.id + "a"}
                name={e.ename}
                age={e.eage}
                address={e.eaddress}
                department={e.edepartment}
                salary={e.esalary}
                married={e.isMarried}
                id={e.id}
              />
            );
          })}
        </tbody>
      </table>
      <button
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        Previous
      </button>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
      <button onClick={handleAsc}>Sort Ascending</button>
      <button onClick={handleDes}>Sort Descending</button>
      <button onClick={() => showDep("Developer")}>Show Developers</button>
      <button onClick={() => showDep("Designer")}>Show Designers</button>
      <button onClick={() => showDep("Tester")}>Show Testers</button>
      <button onClick={() => setAll(all + 1)}>Show All</button>
    </div>
  );
}

export default Table;
