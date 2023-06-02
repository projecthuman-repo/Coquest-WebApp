import { Box, Step, StepLabel, Stepper } from '@mui/material';

type Props = {
    index?: number;
};
const steps = [
    'Sign up',
    'Connect social media',
    'Customize profile',
    'Join groups',
];
//progress bar feature
const ProgressBar = ({ index }: Props) => {
    return (
        <Box sx={{ width: '52%', marginTop: 3 }}>
            <Stepper activeStep={index}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default ProgressBar;
