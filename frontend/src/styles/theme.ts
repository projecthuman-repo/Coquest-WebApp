import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: "#F3F3F3",
					color: "black",
				},
			},
			defaultProps: {
				position: "static",
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 10,
				},
			},
			defaultProps: {
				raised: true,
			},
		},
		MuiCardHeader: {
			styleOverrides: {
				subheader: {
					color: "black",
				},
			},
		},
		MuiToolbar: {
			styleOverrides: {
				root: {
					display: "flex",
					justifyContent: "end",
				},
			},
		},
		MuiStepLabel: {
			styleOverrides: {
				root: {
					"&.Mui-active": {
						color: "#4285F4",
					},
					"&.Mui-completed": {
						color: "white",
					},
				},
			},
		},
		MuiStepIcon: {
			styleOverrides: {
				root: {
					color: "#666666",
					"&.Mui-active": {
						color: "#4285F4",
					},
					"&.Mui-completed": {
						color: "#4285F4",
					},
				},
				active: {},
				completed: {},
			},
		},
	},
	typography: {
		fontFamily: "Poppins",
	},
});

export default theme;
