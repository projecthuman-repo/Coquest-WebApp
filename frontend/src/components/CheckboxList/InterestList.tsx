import onCheck, { capitalize, fetchEnumerable } from "./utils";
import { useEffect, useRef, useState } from "react";
import './InterestList.css';

function InterestList(props: any) {
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
            <div className="interests-wrapper">
                {options.map(
                    (option) => (
                        <div key={option} className="interest">
                            <label htmlFor={option.toLowerCase()} className={`selection-option ${props.checkedData.has(option) ? 'selected' : ''}`}>
                                <input
                                    ref={input}
                                    className="checkbox-size"
                                    onChange={(e) => onCheck(props.setFuncs, props.checkedData, e)}
                                    type="checkbox"
                                    id={option.toLowerCase()}
                                    name={option}
                                    defaultChecked={props.checkedData.has(option)} />
                                <img src="/icons/checkmark.png" className={`checkmark ${props.checkedData.has(option) ? '' : 'hidden'}`} alt="checkmark" height="12" />
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

export default InterestList;