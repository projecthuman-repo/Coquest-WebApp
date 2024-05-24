import React, { useState } from "react";
import { motivesQuery } from "../../../apiInterface/gqlOperations";
import PurposeList from "../../../components/CheckboxList/PurposeList";
import '../Orientation.css';
import './Purpose.css';

function Purpose(props: any) {
    const [motives, setMotives] = useState<Set<string>>(new Set(props.user.motives));

    return (
        <div className="purpose-page">
            <h3 className="main-heading">Let’s get you stitched in.</h3>
            <br />
            <p className="sub-heading">Find your team. What brings you to Regenquest? I am a...</p>
            <br />
            <small>Select all that apply.</small>
            <br />
            <PurposeList setFuncs={[setMotives, props.updateData]} checkedData={motives} query={motivesQuery} />
        </div>
    );
}

export default Purpose;
