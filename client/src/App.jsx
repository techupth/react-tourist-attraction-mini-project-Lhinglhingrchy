import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
function App() {
  //useState ของช่อง input search หา trip
  const [searchTrip, setSearchTrip] = useState("");
  // asynchronus function สำหรับเสริชข้อมูล
  const search = async (text) => {
    const response = await axios.get(
      `http://localhost:4001/trips?keywords=${text}`
    );
    setTripArticle(response.data.data);
  };
  //useEffect สำหรับแสดงผลข้อมูลที่เสิร์ช
  useEffect(() => {
    if (searchTrip) {
      search(searchTrip);
    }
  }, [searchTrip]);
  // useState เพื่อแสดงผลจากกการดึงข้อมูลที่ trip-article
  const [tripArticle, setTripArticle] = useState([]);
  // asynchronus function ดึงข้อมูลจาก server
  const getTrips = async () => {
    const result = await axios.get(`http://localhost:4001/trips?keywords=`);
    // console.log(result);
    setTripArticle(result.data.data);
  };
  // useEffect สำหรับแสดงผลหน้าเว็บไซต์
  useEffect(() => {
    getTrips();
  }, []);
  return (
    <div className="App">
      {/* Start coding here */}
      <h1 className="trip-title">เที่ยวไหนดี</h1>
      <div className="trip-search">
        ค้นหาที่เที่ยว <br />
        <label>
          <input
            id="for-search"
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกัน..."
            onChange={(event) => {
              setSearchTrip(event.target.value);
            }}
            value={searchTrip}
          />
        </label>
        <hr />
      </div>
      <div className="trips-list">
        {tripArticle.map((trip, index) => {
          return (
            <div className="trip-article" key={index}>
              <div className="trip-preview">
                <img src={trip.photos[0]} />
              </div>
              <div className="trip-detail">
                <h1 className="trip-topic">{trip.title}</h1>
                <p className="trip-content">
                  {trip.description.slice(0, 100)}...{" "}
                  <a href={trip.url}>อ่านต่อ</a>
                </p>
                <p className="trip-type">
                  หมวด{" "}
                  {trip.tags.map((type) => {
                    return <span>{type}</span>;
                  })}
                </p>
                <div className="more-trip-preview">
                  <img src={trip.photos[1]} />
                  <img src={trip.photos[2]} />
                  <img src={trip.photos[3]} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
