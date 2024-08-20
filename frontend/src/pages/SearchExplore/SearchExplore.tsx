import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./SearchExplore.css";

function Explore() {

	// Search Value Variable
	const [searchValue, setSearchValue] = useState('');

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	// TODO: Utilize user location and their joined communities to identify and display relevant projects, programs, and coops on the main page.

	// TODO: Filter the displayed projects, programs, and co-ops based on the searchValue variable.

	const navigate = useNavigate();

	return (
		<>
		<div className="explore-container">
			<div className="explore-heading-container">
				<h1 className="explore-main-heading margin-bottom">Explore</h1>
				<div className="explore-search-container">
					<input type="search" className="explore-search" name="search" value={searchValue} onChange={handleSearchChange} placeholder="Search Projects, Programs and Coops" />
					<img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png" alt="search-icon" className="explore-search-icon" />
				</div>
			</div>
			{searchValue === '' ? (
			<>
			{/* TODO: Replace placeholder data and display relevant projects, programs and coops here. */}
			<div className="explore-section-container">
				<h2 className="explore-sub-heading">Trending Now</h2>
				<div className="explore-content-container">
					<button className="explore-widget-nav-button">
						<img src="/icons/back-button-chevron.png" alt="search-icon" />
					</button>
					<div className="explore-widget-container">
						<h1 className="explore-widget-main-heading">Project Name</h1>
						<h2 className="explore-widget-sub-heading">Community Name</h2>
						<h3 className="explore-widget-sub-heading margin-bottom">Progress: 100%</h3>
						<p className="explore-widget-sub-text margin-bottom">This is a placeholder description for widgets displaying on the website. It should cut off after a while.</p>
						<button className="explore-widget-view-button" onClick={() => navigate(`/projects/description`)}>View</button>
					</div>
					<div className="explore-widget-container">
						<h1 className="explore-widget-main-heading">Program Name</h1>
						<h2 className="explore-widget-sub-heading">Community Name</h2>
						<h3 className="explore-widget-sub-heading margin-bottom">Progress: 100%</h3>
						<p className="explore-widget-sub-text margin-bottom">This is a placeholder description for widgets displaying on the website. It should cut off after a while.</p>
						<button className="explore-widget-view-button" onClick={() => navigate(`/programs/description`)}>View</button>
					</div>
					<div className="explore-widget-container">
						<h1 className="explore-widget-main-heading">Coop Name</h1>
						<h2 className="explore-widget-sub-heading">Community Name</h2>
						<h3 className="explore-widget-sub-heading margin-bottom">Progress: 100%</h3>
						<p className="explore-widget-sub-text margin-bottom">This is a placeholder description for widgets displaying on the website. It should cut off after a while.</p>
						<button className="explore-widget-view-button">View</button>
					</div>
					<button className="explore-widget-nav-button">
						<img src="/icons/next-button-chevron.png" alt="search-icon" />
					</button>
				</div>
			</div>
			<div className="explore-section-container">
				<h2 className="explore-sub-heading">Projects Near You</h2>
				<div className="explore-content-container">
					<button className="explore-widget-nav-button">
						<img src="/icons/back-button-chevron.png" alt="search-icon" />
					</button>
					<div className="explore-widget-container">
						<h1 className="explore-widget-main-heading">Project Name</h1>
						<h2 className="explore-widget-sub-heading">Community Name</h2>
						<h3 className="explore-widget-sub-heading margin-bottom">Progress: 100%</h3>
						<p className="explore-widget-sub-text margin-bottom">This is a placeholder description for widgets displaying on the website. It should cut off after a while.</p>
						<button className="explore-widget-view-button" onClick={() => navigate(`/projects/description`)}>View</button>
					</div>
					<div className="explore-widget-container">
						<h1 className="explore-widget-main-heading">Project Name</h1>
						<h2 className="explore-widget-sub-heading">Community Name</h2>
						<h3 className="explore-widget-sub-heading margin-bottom">Progress: 100%</h3>
						<p className="explore-widget-sub-text margin-bottom">This is a placeholder description for widgets displaying on the website. It should cut off after a while.</p>
						<button className="explore-widget-view-button" onClick={() => navigate(`/projects/description`)}>View</button>
					</div>
					<div className="explore-widget-container">
						<h1 className="explore-widget-main-heading">Project Name</h1>
						<h2 className="explore-widget-sub-heading">Community Name</h2>
						<h3 className="explore-widget-sub-heading margin-bottom">Progress: 100%</h3>
						<p className="explore-widget-sub-text margin-bottom">This is a placeholder description for widgets displaying on the website. It should cut off after a while.</p>
						<button className="explore-widget-view-button" onClick={() => navigate(`/projects/description`)}>View</button>
					</div>
					<button className="explore-widget-nav-button">
						<img src="/icons/next-button-chevron.png" alt="search-icon" />
					</button>
				</div>
			</div>
			<div className="explore-section-container">
				<h2 className="explore-sub-heading">Programs Near You</h2>
				<div className="explore-content-container">
					<button className="explore-widget-nav-button">
						<img src="/icons/back-button-chevron.png" alt="search-icon" />
					</button>
					<div className="explore-widget-container">
						<h1 className="explore-widget-main-heading">Program Name</h1>
						<h2 className="explore-widget-sub-heading">Community Name</h2>
						<h3 className="explore-widget-sub-heading margin-bottom">Progress: 100%</h3>
						<p className="explore-widget-sub-text margin-bottom">This is a placeholder description for widgets displaying on the website. It should cut off after a while.</p>
						<button className="explore-widget-view-button" onClick={() => navigate(`/programs/description`)}>View</button>
					</div>
					<div className="explore-widget-container">
						<h1 className="explore-widget-main-heading">Program Name</h1>
						<h2 className="explore-widget-sub-heading">Community Name</h2>
						<h3 className="explore-widget-sub-heading margin-bottom">Progress: 100%</h3>
						<p className="explore-widget-sub-text margin-bottom">This is a placeholder description for widgets displaying on the website. It should cut off after a while.</p>
						<button className="explore-widget-view-button" onClick={() => navigate(`/programs/description`)}>View</button>
					</div>
					<div className="explore-widget-container">
						<h1 className="explore-widget-main-heading">Program Name</h1>
						<h2 className="explore-widget-sub-heading">Community Name</h2>
						<h3 className="explore-widget-sub-heading margin-bottom">Progress: 100%</h3>
						<p className="explore-widget-sub-text margin-bottom">This is a placeholder description for widgets displaying on the website. It should cut off after a while.</p>
						<button className="explore-widget-view-button" onClick={() => navigate(`/programs/description`)}>View</button>
					</div>
					<button className="explore-widget-nav-button">
						<img src="/icons/next-button-chevron.png" alt="search-icon" />
					</button>
				</div>
			</div>
			<div className="explore-section-container">
				<h2 className="explore-sub-heading">Coops Near You</h2>
				<div className="explore-content-container">
					<button className="explore-widget-nav-button">
						<img src="/icons/back-button-chevron.png" alt="search-icon" />
					</button>
					<div className="explore-widget-container">
						<h1 className="explore-widget-main-heading">Coop Name</h1>
						<h2 className="explore-widget-sub-heading">Community Name</h2>
						<h3 className="explore-widget-sub-heading margin-bottom">Progress: 100%</h3>
						<p className="explore-widget-sub-text margin-bottom">This is a placeholder description for widgets displaying on the website. It should cut off after a while.</p>
						<button className="explore-widget-view-button">View</button>
					</div>
					<div className="explore-widget-container">
						<h1 className="explore-widget-main-heading">Coop Name</h1>
						<h2 className="explore-widget-sub-heading">Community Name</h2>
						<h3 className="explore-widget-sub-heading margin-bottom">Progress: 100%</h3>
						<p className="explore-widget-sub-text margin-bottom">This is a placeholder description for widgets displaying on the website. It should cut off after a while.</p>
						<button className="explore-widget-view-button">View</button>
					</div>
					<div className="explore-widget-container">
						<h1 className="explore-widget-main-heading">Coop Name</h1>
						<h2 className="explore-widget-sub-heading">Community Name</h2>
						<h3 className="explore-widget-sub-heading margin-bottom">Progress: 100%</h3>
						<p className="explore-widget-sub-text margin-bottom">This is a placeholder description for widgets displaying on the website. It should cut off after a while.</p>
						<button className="explore-widget-view-button">View</button>
					</div>
					<button className="explore-widget-nav-button">
						<img src="/icons/next-button-chevron.png" alt="search-icon" />
					</button>
				</div>
			</div>
			</>
			) : (
			<>
			{/* TODO: Display filtered projects, programs and coops here. */}
			<div className="explore-section-container">
				<h2 className="explore-sub-heading">Projects</h2>
				<div className="explore-content-container">
					<button className="explore-widget-nav-button">
						<img src="/icons/back-button-chevron.png" alt="search-icon" />
					</button>
					<button className="explore-widget-nav-button">
						<img src="/icons/next-button-chevron.png" alt="search-icon" />
					</button>
				</div>
			</div>
			<div className="explore-section-container">
				<h2 className="explore-sub-heading">Programs</h2>
				<div className="explore-content-container">
					<button className="explore-widget-nav-button">
						<img src="/icons/back-button-chevron.png" alt="search-icon" />
					</button>
					<button className="explore-widget-nav-button">
						<img src="/icons/next-button-chevron.png" alt="search-icon" />
					</button>
				</div>
			</div>
			<div className="explore-section-container">
				<h2 className="explore-sub-heading">Coops</h2>
				<div className="explore-content-container">
					<button className="explore-widget-nav-button">
						<img src="/icons/back-button-chevron.png" alt="search-icon" />
					</button>
					<button className="explore-widget-nav-button">
						<img src="/icons/next-button-chevron.png" alt="search-icon" />
					</button>
				</div>
			</div>
			</>
			)}
		</div>
		</>
	);
}

export default Explore;
