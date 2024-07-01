/*
This app component will just make call to backend for storing the validated data
into the database.
*/

import logo from "./logo.svg";
import "../src/styles/App.css";
import FileUpload from "./components/FileUpload";
import { useEffect, useState } from "react";
import DisplayData from "./components/DisplayData";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster from react-hot-toast

function App() {
  const [data, setData] = useState([]);
  const [toStore, setToStore] = useState();
  useEffect(() => {
    if (toStore) {
      storeData();
      setData([]);
    } else if (toStore == false) {
      toast.error("Canceled upload of data");

      setData([]);
    }
    return () => {
      setToStore(null);
    };
  }, [toStore]);
  const storeData = async () => {
    console.log(data);
    try {
      await toast.promise(
        axios.post("https://companydatahandlerbackend.onrender.com/store", {
          data,
        }),
        {
          loading: "Loading...",
          success: <b>Successfully stored the data</b>,
          error: <b>Error storing data. Please try again.</b>,
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error storing data. Please try again.");
    }
  };
  return (
    <div className="App">
      <div className="title">Store Company Details</div>
      <div>
        <Toaster />
      </div>
      {data.length == 0 && (
        <>
          <div className="file-format">
            <p>
              Please upload an Excel file (.xls or .xlsx) with the following
              columns and types:
            </p>
            <ul>
              <li>Company Name (string, required)</li>
              <li>Company Address (string, optional)</li>
              <li>Company Phone (string, optional)</li>
              <li>Company Email (string, optional)</li>
              <li>Company Website (string, optional)</li>
              <li>Number of Employees (integer, optional)</li>
              <li>Founded Date (date, optional)</li>
              <li>
                Industry Type (enum: Technology, Finance, Healthcare, Retail,
                Other, required)
              </li>
              <li>Contact Name (string, required)</li>
              <li>Contact Email (string, required)</li>
              <li>Contact Phone (string, optional)</li>
              <li>Date of Birth (date, optional)</li>
              <li>Contact Type (enum: Primary, Secondary, Other, required)</li>
            </ul>
          </div>
          <FileUpload storeData={setData} />
        </>
      )}
      {data.length > 0 && <DisplayData data={data} setToStore={setToStore} />}
    </div>
  );
}

export default App;
