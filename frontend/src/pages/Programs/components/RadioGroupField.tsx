import React, { ReactNode } from "react";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
    Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export interface RadioOption {
    value: string;
    label: string;
}

export interface RadioGroupProps {
    label: string | ReactNode;
    explanation?: ReactNode;
    value: string;
    name: string;
    options: RadioOption[];
    onChange: (value: string) => void;
}

export const RadioGroupField = ({
    label,
    explanation,
    value,
    name,
    options,
    onChange,
}: RadioGroupProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = (event.target as HTMLInputElement).value;
        onChange(newValue);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel
                component="legend"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Typography sx={{ color: "black" }}>{label}</Typography>
                {explanation && (
                    <Tooltip
                        title={explanation}
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    bgcolor: "white",
                                    color: "black",
                                    border: "1px solid rgba(0, 0, 0, 0.23)",
                                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                                    fontSize: "0.875rem",
                                    padding: "20px 30px",
                                    fontFamily: "inherit",
                                },
                            },
                            arrow: {
                                sx: {
                                    display: "none",
                                },
                            },
                        }}
                    >
                        <InfoIcon
                            fontSize="small"
                            color="disabled"
                            style={{ marginLeft: 4, cursor: "help" }}
                        />
                    </Tooltip>
                )}
            </FormLabel>
            <RadioGroup
                aria-label={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio color="default" />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};