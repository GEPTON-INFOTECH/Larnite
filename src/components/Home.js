import React from "react";
import "../App.css";
import { Button } from "@material-ui/core";
import Course from "../images/Courses.svg";

function Home() {
  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-6 col-12 my-auto text-left">
            <h2 className="heading">Who are We?</h2>
            <p className="text-left course-content">
              We provide Mentorship and Guidance for FRM Level 1 exam conducted
              by GARP.
            </p>
            <Button
              className="mt-2 text-left rounded-pill mb-3 mb-md-0 theme-background"
              size="large"
              variant="contained"
              color="primary"
            >
              Expore Courses
            </Button>
          </div>
          <div className="col-md-6 col-12">
            <img alt="front-img" src={Course} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
