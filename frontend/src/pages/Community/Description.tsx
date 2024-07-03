import { useEffect, useState } from "react";
import "./Description.css";
import Members from "../../components/Members/index"
import Repository from "../../repositories/repository"; 
import { Community } from "../../models/communitymodel"
import Maps from "../../components/Maps/Maps";

function CommunityDescription() {

    // Navigation Button Variables
    const [section, setSection] = useState("overview");
    const [questSection, setQuestSection] = useState("open");
    const [projectSection, setProjectSection] = useState("my-projects");

    // Community Data Variables
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
            {/* Main Navigation Buttons */}
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
                {/* Description, Objective and Initiative */}
                <div className="background">
                    <div className="quest-header-container">
                        <h2 className="d-sub-heading">Description</h2>
                        <a href="/" className="d-link">Edit</a>
                    </div>
                    <p className="d-sub-text margin-top margin-bottom">{communityData.description}</p>
                    <h2 className="d-sub-heading margin-bottom">Objective</h2>
                    <p className="d-sub-text margin-bottom">N/A</p>
                    <h2 className="d-sub-heading margin-bottom">Initiative</h2>
                    <p className="d-sub-text margin-bottom">N/A</p>
                </div>
                {/* Calendar */}
                <div className="background">
                    <h2 className="d-sub-heading margin-bottom">Calendar</h2>
                    <p className="d-sub-text">Note: Add the shared calendar component here when it is implemented. </p>
                </div>
            </div>
            <div className="widget-container">
                {/* Members */}
                <div className="background">
                <Members
					users={communityData.members?.map(member => member.name) || []}
					userRole={["Role"]}  
					showAllLink="#"
				/>
                </div>
                {/* Quests */}
                <div className="background">
                    <div className="quest-header-container">
                        <h2 className="d-sub-heading">Quests</h2>
                        <a href="/communities/description/quests" className="d-link">See All</a>
                    </div>
                    {/* Quest Navigation Buttons */}
                    <div className="quest-button-container">
                        <button className={`quest-button-heading quest-button-design ${questSection  === "open" ? "selected" : ""}`} onClick={() => setQuestSection("open")}>Open</button>
                        <button className={`quest-button-heading quest-button-design ${questSection  === "ongoing" ? "selected" : ""}`} onClick={() => setQuestSection("ongoing")}>Ongoing</button>
                        <button className={`quest-button-heading quest-button-design ${questSection === "completed" ? "selected" : ""}`} onClick={() => setQuestSection("completed")}>Completed</button>
                    </div>
                    <div className="quest-container">
                        <p className="d-sub-text">Example Quest</p>
                        <button>
                            <img src = "/icons/next-button-chevron.png" alt="view-button" />
                        </button>
                    </div>
                    <div className="quest-container">
                        <p className="d-sub-text">Example Quest</p>
                        <button>
                            <img src = "/icons/next-button-chevron.png" alt="view-button" />
                        </button>
                    </div>                    
                    <div className="quest-container">
                        <p className="d-sub-text">Example Quest</p>
                        <button>
                            <img src = "/icons/next-button-chevron.png" alt="view-button" />
                        </button>
                    </div>
                    <div className="quest-container">
                        <p className="d-sub-text">Example Quest</p>
                        <button>
                            <img src = "/icons/next-button-chevron.png" alt="view-button" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="widget-container">
                {/* Location */}
                <div className="location-background">
                    <h2 className="d-sub-heading margin-bottom">Location</h2>
                    <div className="map-design">
                        <Maps lat={communityData.location?.lat} long={communityData.location?.lng} mapZoom={14.5}/>
                    </div>
                </div>
            </div>
            </>
            )}
            {/* Programs Section */}
            {section === "programs" && (
            <>
            <div className="project-container margin-top">
                <div className="project-background">
                    <p className="project-heading">Program Name</p>
                    <p className="project-sub-heading">Program Sub-Heading</p>
                    <p className="project-text">Placeholder Description.</p>
                    <button>
                        <img src = "/icons/expand-button-chevron.png" alt="expand-button" />
                    </button>
                </div>
            </div>
            </>
            )}
            {/* Projects Section */}
            {section === "projects" && (
            <>
            <div className="search-container">
                <input type="search" className="search" name="search" placeholder="Search Nearby" />
                <img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png" alt="search-icon" className="search-icon" />
            </div>
            {/* Project Navigation Buttons */}
            <div className="quest-button-container">
                <button className={`quest-button-heading quest-button-design ${projectSection  === "my-projects" ? "selected" : ""}`} onClick={() => setProjectSection("my-projects")}>My Projects</button>
                <button className={`quest-button-heading quest-button-design ${projectSection  === "open-projects" ? "selected" : ""}`} onClick={() => setProjectSection("open-projects")}>Open Projects</button>
                <button className={`quest-button-heading quest-button-design ${projectSection === "completed-projects" ? "selected" : ""}`} onClick={() => setProjectSection("completed-projects")}>Completed Projects</button>
            </div>
            <div className="project-container margin-top">
                <div className="project-background">
                    <p className="project-heading">Project Name</p>
                    <p className="project-sub-heading">Project Sub-Heading</p>
                    <p className="project-sub-heading">Location: N/A</p>
                    <p className="project-text">Placeholder Description.</p>
                    <button>
                        <img src = "/icons/expand-button-chevron.png" alt="expand-button" />
                    </button>
                </div>
                <div className="project-background">
                    <p className="project-heading">Project Name</p>
                    <p className="project-sub-heading">Project Sub-Heading</p>
                    <p className="project-sub-heading">Location: N/A</p>
                    <p className="project-text">Placeholder Description.</p>
                    <button>
                        <img src = "/icons/expand-button-chevron.png" alt="expand-button" />
                    </button>
                </div>
                <div className="project-background">
                    <p className="project-heading">Project Name</p>
                    <p className="project-sub-heading">Project Sub-Heading</p>
                    <p className="project-sub-heading">Location: N/A</p>
                    <p className="project-text">Placeholder Description.</p>
                    <button>
                        <img src = "/icons/expand-button-chevron.png" alt="expand-button" />
                    </button>
                </div>
            </div>
            </>
            )}
            {/* Co-ops Section */}
            {section === "co-ops" && (
            <>
            <div className="project-container margin-top">
                <div className="project-background">
                    <p className="project-heading">Co-op Name</p>
                    <p className="project-sub-heading">Co-op Sub-Heading</p>
                    <p className="project-text">Placeholder Description.</p>
                    <button>
                        <img src = "/icons/expand-button-chevron.png" alt="expand-button" />
                    </button>
                </div>
            </div>
            </>
            )}
        </div>
         )}
        </>
    );

}

export default CommunityDescription;
