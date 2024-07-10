import React, { useState } from "react";
import "./Description.css";

function CommunityDescriptionCoops({ data }: { data: any }) {
  // Navigation Button Variable
  const [coopSection, setCoopSection] = useState("open-coops");

  return (
    <>
      <div className="search-container">
        <input
          type="search"
          className="search"
          name="search"
          placeholder="Search Nearby"
        />
        <img
          src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png"
          alt="search-icon"
          className="search-icon"
        />
      </div>
      <div className="quest-button-container">
        <button
          className={`quest-button-heading quest-button-design ${
            coopSection === "my-coops" ? "selected" : ""
          }`}
          onClick={() => setCoopSection("my-coops")}
        >
          My Co-ops
        </button>
        <button
          className={`quest-button-heading quest-button-design ${
            coopSection === "open-coops" ? "selected" : ""
          }`}
          onClick={() => setCoopSection("open-coops")}
        >
          Open Co-ops
        </button>
        <button
          className={`quest-button-heading quest-button-design ${
            coopSection === "completed-coops" ? "selected" : ""
          }`}
          onClick={() => setCoopSection("completed-coops")}
        >
          Completed Co-ops
        </button>
      </div>
      <div className="project-container margin-top">
        <div className="project-background">
          <p className="project-heading">Co-op Name</p>
          <p className="project-sub-heading">Co-op Sub-Heading</p>
          <p className="project-sub-heading">Location: N/A</p>
          <p className="project-text">Placeholder Description.</p>
          <button>
            <img src="/icons/expand-button-chevron.png" alt="expand-button" />
          </button>
        </div>
      </div>
    </>
  );
}

export default CommunityDescriptionCoops;
