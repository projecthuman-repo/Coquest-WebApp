import React, { useRef, useState } from "react";
import { Button, TextField, Tooltip } from "@mui/material";
import styled from "@emotion/styled";

const Sharelink: React.FC = () => {
	const [isCopied, setIsCopied] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleCopyClick = () => {
		if (inputRef.current) {
			inputRef.current.select();
			document.execCommand("copy");
			setIsCopied(true);
		}
	};

	const Container = styled.div({
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	});

	const Sharelink = styled(TextField)({
		width: 550,
	});

	const CopyButton = styled(Button)({
		borderRadius: 30,
		width: 120,
		height: 35,
		justifyContent: "start",
		textTransform: "none",
	});

	return (
		<Container>
			<Sharelink
				label="Sharelink"
				defaultValue="sharelink.com/program"
				inputRef={inputRef}
			/>
			<Tooltip title={isCopied ? "Copied!" : "Copy"}>
				<CopyButton
					color="inherit"
					variant="outlined"
					onClick={handleCopyClick}
					aria-label="copy text"
				>
					Copy
				</CopyButton>
			</Tooltip>
		</Container>
	);
};

export default Sharelink;
