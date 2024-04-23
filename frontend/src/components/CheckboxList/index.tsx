import onCheck, { capitalize, fetchEnumerable } from "./utils";
import { useEffect, useRef, useState } from "react";

function CheckboxList(props: any) {
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
                        <div className="select-container" key={option}>
                            <input
                                ref={input}
                                className="click-button"
                                onChange={(e) => onCheck(props.setFuncs, props.checkedData, e)}
                                type="checkbox"
                                id={option.toLowerCase()}
                                name={option}
                                defaultChecked={props.checkedData.has(option)} />
    
                            <label htmlFor={option.toLowerCase()}>{capitalize(option)}</label>
                        </div>
                    )
                )}
            </div>
        );
    } else {
        return null;
    }

}

export default CheckboxList;
