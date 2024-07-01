/*
This is the component for uploading the file which will be sent to the backend.
*/


import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/fileUpload.css";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster from react-hot-toast

const FileUpload = (props) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile); // Log the selected file for debugging
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://companydatahandlerbackend.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.error) {
        toast.error(response.data.error);
        document.getElementById("fileInput").value = "";
      } else if (response.data.data) {
        console.log(response.data.data);
        props.storeData(response.data.data);
        document.getElementById("fileInput").value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file. Please try again."); // Set error message state
    }
  };

  return (
    <div className="FileUpload">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          accept=".xls, .xlsx"
          id="fileInput"
          onChange={handleFileChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FileUpload;
