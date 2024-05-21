import React, { useState } from "react";
import './Purpose.css';
import { motivesQuery } from "../../../apiInterface/gqlOperations";
import PurposeList from "../../../components/CheckboxList";

function Purpose(props: any) {
    const [motives, setMotives] = useState<Set<string>>(new Set(props.user.motives));

    return (
        <div className="purpose-page">
            <h3 className="main-heading">Let's get you stitched in.</h3>
            <p className="sub-heading">What brings you to Coquest? Select all that apply.</p>
            <br />
            <p>I am a...</p>
            <PurposeList setFuncs={[setMotives, props.updateData]} checkedData={motives} query={motivesQuery} />
        </div>
    );
}

export default Purpose;
