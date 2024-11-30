import React, { useState } from "react";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { InputBase } from "@mui/material";

const SearchBarContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	"& button:hover": {
		backgroundColor: "#DDDDDD",
	},
});

const SearchIconWrapper = styled("div")({
	color: "#666666",
	marginRight: "19.5px",
	marginLeft: "8px",
	display: "flex",
	alignItems: "center",
});

const SearchInputContainer = styled("div")({
	padding: 8,
	display: "flex",
	alignItems: "center",
	border: "1px solid rgba(0, 0, 0, 0.23)",
	borderRadius: 4,
});

interface LocationSearchProps {
	onChange: (location: string) => void;
	value?: string;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
	onChange,
	value = "",
}) => {
	const { isLoaded } = useLoadScript({
		libraries: ["places"],
		googleMapsApiKey: "" + import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
	});

	const [autocomplete, setAutocomplete] = useState<any>(null);

	const onLoad = (autocomplete: any) => {
		setAutocomplete(autocomplete);
	};

	const handleLocationChange = () => {
		if (autocomplete) {
			onChange(autocomplete.getPlace().formatted_address);
		}
	};

	if (!isLoaded) return <div className="">loading...</div>;
	return (
		<SearchBarContainer>
			<Autocomplete onLoad={onLoad} onPlaceChanged={handleLocationChange}>
				<SearchInputContainer>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<InputBase
						defaultValue={value}
						placeholder="Search location"
						className="placeholder-mod"
						style={{ width: "95%" }}
						inputProps={{ "aria-label": "search" }}
					/>
				</SearchInputContainer>
			</Autocomplete>
		</SearchBarContainer>
	);
};

export default LocationSearch;
