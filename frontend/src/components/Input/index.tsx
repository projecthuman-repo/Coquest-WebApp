import React from "react";
import "./index.css";

type InputProps = {
	label: string;
	children: React.ReactNode;
};

/*
    * Input component that takes in a label and children
    * children can be:
        * <input> or <textarea> (height and resize options should be set manually)
        * <small className="char-count"> if a character count is needed
        * any other elements (styling should be set manually)
    * for input elements, placeholder must exist to work properly but should be given no value (label will be shown in place)

    <Input label="Field Label">
        <input type="text" placeholder="" value={somevalue} onChange={onValueChange} />
    </Input>
*/

const Input = (props: InputProps) => {
	return (
		<div className="input-container">
			{props.children}
			<label className="input-label">{props.label}</label>
		</div>
	);
};

export default Input;
