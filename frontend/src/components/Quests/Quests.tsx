import React, { useState } from "react";
import "./Quests.css";

function Quests() {
  // Navigation Button Variable
  const [questSection, setQuestSection] = useState("open");

  return (
    <>
      <div className="quest-button-container">
        <button
          className={`quest-button-heading quest-button-design ${
            questSection === "open" ? "selected" : ""
          }`}
          onClick={() => setQuestSection("open")}
        >
          Open
        </button>
        <button
          className={`quest-button-heading quest-button-design ${
            questSection === "ongoing" ? "selected" : ""
          }`}
          onClick={() => setQuestSection("ongoing")}
        >
          Ongoing
        </button>
        <button
          className={`quest-button-heading quest-button-design ${
            questSection === "completed" ? "selected" : ""
          }`}
          onClick={() => setQuestSection("completed")}
        >
          Completed
        </button>
      </div>
      <div className="quest-container">
        <p className="d-sub-text">Example Quest</p>
        <button>
          <img src="/icons/next-button-chevron.png" alt="view-button" />
        </button>
      </div>
      <div className="quest-container">
        <p className="d-sub-text">Example Quest</p>
        <button>
          <img src="/icons/next-button-chevron.png" alt="view-button" />
        </button>
      </div>
      <div className="quest-container">
        <p className="d-sub-text">Example Quest</p>
        <button>
          <img src="/icons/next-button-chevron.png" alt="view-button" />
        </button>
      </div>
      <div className="quest-container">
        <p className="d-sub-text">Example Quest</p>
        <button>
          <img src="/icons/next-button-chevron.png" alt="view-button" />
        </button>
      </div>
    </>
  );
}

export default Quests;
