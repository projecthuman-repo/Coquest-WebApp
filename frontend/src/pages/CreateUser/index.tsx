import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { UserInput } from "@/__generated__/graphql";
import { Button } from "@mui/material";
import graphQLClient from "@/apiInterface/client";
import { CREATE_USER_MUTATION } from "@/apiInterface/gqlOperations";

export function CreateUser() {
	const navigate = useNavigate();

	const createUserInput: Pick<
		UserInput,
		"email" | "name" | "username" | "phoneNumber" | "password"
	> = {
		email: "",
		name: { first: "", last: "" },
		username: "",
		phoneNumber: "",
		password: "",
	};
	// State for form inputs
	const [formValues, setFormValues] = useState(createUserInput);

	const handleChange = (data: Partial<typeof createUserInput>) => {
		setFormValues({ ...formValues, ...data });
	};

	const handleSubmit = async () => {
		await graphQLClient
			.request(CREATE_USER_MUTATION, {
				userInput: formValues,
			})
			.then(() => {
				navigate("/");
			});
	};

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "300px",
					gap: 10,
				}}
			>
				<TextField
					label="Email"
					variant="outlined"
					value={formValues.email}
					onChange={(e) => handleChange({ email: e.target.value })}
				/>
				<TextField
					label="First Name"
					variant="outlined"
					value={formValues.name?.first}
					onChange={(e) =>
						handleChange({
							name: {
								first: e.target.value,
								last: formValues.name?.last ?? "",
							},
						})
					}
				/>
				<TextField
					label="Last Name"
					variant="outlined"
					value={formValues.name?.last}
					onChange={(e) => {
						handleChange({
							name: {
								first: formValues.name?.first ?? "",
								last: e.target.value,
							},
						});
					}}
				/>
				<TextField
					label="Username"
					variant="outlined"
					value={formValues.username}
					onChange={(e) => {
						handleChange({ username: e.target.value });
					}}
				/>
				<TextField
					label="Phone Number"
					variant="outlined"
					value={formValues.phoneNumber}
					onChange={(e) => {
						handleChange({ phoneNumber: e.target.value });
					}}
				/>
				<TextField
					label="Password"
					variant="outlined"
					type="password"
					value={formValues.password}
					onChange={(e) => {
						handleChange({ password: e.target.value });
					}}
				/>
				{/* Submit Button */}
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					style={{ marginTop: "10px" }}
				>
					Create Account
				</Button>
				<b>
					Already have an account? <a href="/login">Sign in</a>
				</b>
			</div>
		</div>
	);
}

export default CreateUser;
