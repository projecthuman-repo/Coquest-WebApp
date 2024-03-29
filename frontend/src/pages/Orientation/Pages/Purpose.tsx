import React, { useEffect, useState } from "react";
import onCheck, { fetchEnumerable } from "./utils";
import { capitalize } from "./utils";
import { gql } from "graphql-request";

const motivesQuery = gql`
    query GetMotives {
        options: getMotives {
            name
        }
    }
`;

function Purpose(props: any) {
    const [options, setOptions] = useState<Array<string>>();
    const [motives, setMotives] = useState<Set<string>>(new Set(props.user.motives));

    useEffect(() => {
        fetchEnumerable(motivesQuery)
            .then(setOptions)
            .catch(error => {
                console.error(error);
            });
    }, []);

    if(options) {
        return (
            <div>
                <p>What brings you to Regenquest?</p>
                
                {options.map(
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
    } else {
        return null;
    }
}

export default Purpose;
