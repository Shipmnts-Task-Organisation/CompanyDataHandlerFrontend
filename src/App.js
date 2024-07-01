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
      await toast.promise(axios.post("http://localhost:3000/store", { data }), {
        loading: "Loading...",
        success: <b>Successfully stored the data</b>,
        error: <b>Error storing data. Please try again.</b>,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error storing data. Please try again.");
    }
  };
  return (
    <div className="App">
      <div>
        <Toaster />
      </div>

      {data.length == 0 && <FileUpload storeData={setData} />}
      {data.length > 0 && <DisplayData data={data} setToStore={setToStore} />}
    </div>
  );
}

export default App;
