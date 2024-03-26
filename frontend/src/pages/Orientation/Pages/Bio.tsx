import React, { useEffect, useState } from "react";
import { userModel, userObservable } from "../../../models/userobserver";

const MAX_CHAR_COUNT = 1000;

function Bio(props: any) {
    const [user, setUser] = useState(userModel);
    const [biography, setBiography] = useState(user.biography);

    // Watch changes to shared userModel
    useEffect(() => {
        const subscribtion = userObservable.subscribe(setUser);
        return () => {
            // TODO: PUT updated data to the back-end API
            subscribtion.unsubscribe();
        }
    }, []);

    function onEdit(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const newBio = e.target.value
        setBiography(newBio);
        props.updateData(newBio);
    }

    return (
        <div>
            <h1>Welcome to Regenquest&#44; {userModel.name}</h1>
            <textarea
                value={biography}
                onChange={onEdit}
                maxLength={MAX_CHAR_COUNT}>
            </textarea>
            <p>{biography.length}&nbsp;/&nbsp;{MAX_CHAR_COUNT}</p>
        </div>
    );
}

export default Bio;