import React, { useEffect, useState } from "react";
import onCheck, { fetchEnumerable } from "./utils";
import { capitalize } from "./utils";
import { gql } from "graphql-request";
import './Purpose.css';

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
            <div className="purpose-page">
                <h3 className="main-heading">Let's get you stiched in</h3>
                <p className="sub-heading">Find your team. What brings you to Regenquest?</p>
                <p className="sub-text">Select all that apply</p>
                
                {options.map(
                        (motive) => (
                            <div className="select-container" key={motive}>
                                <input
                                    className="click-button"
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
