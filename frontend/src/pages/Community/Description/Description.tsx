import React, { useEffect, useState } from "react";
import Repository from "../../../repositories/repository";
import { Community } from "../../../models/communitymodel";
import CommunityDescriptionOverview from "./Overview";
import CommunityDescriptionPrograms from "./Programs";
import CommuntiyDescriptionProjects from "./Projects";
import CommunityDescriptionCoops from "./Coops";
import "./Description.css";

function CommunityDescription() {
  // Navigation Button Variable
  const [section, setSection] = useState("overview");

  // Community Data Variables
  const [communityData, setCommunityData] = useState<Community | null>(null);
  // TODO: Instead of using a hardcoded Community ID, it should be grabbed from the URL.
  const communityId = "666e0c9d083f13aec99b880c";

  // Fetch for Community Data
  useEffect(() => {
    const repository = Repository.getInstance("Community", Community);
    const fetchCommunity = async () => {
      try {
        const communityData = {
          _id: communityId,
          name: "",
          description: "",
          location: null,
          members: [],
        };
        const community = new Community(communityData);
        const fetchedCommunity = await repository.fetch(community).toPromise();
        if (fetchedCommunity) {
          setCommunityData(fetchedCommunity); // Update state with fetched community data
        } else {
          console.error("Community data not found");
        }
        console.log(fetchedCommunity);
      } catch (error) {
        console.error("Error fetching community data:", error);
      }
    };
    fetchCommunity();
  }, [communityId]);

  return (
    <>
      {communityData != null && (
        <div className="community-description-page">
          <div className="header-container">
            <h1 className="d-main-heading">{communityData.name}</h1>
            <button className="signup-button-design">Sign Up</button>
          </div>
          {/* Main Navigation Buttons */}
          <div className="nav-button-container">
            <button
              className={`button-design ${
                section === "overview" ? "selected" : ""
              }`}
              onClick={() => setSection("overview")}
            >
              Overview
            </button>
            <button
              className={`button-design ${
                section === "programs" ? "selected" : ""
              }`}
              onClick={() => setSection("programs")}
            >
              Programs
            </button>
            <button
              className={`button-design ${
                section === "projects" ? "selected" : ""
              }`}
              onClick={() => setSection("projects")}
            >
              Projects
            </button>
            <button
              className={`button-design ${
                section === "co-ops" ? "selected" : ""
              }`}
              onClick={() => setSection("co-ops")}
            >
              Co-ops
            </button>
          </div>
          {/* Overview Section */}
          {section === "overview" && (
            <CommunityDescriptionOverview data={communityData} />
          )}
          {/* Programs Section */}
          {section === "programs" && (
            <CommunityDescriptionPrograms data={communityData} />
          )}
          {/* Projects Section */}
          {section === "projects" && (
            <CommuntiyDescriptionProjects data={communityData} />
          )}
          {/* Co-ops Section */}
          {section === "co-ops" && (
            <CommunityDescriptionCoops data={communityData} />
          )}
        </div>
      )}
    </>
  );
}

export default CommunityDescription;
