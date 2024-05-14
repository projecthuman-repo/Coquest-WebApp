import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { fromAddress, fromLatLng } from 'react-geocode';
import setupGeocode from "../../../config/geocodeConfig";

const POSTAL_CODE_LEN = 6;
const MAP_ZOOM_LEVEL = 11;

const mapContainerStyle = {
    width: '400px',
    height: '400px'
};

function RelativeLocation(props: any) {
    useEffect(() => {
        setupGeocode();
    }, []);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!
      })

    const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
    // GeolocationPositionError does not have a `name` property.
    const [inputError, setInputError] = useState<Omit<Error, 'name'> | null>(null);

    const [postalCode, setPostalCode] = useState("");
    useEffect(() => {
        if (props.user.location) {
            convertToPostal(props.user.location)
                .then((postal) => {
                    if(postal.length === POSTAL_CODE_LEN) {
                        setCenter(props.user.location);
                        setPostalCode(postal);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            getBrowserLocation();
        }
    }, [props.user.location]);

    const getBrowserLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {lat: position.coords.latitude, lng: position.coords.longitude};
                    convertToPostal(coords)
                        .then((postal) => {
                            setCenter(coords);
                            setPostalCode(postal);
                            props.updateData(coords);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                },
                (error) => {
                    console.error(error.message);
                    setInputError(error);
                }
            )
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    async function handlePostalCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newPostal = e.target.value.toUpperCase();
        setPostalCode(newPostal);

        // Note: Cannot use stateful postal code data after setting it
        if(newPostal.length === POSTAL_CODE_LEN) {
            fromAddress(newPostal)
            .then((res) => {
                const loc = res.results[0].geometry.location;
                console.log(`Using the following coordinates: lat: ${loc.lat}, lng:${loc.lng}`);
                setCenter(loc);
                props.updateData(loc);
                setInputError(null);
            }).catch((err) => {
                console.error("Geocoding error:", err.message);
                setInputError(err);
            });
        }
    }

    // 
    async function convertToPostal(loc: {lat: number, lng: number}) {
        let postal = "";
        try {
            const {results} = await fromLatLng(loc.lat, loc.lng);
            // Find commponent that has postal code information
            const index = results[0].address_components.findIndex((component: any) => {
                return component.types.includes('postal_code');
            });
            if(index >= 0) {
                postal = results[0].address_components[index].long_name.replace(" ", "");
            }
        } catch (err: any) {
            console.error("Geocoding error:", err.message);
            setInputError(err);
        }
        return postal;
    }

    return (
        <div>
            <p>Where is your community?</p>
            {/* TODO: Find out how to place a space in the middle of the postal code mask without introducing inconsistencies */}
            <InputMask mask="a9a9a9"
                maskChar={null}
                value={postalCode}
                onChange={handlePostalCodeChange}
                alt="Postal code"
                title="Postal code input"
                placeholder="Enter your postal code"
                type="text"
            />
                {isLoaded && postalCode.length === POSTAL_CODE_LEN && !inputError && (              
                        <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={MAP_ZOOM_LEVEL}
                        >
                            {/* Dynamic map content */}
                        </GoogleMap>
                )}
                {postalCode.length === POSTAL_CODE_LEN && inputError && (
                    <p>Please insert a valid postal code</p>
                )}

                <button onClick={getBrowserLocation}>Get&nbsp;Current&nbsp;Location</button>
        </div>
    );
}

export default RelativeLocation;
