import React, { useState } from "react";
import './Bio.css';
import BackButton from "../../../components/Buttons/BackButton";

const MAX_CHAR_COUNT = 1000;

function Bio(props: any) {
    const [biography, setBiography] = useState(props.user?.biography);

    function onEdit(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const newBio = e.target.value
        setBiography(newBio);
        props.updateData(newBio);
    }

    // Explicity check for empty string as TS treats empty strings as falsy
    if(biography || biography === "") {
        return (
            <div className="bio-page">
                <h3 className="main-heading">Welcome to Regenquest&#44; {props.user?.name}</h3>
                <h4>Let's get to know you</h4>

                <textarea
                    className="bio-input"
                    placeholder="Add your bio"
                    value={biography}
                    onChange={onEdit}
                    maxLength={MAX_CHAR_COUNT}>
                </textarea>
                <p>{biography.length}&nbsp;/&nbsp;{MAX_CHAR_COUNT}</p>
                <input type="text" className="location-input" placeholder="Location"></input>
                <div>
                    <BackButton />
                    {/* <button className="back-button" onClick={() => props.prevPage()}>Back</button>
                    <button className="skip-button" onClick={() => props.nextPage()}>Skip</button>
                    <button className="next-button" type="submit" onClick={() => props.nextPage()}>Next</button> */}
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default Bio;