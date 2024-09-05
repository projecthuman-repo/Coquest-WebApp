import React, { useState } from "react";
import {
	GoogleMap,
	useLoadScript,
	Marker,
	Autocomplete,
	Circle,
} from "@react-google-maps/api";
import styled from "@emotion/styled";
import { Grid, InputBase, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInputContainer = styled("div")({
	display: "flex",
	width: "95%",
	flexDirection: "row-reverse",
	alignItems: "center",
	border: "1px solid black",
	borderRadius: 28,
	overflow: "scroll",
	"::-webkit-scrollbar": {
		display: "none",
	},
});
const SearchIconWrapper = styled("div")({
	margin: 8,
	fontSize: 12,
	color: "#666666",
});

const MapInputContainer = styled(Grid)({
	display: "flex",
	alignItems: "center",
});

const Spacer = styled("div")({
	width: "100%",
	height: 19,
});

const SelectContainer = styled(Select)({
	width: "100%",
});

const MapComponent = () => {
	const { isLoaded } = useLoadScript({
		libraries: ["places"],
		googleMapsApiKey: "" + import.meta.env.VITE_GOOGLE_PLACES_API,
	});

	const [autocomplete, setAutocomplete] = useState<any>(null);
	const [mapCenter, setMapCenter] = useState({
		lat: 49.276583,
		lng: -123.069179,
	});
	const [radius, setRadius] = useState(20000);

	const onLoad = (autocomplete: any) => {
		setAutocomplete(autocomplete);
	};
	// 49.276573, -123.069510

	const onPlaceChanged = () => {
		if (autocomplete !== null) {
			//   const place = autocomplete.getPlace();
			const place = {
				geometry: {
					location: {
						lat: () => {
							return 49.276583;
						},
						lng: () => {
							return -123.069179;
						},
					},
				},
			};
			setMapCenter({
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng(),
			});
		}
	};

	const handleRadiusChange = (event: any) => {
		setRadius(event.target.value);
	};
	if (!isLoaded) return <div className="">loading map...</div>;
	return (
		<>
			<MapInputContainer container spacing={0}>
				<Grid item xs={10}>
					<Autocomplete
						onLoad={onLoad}
						onPlaceChanged={onPlaceChanged}
					>
						<SearchInputContainer>
							<InputBase
								placeholder="Search location"
								className="placeholder-mod"
								style={{ width: "95%" }}
								inputProps={{ "aria-label": "search" }}
							/>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
						</SearchInputContainer>
					</Autocomplete>
				</Grid>
				<Grid item xs={2}>
					<SelectContainer
						value={radius}
						label="Radius"
						className="placeholder-mod"
						onChange={handleRadiusChange}
					>
						<MenuItem value={0}>Off</MenuItem>
						<MenuItem value={500}>0.5 km</MenuItem>
						<MenuItem value={1000}>1 km</MenuItem>
						<MenuItem value={5000}>5 km</MenuItem>
						<MenuItem value={10000}>10 km</MenuItem>
						<MenuItem value={20000}>20 km</MenuItem>
						<MenuItem value={50000}>50 km</MenuItem>
					</SelectContainer>
				</Grid>
			</MapInputContainer>
			<Spacer />
			<Map center={mapCenter} radius={radius} />
		</>
	);
};

export default MapComponent;

function Map(props: any) {
	return (
		<GoogleMap
			zoom={16}
			center={props.center}
			mapContainerClassName="map-styling"
		>
			<Circle
				options={{
					strokeOpacity: 0,
					strokeWeight: 2,
					fillOpacity: 0.2,
					editable: false,
					zIndex: 1,
				}}
				center={props.center}
				radius={props.radius}
			/>
			<Marker position={props.center} />
		</GoogleMap>
	);
}
