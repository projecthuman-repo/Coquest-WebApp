import React from "react";
import { Typography } from "@mui/material";

type TextProps = {
	text: string;
};

const Header = ({ text }: TextProps) => (
	<Typography
		fontSize={30}
		fontWeight={600}
		lineHeight={1.5}
		variant="h1"
		style={{ display: "flex", justifyContent: "center" }}
	>
		{text}
	</Typography>
);

export default Header;
