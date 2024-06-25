import React, { useEffect, useState } from "react";
import TagList from "../../components/CheckboxList/PurposeList";
import RelativeLocation from "../Orientation/Pages/RelativeLocation";
import { subscribeToUserModelSubject } from "../../observers/userobserver";
import { User, generateProfileImg } from "../../models/usermodel";
import { Community } from "../../models/communitymodel";
import UploadWrapper from "../../components/UploadImage/UploadWrapper";
import { useNavigate } from "react-router";
import Repository from "../../repositories/repository";
import { firstValueFrom } from "rxjs";
import { topicsQuery } from "../../apiInterface/gqlOperations";
import Location from "../../components/Location/Location";
import "./Create.css";

function CreateCommunity() {
	// Used to disable the submit button when form information is invalid and display the error messages to the user.
	const [formError, setFormError] = useState(null);

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
	let navigate = useNavigate();

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
					<h1 className="main-heading">Create Community</h1>
					<h2 className="sub-heading">
						Let's create a new community! Enter the information
						below to get started.
					</h2>
					<form
						id="community-form"
						className="form-container"
						onSubmit={onSubmit}
					>
						<div className="form-background">
							{/* Community Name*/}
							<label className="sub-text" htmlFor="name">
								Name
							</label>
							<input
								id="name"
								name="name"
								className="name-input"
								type="text"
								value={community.name!}
								onChange={(e) =>
									handleInputChange(
										e.target.name,
										e.target.value,
									)
								}
							/>
							{/* Community Description*/}
							<label className="sub-text" htmlFor="description">
								Description
							</label>
							<textarea
								id="description"
								className="description-input"
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
						<div className="form-background">
							{/* Community Tags*/}
							<label className="sub-text" htmlFor="tags">
								Tags
							</label>
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
					</form>
					<div className="form-background">
						{/* Community Location - (Outside of the form to prevent it from triggering the form's submit event on use) */}
						<label className="sub-text" htmlFor="location">
							Location
						</label>
						<Location
							headingText="false"
							user={user}
							updateData={(location: any) =>
								handleInputChange("location", location)
							}
						/>
					</div>
					<div className="form-background">
						{/* Community Image - (Outside of the form to prevent it from triggering the form's submit event on use) */}
						<label className="sub-text" htmlFor="image">
							Image
						</label>
						<UploadWrapper
							images={community.images}
							updateData={(images: any) =>
								handleInputChange("images", images)
							}
							multiUpload={true}
							generateImgCb={generateProfileImg}
						/>
					</div>
					<div className="button-container">
						<button
							className="submit-button"
							type="submit"
							form="community-form"
							disabled={formError !== null}
						>
							Submit
						</button>
					</div>
					{formError !== null && <p className="error">{formError}</p>}
				</div>
			</>
		);
	} else {
		return null;
	}
}

export default CreateCommunity;
