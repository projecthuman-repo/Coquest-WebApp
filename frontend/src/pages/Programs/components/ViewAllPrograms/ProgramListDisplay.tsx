import React from "react";
import { styled } from "@mui/system";
import ProgramPane from "./ProgramPane";
import { Program } from "../../../../models/programModel";

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

interface ProgramProps {
	programList: Program[];
}
const Breaker = styled("hr")({
	height: 2,
	width: "90%",
});

function ProgramListDisplay(props: ProgramProps) {
	const validProgramList: Program[] =
		props.programList.filter(validateProgram);

	return (
		<Container>
			{validProgramList.map((program, index) => {
				return (
					<React.Fragment key={index}>
						<ProgramPane program={program} />
						{index + 1 <= props.programList.length && (
							<Breaker></Breaker>
						)}
					</React.Fragment>
				);
			})}
		</Container>
	);
}

function validateProgram(program: Program) {
	if (
		program === null ||
		program.name === null ||
		program.name === "" ||
		program.summary === null ||
		program.summary === ""
	) {
		return false;
	}
	return true;
}
export default ProgramListDisplay;
