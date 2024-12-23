import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import { LoginUserInput } from "@/__generated__/graphql";
import { Button } from "@mui/material";
import graphQLClient from "@/apiInterface/client";
import { LOGIN_USER_MUTATION } from "@/apiInterface/gqlOperations";
import { useUserRegistration } from "@/components/AutoRedirector/UserRegistration";

function Login() {
	const navigate = useNavigate();
	const { setAuthenticated } = useUserRegistration();
	const loginInput: LoginUserInput = {
		usernameOrEmail: "",
		password: "",
	};
	const [loginData, setLoginData] = useState(loginInput);

	const handleChange = (data: Partial<typeof loginInput>) => {
		setLoginData({ ...loginData, ...data });
	};

	const handleSubmit = async () => {
		await graphQLClient
			.request(LOGIN_USER_MUTATION, {
				userInput: loginData,
			})
			.then(() => {
				setAuthenticated(true);
				navigate("../", { replace: true });
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
					label="Email or Username"
					variant="outlined"
					value={loginData.usernameOrEmail}
					onChange={(e) =>
						handleChange({ usernameOrEmail: e.target.value })
					}
				/>
				<TextField
					label="Password"
					variant="outlined"
					type="password"
					value={loginData.password}
					onChange={(e) => handleChange({ password: e.target.value })}
				/>
				{/* Submit Button */}
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					style={{ marginTop: "10px" }}
				>
					Login
				</Button>
				<b>
					Don&apos;t have an acccount? <a href="/create">Sign up</a>
				</b>
			</div>
		</div>
	);
}

export default Login;
