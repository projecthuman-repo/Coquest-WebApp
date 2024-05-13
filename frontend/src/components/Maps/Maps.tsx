import React from "react";
import styled from "@emotion/styled";

//container that holds the map data
const MapContainer = styled.div({
	width: "100%",
	height: "100%",
	maxWeight: "100%",
	radius: "10px",
});

const Maps = () => {
	return (
		<MapContainer>
			<img
				style={{
					width: "100%",
					height: "95.7%",
					borderRadius: "10px",
					objectFit: "cover",
				}}
				src="/map_image.png"
				alt="Map graphic"
			/>
		</MapContainer>
	);
};

export default Maps;
