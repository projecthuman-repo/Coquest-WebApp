import React, { useState } from "react";
import '../Orientation.css';
import './Bio.css';


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
                <h3 className="main-heading">Welcome to Coquest&#44; {props.user?.name}!</h3>
                <br></br>
                <p className="sub-heading">Let's get to know you.</p>

                <br></br>
                <br></br>

                <div className="bio-wrapper">
                    <textarea
                        className="bio-input"
                        placeholder="Add your bio"
                        value={biography}
                        onChange={onEdit}
                        maxLength={MAX_CHAR_COUNT}>
                    </textarea>
                    <small className="char-count">{biography.length}&nbsp;/&nbsp;{MAX_CHAR_COUNT}</small>
                </div>

                <br></br>

                <div className="location-input">
                    <input type="text" placeholder="Location"></input>
                    <img src="/icons/location.png" height="20" alt="Location Icon"></img>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default Bio;