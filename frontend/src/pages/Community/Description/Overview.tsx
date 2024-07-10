import React, { useState } from "react";
import Members from "../../../components/Members/index";
import Maps from "../../../components/Maps/Maps";
import "./Description.css";

function CommunityDescriptionOverview({ data }: { data: any }) {
  // Navigation Button Variable
  const [questSection, setQuestSection] = useState("open");

  return (
    <>
      <div className="widget-container">
        {/* Description, Objective and Initiative */}
        <div className="background">
          <div className="quest-header-container">
            <h2 className="d-sub-heading">Description</h2>
            <a href="/" className="d-link">
              Edit
            </a>
          </div>
          <p className="d-sub-text margin-top margin-bottom">
            {data.description}
          </p>
          <h2 className="d-sub-heading margin-bottom">Objective</h2>
          <p className="d-sub-text margin-bottom">N/A</p>
          <h2 className="d-sub-heading margin-bottom">Initiative</h2>
          <p className="d-sub-text margin-bottom">N/A</p>
        </div>
        {/* Calendar */}
        <div className="background">
          <h2 className="d-sub-heading margin-bottom">Calendar</h2>
          {/* TODO: Add the shared calendar component from Coquest Widgets here when it is implemented. */}
        </div>
      </div>
      <div className="widget-container">
        {/* Members */}
        <div className="background">
          <Members
            users={
              data.members?.map((member: { name: any }) => member.name) || []
            }
            userRole={["Role"]}
            showAllLink="#"
          />
        </div>
        {/* Quests */}
        {/* TODO: Move this code into it's own component for reuseability and to save space (similar to the Members Component above). */}
        <div className="background">
          <div className="quest-header-container">
            <h2 className="d-sub-heading">Quests</h2>
            <a href="/communities/description/quests" className="d-link">
              See All
            </a>
          </div>
          {/* Quest Navigation Buttons */}
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
        </div>
      </div>
      <div className="widget-container">
        {/* Location */}
        <div className="location-background">
          <h2 className="d-sub-heading">Location</h2>
          <div className="map-design">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="sampleCheckbox"
                name="sampleCheckbox"
              />
              <span className="d-sub-text margin-left">
                Allow for Location Information?
              </span>
            </div>
            <div className="checkbox-container margin-bottom">
              <input
                type="checkbox"
                id="sampleCheckbox"
                name="sampleCheckbox"
              />
              <span className="d-sub-text margin-left">
                Receive Notifications?
              </span>
            </div>
            <Maps
              lat={data.location?.lat}
              long={data.location?.lng}
              mapZoom={14.5}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CommunityDescriptionOverview;
