import React from "react";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
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
					width: "100%",
					display: "flex",
					justifyContent: "end",
				}}
			>
				<Button
					style={{
						color: "black",
						fontWeight: 700,
						textTransform: "none",
						fontSize: 16,
						borderRadius: 30,
					}}
				>
					{"<"} Back
				</Button>
				<Button
					variant="contained"
					disableElevation
					style={{
						backgroundColor: "rgb(217, 217, 217)",
						color: "black",
						fontWeight: 700,
						textTransform: "none",
						fontSize: 16,
						borderRadius: 30,
					}}
				>
					Next
				</Button>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "300px",
					gap: 10,
				}}
			>
				<b style={{ fontSize: 24 }}>Sign up with social media</b>

				<div
					style={{
						display: "flex",
						gap: 20,
						justifyContent: "center",
					}}
				>
					<div
						style={{
							height: 50,
							width: 50,
							border: "1px solid black",
						}}
					>
						F
					</div>
					<div
						style={{
							height: 50,
							width: 50,
							border: "1px solid black",
						}}
					>
						T
					</div>
					<div
						style={{
							height: 50,
							width: 50,
							border: "1px solid black",
						}}
					>
						I
					</div>
					<div
						style={{
							height: 50,
							width: 50,
							border: "1px solid black",
						}}
					>
						G
					</div>
				</div>

				<Divider>or sign up with your email</Divider>
				<TextField label="Full name" variant="outlined" />
				<TextField label="Email" variant="outlined" />
				<TextField label="Username" variant="outlined" />
				<TextField
					label="Password"
					variant="outlined"
					type="password"
				/>
				<b>
					Already have an account? <a href="#">Sign in</a>
				</b>
			</div>
		</div>
	);
}

export default Login;
