import React, { useEffect, useState } from "react";
import onCheck from "./utils";
import { userModel, userObservable } from "../../../models/userobserver";
import { Topic } from "../../../models/common";
import { capitalize } from "./utils";

function Interests(props: any) {    
    const [user, setUser] = useState(userModel);
    const [topics, setTopics] = useState(new Set<string>(user.topics));

    // Watch changes to shared userModel
    useEffect(() => {
        const subscription = userObservable.subscribe(setUser);
        return () => {
            // TODO: PUT updated data to the back-end API
            subscription.unsubscribe();
        }
    }, []);

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
