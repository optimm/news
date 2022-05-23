import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "./interviews.css";
import Carousel from "react-elastic-carousel";
import Maincolumn from "./Main_column";

import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
// import data from "./newss.js";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const Columns = () => {
  const navigate = useNavigate();
  const Axios = useAxiosPrivate();
  const [column, setcolumn] = useState([]);
  useEffect(() => {
    getcolumn();
  }, []);

  function fullpage(index, link) {
    if (link) {
      navigate("/video", { state: column[index] });
    } else {
      alert("You are not subscribed");
    }
  }

  const getcolumn = async () => {
    await Axios.get(`/api/news/?offset=0&limit=10&section=column`).then(
      (res) => {
        setcolumn([...res.data.results]);
      }
    );
  };
  return (
    <div>
      <Nav />
      <h1 className="section-heading">Columns</h1>

      <div className="columns">
        <Carousel breakPoints={breakPoints}>
          {column.length > 0 &&
            column.map((item, index) => {
              return (
                <React.Fragment id={index}>
                  <div
                    onClick={() => fullpage(index, item.video_link)}
                    className="clickable"
                  >
                    <Maincolumn
                      classN="main-column-container-vertical"
                      item={{
                        head: item.heading,
                        img: item.thumbnail,
                        paid: item.paid,
                      }}
                      characters={150}
                    />
                  </div>
                </React.Fragment>
              );
            })}
        </Carousel>
      </div>
    </div>
  );
};

export default Columns;
