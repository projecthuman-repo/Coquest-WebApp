import React, { useEffect, useState } from "react";
import onCheck, { fetchEnumerable } from "./utils";
import { capitalize } from "./utils";
import { gql } from "graphql-request";

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
            <div>
                <p>What are your interests?</p>
                
                {options.map(
                        (topic) => (
                            <div key={topic}>
                                <input
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
