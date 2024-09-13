import React from "react";
import { Box, Button, Typography, Link } from "@mui/material";
import "./index.css";

const PrivacySecurity = () => {
	return (
		<Box className="privacy-security-section">
			<Typography
				variant="h4"
				sx={{ fontWeight: "bold", marginBottom: "20px" }}
			>
				Privacy and security
			</Typography>
			<Button
				variant="outlined"
				sx={{
					borderRadius: "20px",
					padding: "8px 16px",
					textTransform: "none",
					borderColor: "#000",
					color: "#000",
					fontWeight: "bold",
					marginBottom: "30px",
					"&:hover": {
						borderColor: "#000",
						backgroundColor: "#f5f5f5",
					},
				}}
			>
				Change password
			</Button>
			<Box
				className="two-factor-authentication"
				sx={{ display: "flex", alignItems: "center" }}
			>
				<Typography
					variant="body1"
					sx={{ fontWeight: "bold", marginRight: "10px" }}
				>
					Two-factor authentication
				</Typography>
				<Link
					href="#"
					underline="hover"
					sx={{ fontSize: "14px", color: "#333" }}
				>
					Change
				</Link>
			</Box>
			<Box className="phone-number" sx={{ marginTop: "10px" }}>
				<Typography
					variant="body2"
					sx={{ fontWeight: "bold", color: "#333" }}
				>
					Phone number
				</Typography>
				<Typography
					variant="body2"
					sx={{ color: "#333", marginLeft: "50px" }}
				>
					111-111-1111
				</Typography>
			</Box>
		</Box>
	);
};

export default PrivacySecurity;
