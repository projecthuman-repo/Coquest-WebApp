import React, { useState } from "react";
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	Circle,
} from "@react-google-maps/api";
import styled from "@emotion/styled";
import { Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import LocationSearch from "./LocationSearch";
import { Location } from "@/models/programModel";

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

interface LatLng {
	lat: number;
	lng: number;
}

interface MapComponentProps {
	promotionArea: Location | null;
	setPromotionArea: (location: Location | null) => void;
	radius: number | null;
	setRadius: (radius: number | null) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
	promotionArea,
	setPromotionArea,
	radius,
	setRadius,
}) => {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries: ["places"],
	});

	const [autocomplete, setAutocomplete] =
		useState<google.maps.places.Autocomplete | null>(null);
	const [mapCenter, setMapCenter] = useState<LatLng>({
		lat: 43.65107,
		lng: -79.347015,
	});
	const [zoom, setZoom] = useState<number>(10);

	const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
		setAutocomplete(autocompleteInstance);
	};

	const onPlaceChanged = () => {
		if (autocomplete) {
			const place = autocomplete.getPlace();
			if (place?.geometry?.location) {
				const location = {
					name: place.name || "",
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng(),
				};
				setMapCenter({ lat: location.lat, lng: location.lng });
				setPromotionArea(location);
				setRadius(radius);
			}
		}
	};

	const handleRadiusChange = (event: SelectChangeEvent<unknown>) => {
		const newRadius = parseInt(event.target.value as string, 10);
		const radiusToZoomMap = [
			{ radius: 0, zoom: 16 },
			{ radius: 500, zoom: 17 },
			{ radius: 1000, zoom: 16 },
			{ radius: 5000, zoom: 14 },
			{ radius: 10000, zoom: 13 },
			{ radius: 20000, zoom: 12 },
			{ radius: 50000, zoom: 10 },
		];

		const selectedZoom =
			radiusToZoomMap.find((r) => r.radius === newRadius)?.zoom || 16;

		setZoom(selectedZoom);
		setRadius(newRadius);

		if (promotionArea) {
			setPromotionArea(promotionArea);
			setRadius(newRadius);
		} else {
			setPromotionArea({
				name: "",
				lat: mapCenter.lat,
				lng: mapCenter.lng,
			});
			setRadius(newRadius);
		}
	};

	if (!isLoaded) return <div>Loading map...</div>;

	return (
		<>
			<MapInputContainer container spacing={1}>
				<Grid item xs={10}>
					<LocationSearch
						onLoad={onLoad}
						handleLocationChange={onPlaceChanged}
					/>
				</Grid>
				<Grid item xs={2}>
					<SelectContainer
						value={radius}
						label="Radius"
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
			<Map center={mapCenter} radius={radius || 50000} zoom={zoom} />
		</>
	);
};

interface MapProps {
	center: LatLng;
	radius: number;
	zoom: number;
}

const Map: React.FC<MapProps> = ({ center, radius, zoom }) => {
	return (
		<GoogleMap
			zoom={zoom}
			center={center}
			mapContainerClassName="map-styling"
		>
			<Circle
				options={{
					strokeOpacity: 0.5,
					strokeWeight: 2,
					fillOpacity: 0.2,
					editable: false,
					zIndex: 1,
				}}
				center={center}
				radius={radius}
			/>
			<Marker position={center} />
		</GoogleMap>
	);
};

export default MapComponent;
