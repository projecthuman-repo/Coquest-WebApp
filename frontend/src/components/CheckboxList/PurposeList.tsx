import onCheck, { capitalize, fetchEnumerable } from "./utils";
import { useEffect, useRef, useState } from "react";
import './PurposeList.css';

function PurposeList(props: any) {
    const [options, setOptions] = useState<Array<string>>();
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchEnumerable(props.query)
            .then(setOptions)
            .catch(error => {
                console.error(error);
            });
    }, []);

    if(options) {
        return (
            <div>
                {options.map(
                    (option) => (
                        <div key={option} className="purpose">
                            <label htmlFor={option.toLowerCase()} className={`selection-option ${props.checkedData.has(option) ? 'selected' : ''}`}>
                                <input
                                    ref={input}
                                    className="checkbox-size"
                                    onChange={(e) => onCheck(props.setFuncs, props.checkedData, e)}
                                    type="checkbox"
                                    id={option.toLowerCase()}
                                    name={option}
                                    defaultChecked={props.checkedData.has(option)} />
                                {capitalize(option)}
                            </label>
                        </div>
                    )
                )}
            </div>
        );
    } else {
        return null;
    }

}

export default PurposeList;