import React from "react";
import { styled } from "@mui/system";
//import ProgramPane from "./CoopPane";
//import { Program } from "../../../../models/programModel";
import CoopPane from "./CoopPane";
import { Coop } from "../../../../models/coopModel"

const Container = styled("div")({
	display: "flex",
	margin: "auto",
	marginTop: 40,
	width: "100%",
	alignItems: "center",
	flexDirection: "column",
	overflowY: "scroll",
	height: 600,
	"&::-webkit-scrollbar": {
		width: "5px",
	},
	"&::-webkit-scrollbar-thumb": {
		backgroundColor: "rgba(0,0,0,.38)",
		borderRadius: "4px",
	},
	"&::-webkit-scrollbar-track": {
		backgroundColor: "rgba(0,0,0,.15)",
		borderRadius: "4px",
	},
});

interface CoopProps {
	coopList: Coop[];
}
const Breaker = styled("hr")({
	height: 2,
	width: "90%",
});

const CoopListDisplay = (props: CoopProps) => {
	const validCoopList: Coop[] =
		props.coopList.filter(validateCoop);

	return (
		<Container>
			{validCoopList.map((coop, index) => {
				return (
					<React.Fragment key={index}>
						<CoopPane coop={coop} />
						{index + 1 <= props.coopList.length && (
							<Breaker></Breaker>
						)}
					</React.Fragment>
				);
			})}
		</Container>
	);
};
const validateCoop = (coop: Coop) => {
	if (
		coop === null ||
		coop.name === null ||
		coop.name === "" ||
		coop.description === null ||
		coop.description === ""
	) {
		return false;
	}
	return true;
};
export default CoopListDisplay;
