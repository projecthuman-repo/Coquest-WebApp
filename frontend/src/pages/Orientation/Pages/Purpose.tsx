import React, { useState } from "react";
import onCheck from "./utils";
import { Motive } from "../../../models/common";
import { capitalize } from "./utils";

function Purpose(props: any) {
    const [motives, setMotives] = useState<Set<string>>(new Set(props.user.motives));

    return (
        <div>
            <p>What brings you to Regenquest?</p>
            
            {Object.values(Motive).map(
                    (motive) => (
                        <div key={motive}>
                            <input
                            onChange={(e) => onCheck([setMotives, props.updateData], motives, e)}
                            type="checkbox"
                            id={motive.toLowerCase()}
                            name={motive}
                            defaultChecked={motives.has(motive)} />

                            <label htmlFor={motive.toLocaleLowerCase()}>{capitalize(motive)}</label>
                        </div>
                    )
                )}
        </div>
    );
}

export default Purpose;
