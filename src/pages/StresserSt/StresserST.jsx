import React from 'react';
import "./StresserSt.css";

import StresserStHeader from "./StresserStHeader";
import StresserStPannel from "./StresserStPannel";

import Footer from "./StresserStFooter";
import Navbar from "../../Navbar/Navbar";

const StresserST = () => {
  return (
    <>
      <Navbar />
      <div class="container-fluid">
        <div class="row ">
          <StresserStHeader />
          <StresserStPannel />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StresserST;
