import React, { useEffect, useState } from "react";
import onCheck, { fetchEnumerable } from "./utils";
import { capitalize } from "./utils";
import { gql } from "graphql-request";
import './Interests.css';

const topicsQuery = gql`
    query GetTopics {
        options: getTopics {
            name
        }
    }
`;

function Interests(props: any) {
    const [options, setOptions] = useState<Array<string>>();
    const [topics, setTopics] = useState(new Set<string>(props.user.topics));

    useEffect(() => {
        fetchEnumerable(topicsQuery)
            .then(setOptions)
            .catch(error => {
                console.error(error);
            });
    }, []);

    if(options) {
        return (
            <div className="interests-page">
                <h3 className="main-heading">Let's get you stiched in</h3>
                <p className="sub-heading">What are your interests?</p>
                <p className="sub-text">Select all that apply</p>
                
                {options.map(
                        (topic) => (
                            <div className="select-container" key={topic}>
                                <input
                                    className="click-button"
                                    onChange={(e) => onCheck([setTopics, props.updateData], topics, e)}
                                    type="checkbox"
                                    id={topic.toLowerCase()}
                                    name={topic}
                                    defaultChecked={topics.has(topic)} />

                                <label htmlFor={topic.toLowerCase()}>{capitalize(topic)}</label>
                            </div>
                        )
                    )}
            </div>
        );
    } else {
        return null;
    }
}

export default Interests;
