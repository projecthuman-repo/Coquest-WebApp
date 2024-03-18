import React, { useState } from "react";

const MAX_CHAR_COUNT = 1000;

function Bio(props: any) {
    const [biography, setBiography] = useState(props.user?.biography);

    function onEdit(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const newBio = e.target.value
        setBiography(newBio);
        props.updateData(newBio);
    }

    if(biography) {
        return (
            <div>
                <h1>Welcome to Regenquest&#44; {props.user?.name}</h1>
                <textarea
                    value={biography}
                    onChange={onEdit}
                    maxLength={MAX_CHAR_COUNT}>
                </textarea>
                <p>{biography.length}&nbsp;/&nbsp;{MAX_CHAR_COUNT}</p>
            </div>
        );
    } else {
        return null;
    }
}

export default Bio;