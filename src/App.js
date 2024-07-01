import logo from "./logo.svg";
import "./App.css";
import FileUpload from "./components/FileUpload";
import { useEffect, useState } from "react";
import DisplayData from "./components/DisplayData";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [toStore, setToStore] = useState();
  useEffect(() => {
    if (toStore) {
      storeData();
    } else {
      setData([]);
    }
    return () => {
      setToStore(null);
    };
  }, [toStore]);
  const storeData = async () => {
    console.log(data);
    try {
      const response = await axios.post("http://localhost:3000/store", {data});
      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <FileUpload storeData={setData} />
        {data.length > 0 && <DisplayData data={data} setToStore={setToStore} />}
      </header>
    </div>
  );
}

export default App;
