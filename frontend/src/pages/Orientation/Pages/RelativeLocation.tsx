import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { fromAddress, fromLatLng } from 'react-geocode';
import setupGeocode from "../../../config/geocodeConfig";
import { userModel, userObservable } from "../../../models/userobserver";

const POSTAL_CODE_LEN = 7;
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
    
    const [user, setUser] = useState(userModel);
    const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
    const [inputError, setInputError] = useState(null);

    const [postalCode, setPostalCode] = useState("");
    useEffect(() => {
        if (user.location) {
            convertToPostal(user.location);
        }
    }, [user.location]);

    // Watch changes to shared userModel
    useEffect(() => {
        const subscription = userObservable.subscribe(setUser);
        return () => {
            // TODO: PUT updated data to the back-end API
            subscription.unsubscribe();
        }
    }, []);

    async function handlePostalCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newPostal = e.target.value.toUpperCase();
        setPostalCode(newPostal);

        if(postalCode.length === POSTAL_CODE_LEN) {
            fromAddress(postalCode)
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
        try {
            const {results} = await fromLatLng(loc.lat, loc.lng);
            const postal = results[0].address_components[8].long_name;
            setPostalCode(postal);
        } catch (err: any) {
            console.error("Geocoding error:", err.message);
            setInputError(err);
        }
    }

    return (
        <div>
            <p>Where is your community?</p>
            <InputMask mask="a9a 9a9"
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
        </div>
    );
}

export default RelativeLocation;
