import React from "react";
import "../styles/displayData.css";
const DisplayData = (props) => {
  const storeData = () => {
    props.setToStore(true);
  };
  const cancelData = () => {
    props.setToStore(false);
  };
  return (
    <>
      <div className="data-display">
        <h2>Data Uploaded:</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Website</th>
              <th>Employees</th>
              <th>Founded Date</th>
              <th>Industry Type</th>
              <th>Contact Name</th>
              <th>Contact Email</th>
              <th>Contact Phone</th>
              <th>Date of Birth</th>
              <th>Contact Type</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item, index) => (
              <tr key={index}>
                <td>{item.companyData.name}</td>
                <td>{item.companyData.address}</td>
                <td>{item.companyData.phone}</td>
                <td>{item.companyData.email}</td>
                <td>{item.companyData.website}</td>
                <td>{item.companyData.totalEmployees}</td>
                <td>{item.companyData.foundedDate}</td>
                <td>{item.companyData.industryType}</td>
                <td>{item.contactData.name}</td>
                <td>{item.contactData.email}</td>
                <td>{item.contactData.phone}</td>
                <td>{item.contactData.dateOfBirth}</td>
                <td>{item.contactData.contactType}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="data-buttons">
          <button onClick={storeData}>Confirm</button>
          <button onClick={cancelData}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default DisplayData;
