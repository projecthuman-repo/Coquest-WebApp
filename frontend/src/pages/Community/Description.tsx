import { useState } from "react";
import "./Description.css";
import Members from "../../components/Members/index"

function CommunityDescription() {

    const [section, setSection] = useState("overview");
    const [questSection, setQuestSection] = useState("open");

    return (
        <>
        <div className="community-description-page">
            <div className="header-container">
                <h1 className="d-main-heading">Guild/Community Name</h1>
                <button className="signup-button-design">Sign Up</button>
            </div>
            <div className="nav-button-container">
                <button className={`button-design ${section === "overview" ? "selected" : ""}`} onClick={() => setSection("overview")}>Overview</button>
                <button className={`button-design ${section === "programs" ? "selected" : ""}`} onClick={() => setSection("programs")}>Programs</button>
                <button className={`button-design ${section === "projects" ? "selected" : ""}`} onClick={() => setSection("projects")}>Projects</button>
                <button className={`button-design ${section === "co-ops" ? "selected" : ""}`} onClick={() => setSection("co-ops")}>Co-ops</button>
            </div>
            {/* Overview Section */}
            {section === "overview" && (
            <>
            <div className="widget-container">
                <div className="background">
                    <h2 className="d-sub-heading margin-bottom">Description</h2>
                    <p className="d-sub-text margin-bottom">Placeholder Text.</p>
                    <h2 className="d-sub-heading margin-bottom">Objective</h2>
                    <p className="d-sub-text margin-bottom">Placeholder Text.</p>
                    <h2 className="d-sub-heading margin-bottom">Initiative</h2>
                    <p className="d-sub-text margin-bottom">Placeholder Text.</p>
                </div>
                <div className="background">
                    <h2 className="d-sub-heading margin-bottom">Calendar</h2>
                    <p className="d-sub-text">Note: Add the shared calendar component here when it is implemented. </p>
                </div>
            </div>
            <div className="widget-container">
                <div className="background">
                {/* Note: Currently placeholder information. Should be changed to reflect current guild/community. */}
                <Members
						users={["Example User"]}
						userRole={["Role"]}  
						showAllLink="#"
				/>
                </div>
                <div className="background">
                    <div className="quest-header-container">
                        <h2 className="d-sub-heading">Quests</h2>
                        <a href="/" className="d-link">See All</a>
                    </div>
                    <div className="quest-button-container">
                        <button className={`quest-button-heading quest-button-design ${questSection  === "open" ? "selected" : ""}`} onClick={() => setQuestSection("open")}>Open</button>
                        <button className={`quest-button-heading quest-button-design ${questSection  === "ongoing" ? "selected" : ""}`} onClick={() => setQuestSection("ongoing")}>Ongoing</button>
                        <button className={`quest-button-heading quest-button-design ${questSection === "completed" ? "selected" : ""}`} onClick={() => setQuestSection("completed")}>Completed</button>
                    </div>
                    <p className="d-sub-text quest-design">Example Quest</p>
                    <p className="d-sub-text quest-design">Example Quest</p>
                    <p className="d-sub-text quest-design">Example Quest</p>
                </div>
            </div>
            <div className="widget-container">
                <div className="location-background">
                    <h2 className="d-sub-heading margin-bottom">Location</h2>
                    <p className="d-sub-text">Note: Figure out how to implement the Maps component here. </p>
                </div>
            </div>
            </>
            )}
            {/* Programs Section */}
            {section === "programs" && (
            <>
            <p className="d-sub-text margin-top">Programs!</p>
            </>
            )}
            {/* Projects Section */}
            {section === "projects" && (
            <>
            <p className="d-sub-text margin-top">Projects!</p>
            </>
            )}
            {/* Co-ops Section */}
            {section === "co-ops" && (
            <>
            <p className="d-sub-text margin-top">Co-ops!</p>
            </>
            )}
        </div>
        </>
    );

}

export default CommunityDescription;
