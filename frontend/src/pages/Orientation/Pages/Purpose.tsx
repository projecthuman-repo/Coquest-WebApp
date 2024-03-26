import React, { useEffect, useState } from "react";
import onCheck from "./utils";
import { userModel, userObservable } from "../../../models/userobserver";
import { Motive } from "../../../models/common";
import { capitalize } from "./utils";

function Purpose(props: any) {
    const [user, setUser] = useState(userModel);
    const [motives, setMotives] = useState<Set<string>>(new Set(user.motives));

    // Watch changes to shared userModel
    useEffect(() => {
        const subscribtion = userObservable.subscribe(setUser);
        return () => {
            // TODO: PUT updated data to the back-end API
            subscribtion.unsubscribe();
        }
    }, []);

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
