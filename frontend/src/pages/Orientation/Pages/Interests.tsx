import React, { useState } from "react";
import onCheck from "./utils";
import { Topic } from "../../../models/common";
import { capitalize } from "./utils";

function Interests(props: any) {
    const [topics, setTopics] = useState(new Set<string>(props.user.topics));

    return (
        <div>
            <p>What are your interests?</p>
            
            {Object.values(Topic).map(
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
}

export default Interests;
