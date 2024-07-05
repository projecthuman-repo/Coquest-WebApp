import React, { useEffect, useState } from "react";
import TagList from "../../components/CheckboxList/PurposeList";
import { subscribeToUserModelSubject } from "../../observers/userobserver";
import { User, generateProfileImg } from "../../models/usermodel";
import { Community } from "../../models/communitymodel";
import UploadWrapper from "../../components/UploadImage/UploadWrapper";
import { useNavigate } from "react-router";
import Repository from "../../repositories/repository";
import { firstValueFrom } from "rxjs";
import { topicsQuery } from "../../apiInterface/gqlOperations";
import Location from "../../components/Location/Location";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "./Create.css";

function CreateCommunity() {
	// Used to disable the submit button when form information is invalid and display the error messages to the user.
	const [formError, _setFormError] = useState(null);
  
  // Used to switch between the different sections of the form.
  const [section, setSection] = useState(0);

	// TODO: Use a routine to create a new Community with default values
	const [community, setCommunity] = useState<Community>(
		new Community({
			_id: undefined,
			name: "",
			description: "",
			images: [generateProfileImg()],
			location: null,
			members: null,
			tags: [],
		}),
	);
	const [user, setUser] = useState<User | undefined>(undefined);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = subscribeToUserModelSubject((user: User) => {
			setUser(user);
			// Add current user as the first member of the community
			setCommunity(
				(prev) =>
					new Community({
						_id: undefined,
						...prev,
						members: [{ type: "obj", objValue: user! }],
						location: user.location ?? null,
					}),
			);
		});
		return () => {
			unsubscribe.then((cleanup) => cleanup && cleanup());
		};
	}, [setUser]);

	const handleInputChange = (name: string, value: any) => {
		setCommunity(
			(prev) =>
				new Community({
					_id: undefined,
					...prev,
					[name]: value,
				}),
		);
	};

	async function onSubmit(e: any) {
		e.preventDefault();
		try {
			const repo = Repository.getInstance("Community", Community);
			await firstValueFrom(repo.fetch(community));
			// TODO: Display success message to the user
			navigate("/");
		} catch (error) {
			// TODO: Report errors to user
			console.error(error);
		}
	}

	if (user) {
		return (
			<>
            <div className="create-community-page">
                <ProgressBar numOfPages={4} currentPageNum={section + 1} />
            </div>
            {/* Community Name, Objective and Initiative Section*/}
            <form id="community-form" className="form-container" onSubmit={onSubmit}>
            {section === 0 && (
				<div className="create-community-page">
					<h1 className="main-heading">Create a Community</h1>
					<h2 className="sub-heading">
						Let&apos;s create a new community! Enter some basic information
						below to get started.
					</h2>
					<div className="form-background">
                        {/* Community Name*/}
                        <div className="input-wrapper">
						<label className="placeholder-label" htmlFor="name">Community Name</label>
							<input
								id="name"
								name="name"
								className="styled-input"
								type="text"
								value={community.name!}
								onChange={(e) =>
									handleInputChange(
										e.target.name,
										e.target.value,
									)
								}
							/>
                        </div>
							{/* Community Description*/}
                            <div className="input-wrapper">
							<label className="placeholder-label" htmlFor="description">Community Description</label>
                                <textarea
                                    id="description"
                                    className="styled-textarea"
                                    name="description"
                                    value={community.description!}
                                    onChange={(e) =>
                                        handleInputChange(
                                            e.target.name,
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            {/* Community Objective*/}
                            <div className="input-wrapper">
                                <label className="placeholder-label" htmlFor="objective">Community Objective</label>
                                    <textarea
                                        id="description"
                                        className="styled-textarea"
                                        name="description"
                                        value={community.description!}
                                        onChange={(e) =>
                                            handleInputChange(
                                                e.target.name,
                                                e.target.value,
                                            )
                                        }
                                    />
                            </div>
                            {/* Community Initiative*/}
                            <div className="input-wrapper">
							<label className="placeholder-label" htmlFor="initiative">Community Initiative</label>
                                <textarea
                                    id="initiative"
                                    className="styled-textarea"
                                    name="initiative"
                                    value={community.description!}
                                    onChange={(e) =>
                                        handleInputChange(
                                            e.target.name,
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
						</div>
                    </div>
                )}
                {/* Community Tags Section*/}
                {section === 1 && (
                    <div className="create-community-page">
                        <h1 className="main-heading">Add Some Tags</h1>
                        <h2 className="sub-heading">
                            Add relevant tags to your community to help find others with similar interests.
                        </h2>
                        <div className="form-background">
                            <label className="sub-text" htmlFor="tags">Tags</label>
                                <TagList
                                    setFuncs={[
                                        (tags: any) =>
                                            handleInputChange(
                                                "tags",
                                                Array.from(tags),
                                            ),
                                    ]}
                                    checkedData={new Set<string>(community.tags)}
                                    query={topicsQuery}
                                />
                        </div>
                    </div>
                )}
				</form>
                {/* Community Location Section - (Outside of the form to prevent it from triggering the form's submit event on use) */}
                {section === 2 && (
                    <div className="create-community-page">
                        <h1 className="main-heading">Pin Your Spot</h1>
                        <h2 className="sub-heading">
                            Set a location for your community to attract users closer to your area.
                        </h2>
                        <div className="form-background">
                            <label className="sub-text" htmlFor="location">Location</label>
                                <Location
                                    headingText="false"
                                    user={user}
                                    updateData={(location: any) =>
                                        handleInputChange("location", location)
                                    }
                                />
                        </div>
                    </div>
                )}
                {/* Community Image Section - (Outside of the form to prevent it from triggering the form's submit event on use) */}
                {section === 3 && (
                    <div className="create-community-page">
                        <h1 className="main-heading">Almost Finished!</h1>
                        <h2 className="sub-heading">
                            Upload a profile picture for your community to represent it visually.
                        </h2>
                        <div className="form-background">
                            <label className="sub-text" htmlFor="image">Image</label>
                                <UploadWrapper
                                    images={community.images}
                                    updateData={(images: any) =>
                                        handleInputChange("images", images)
                                    }
                                    multiUpload={true}
                                    generateImgCb={generateProfileImg}
                                />
                        </div>
                    </div>
                )}
                <div className="create-community-page">
                {formError !== null && <p className="form-error">{formError}</p>}
                </div>
                {/* Navigation Buttons */}
                {section === 0 && (
					<div className="button-container">
						<button
						    className="cc-button-design"
                            onClick={() => setSection(section + 1)}
						>
							Next {">"}
						</button>
					</div>
                )}
                {(section !== 0 && section !== 3) && (
					<div className="button-container">
						<button
							className="cc-button-design"
                            onClick={() => setSection(section - 1)}
						>
							{"<"} Back
						</button>
                        <button
							className="cc-button-design"
                            onClick={() => setSection(section + 1)}
						>
							Next {">"}
						</button>
					</div>
                )}
                {section === 3 && (
					<div className="button-container">
                        <button
							className="cc-button-design"
                            onClick={() => setSection(section - 1)}
						>
							{"<"} Back
						</button>
						<button
							className="cc-button-design"
							type="submit"
							form="community-form"
							disabled={formError !== null}
						>
							Submit
						</button>
					</div>
                )}
			</>
		);
	} else {
		return null;
	}
}

export default CreateCommunity;
