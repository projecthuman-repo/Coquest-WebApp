import React, { useEffect, useState, useRef } from "react";
import onCheck, { fetchEnumerable } from "./utils";
import { capitalize } from "./utils";
import './Interests.css';
import { topicsQuery } from "../../../apiInterface/gqlOperations";

function Interests(props: any) {
    const [options, setOptions] = useState<Array<string>>();
    const [topics, setTopics] = useState(new Set<string>(props.user.topics));
    const input = useRef<HTMLInputElement>(null);

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
                <input type="search" className="search" name="search" />
                <i className="fa-solid fa-magnifying-glass"></i>

                {options.map(
                        (topic) => (
                            <div className="select-container" key={topic}>
                                <input
                                    ref={input}
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
