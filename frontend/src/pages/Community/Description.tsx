import { useEffect, useState } from "react";
import "./Description.css";
import Members from "../../components/Members/index"
import Repository from "../../repositories/repository"; 
import { Community } from "../../models/communitymodel"
import Maps from "../../components/Maps/Maps";

function CommunityDescription() {

    const [section, setSection] = useState("overview");
    const [questSection, setQuestSection] = useState("open");
    const [communityData, setCommunityData] = useState<Community | null>(null);
    const communityId = "666e0c9d083f13aec99b880c"; // Placeholder Community ID

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
        { communityData != null && (
        <div className="community-description-page">
            <div className="header-container">
                <h1 className="d-main-heading">{communityData.name}</h1>
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
                    <p className="d-sub-text margin-bottom">{communityData.description}</p>
                    <h2 className="d-sub-heading margin-bottom">Objective</h2>
                    <p className="d-sub-text margin-bottom">N/A</p>
                    <h2 className="d-sub-heading margin-bottom">Initiative</h2>
                    <p className="d-sub-text margin-bottom">N/A</p>
                </div>
                <div className="background">
                    <h2 className="d-sub-heading margin-bottom">Calendar</h2>
                    <p className="d-sub-text">Note: Add the shared calendar component here when it is implemented. </p>
                </div>
            </div>
            <div className="widget-container">
                <div className="background">
                <Members
						users={communityData.members?.map(member => member.name) || []}
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
                    <div className="quest-container">
                        <p className="d-sub-text">Example Quest</p>
                        <img src = "/icons/next-button-chevron.png" alt="view-button" className="view-button" />
                    </div>
                    <div className="quest-container">
                        <p className="d-sub-text">Example Quest</p>
                        <img src = "/icons/next-button-chevron.png" alt="view-button" className="view-button" />
                    </div>                    
                    <div className="quest-container">
                        <p className="d-sub-text">Example Quest</p>
                        <img src = "/icons/next-button-chevron.png" alt="view-button" className="view-button" />
                    </div>
                    <div className="quest-container">
                        <p className="d-sub-text">Example Quest</p>
                        <img src = "/icons/next-button-chevron.png" alt="view-button" className="view-button" />
                    </div>
                </div>
            </div>
            <div className="widget-container">
                <div className="location-background">
                    <h2 className="d-sub-heading margin-bottom">Location</h2>
                    {/* Note: Need to figure out why this component doesn't render on this page, but does on the homepage. Then, modify it to accept long and lat coordinates. */}
                    <Maps />
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
         )}
        </>
    );

}

export default CommunityDescription;
