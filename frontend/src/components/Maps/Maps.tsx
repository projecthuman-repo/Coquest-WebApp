import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapsProps {
	lat?: number;
	long?: number;
	mapZoom?: number;
  }

  const Maps: React.FC<MapsProps> = ({ lat = 43.6514990607, long = -79.3834667995, mapZoom = 13 }) => {
	return (
		<MapContainer
			center={[lat, long]}
			zoom={mapZoom}
			scrollWheelZoom={false}
			style={{ height: '100%', width: '99%' }} // Ensure the map container has a defined height
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[51.505, -0.09]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
};

export default Maps;
