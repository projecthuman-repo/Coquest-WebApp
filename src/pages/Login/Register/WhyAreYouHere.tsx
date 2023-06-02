import {
    Button,
    Card,
    Checkbox,
    FormControlLabel,
    Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../../components/ProgressBar/index';
import CheckIcon from '@mui/icons-material/Check';

//styles for this page
const ButtonBack = styled(Button)({
    color: 'black',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 16,
    borderRadius: 30,
    marginLeft: 25,
    height: 40,
    padding: 0,
    marginRight: 25,
});
const ButtonNext = styled(Button)({
    backgroundColor: 'rgb(217, 217, 217)',
    color: 'black',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 16,
    borderRadius: 30,
    height: 40,
    paddingLeft: 40,
    paddingRight: 40,
    marginRight: 25,
});
const ButtonsContainer = styled.div`
    & :hover.bhEffect {
        background-color: rgb(233, 233, 233);
        color: black;
    }
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: 20px;
    margin-right: 100px;
`;
const Container = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    wwidth: '100%',
    flexDirection: 'column',
    textAlign: 'center',
});
const BodyContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 390,
    marginTop: 45,
});
const Text = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '15px',
    lineHeight: '18px',
    fontWeight: 600,
    color: '#000000',
    textTransform: 'none',
});

const Text1 = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '23px',
    lineHeight: '18px',
    fontWeight: 600,
    color: '#000000',
    marginBottom: 5,
});
const Text2 = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '15px',
    lineHeight: '18px',
    fontWeight: 410,
    color: '#000000',
    marginTop: 15,
});
const Text3 = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: 420,
    color: '#000000',
    marginTop: 35,
    marginBottom: 12,
});

const CardStyle = styled(Card)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
});

const OptionContainer = styled(FormControlLabel)({
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginRight: -11,
    paddingRight: 40,
});
const SelectionContainer = styled.div`
    & :hover.hEffect {
        background-color: rgb(233, 233, 233);
    }
    display: 'flex';
    flexdirection: 'column';
`;
const Check = styled(Checkbox)({ textAlign: 'left' });
const WhyAreYouHere = () => {
    //hooks for hovers
    const [hover0, sethover0] = useState(Boolean);
    const [hover1, sethover1] = useState(Boolean);
    const [hover2, sethover2] = useState(Boolean);
    const [hover3, sethover3] = useState(Boolean);
    const navigate = useNavigate();
    //functions for setting hover states
    const [checked, setChecked] = useState([true, false, false, false]);
    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked, checked[1], checked[2], checked[3]]);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([checked[0], event.target.checked, checked[2], checked[3]]);
    };
    const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([checked[0], checked[1], event.target.checked, checked[3]]);
    };
    const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([checked[0], checked[1], checked[2], event.target.checked]);
    };
    //list of buttons
    const children = (
        <SelectionContainer>
            <CardStyle>
                <OptionContainer
                    className='hEffect'
                    onMouseEnter={() => sethover0(true)}
                    onMouseLeave={() => sethover0(false)}
                    label='volunteer'
                    control={
                        <Check
                            style={{ textAlign: 'left' }}
                            checked={checked[0]}
                            onChange={handleChange1}
                            disableRipple
                            checkedIcon={
                                <CheckIcon
                                    style={{
                                        color: 'rgb(102,102,102)',
                                    }}
                                />
                            }
                            icon={
                                <CheckIcon
                                    style={
                                        hover0
                                            ? { color: 'rgb(233, 233, 233)' }
                                            : { color: 'white' }
                                    }
                                />
                            }
                        />
                    }
                />
            </CardStyle>
            <CardStyle>
                <OptionContainer
                    label='Create a project'
                    className='hEffect'
                    onMouseEnter={() => sethover1(true)}
                    onMouseLeave={() => sethover1(false)}
                    control={
                        <Check
                            disableRipple
                            checked={checked[1]}
                            onChange={handleChange2}
                            checkedIcon={
                                <CheckIcon
                                    style={{ color: 'rgb(102,102,102)' }}
                                />
                            }
                            icon={
                                <CheckIcon
                                    style={
                                        hover1
                                            ? { color: 'rgb(233, 233, 233)' }
                                            : { color: 'white' }
                                    }
                                />
                            }
                        />
                    }
                />
            </CardStyle>
            <CardStyle>
                <OptionContainer
                    label='Organize a community'
                    className='hEffect'
                    onMouseEnter={() => sethover2(true)}
                    onMouseLeave={() => sethover2(false)}
                    control={
                        <Check
                            disableRipple
                            checked={checked[2]}
                            onChange={handleChange3}
                            checkedIcon={
                                <CheckIcon
                                    style={{ color: 'rgb(102,102,102)' }}
                                />
                            }
                            icon={
                                <CheckIcon
                                    style={
                                        hover2
                                            ? { color: 'rgb(233, 233, 233)' }
                                            : { color: 'white' }
                                    }
                                />
                            }
                        />
                    }
                />
            </CardStyle>
            <CardStyle>
                <OptionContainer
                    label='Spectate'
                    className='hEffect'
                    onMouseEnter={() => sethover3(true)}
                    onMouseLeave={() => sethover3(false)}
                    control={
                        <Check
                            checked={checked[3]}
                            onChange={handleChange4}
                            disableRipple
                            checkedIcon={
                                <CheckIcon
                                    style={{ color: 'rgb(102,102,102)' }}
                                />
                            }
                            icon={
                                <CheckIcon
                                    style={
                                        hover3
                                            ? { color: 'rgb(233, 233, 233)' }
                                            : { color: 'white' }
                                    }
                                />
                            }
                        />
                    }
                />
            </CardStyle>
        </SelectionContainer>
    );
    return (
        <Container>
            <ProgressBar index={3} />
            <ButtonsContainer>
                <ButtonBack
                    className='bhEffect'
                    onClick={() => {
                        navigate('/LetGetYouStarted');
                    }}
                >
                    {'<'} Back
                </ButtonBack>
                <ButtonNext
                    className='bhEffect'
                    variant='contained'
                    disableElevation
                    onClick={() => {
                        navigate('/Interests');
                    }}
                >
                    Next
                </ButtonNext>
            </ButtonsContainer>
            <BodyContainer>
                <Text1>Let's get you stitched in.</Text1>
                <Text2>What brings you to Regenquest?</Text2>
                <Text3>Select all that apply.</Text3>
                {children}
            </BodyContainer>
        </Container>
    );
};

export default WhyAreYouHere;
