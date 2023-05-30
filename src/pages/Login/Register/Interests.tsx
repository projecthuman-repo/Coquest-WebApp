import { Button, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import link from '@mui/material/Link';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProgressBar from '../../../components/ProgressBar/index';
import SearchBar from '../../../components/SearchBar/Searchbar';
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
    width: '100%',
    flexDirection: 'column',
    textAlign: 'center',
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
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 400.9,
    color: '#000000',
    marginTop: 10,
    marginBottom: 12,
});

const Text3 = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: 420,
    color: '#000000',
    marginTop: 10,
    marginBottom: 12,
});

const BodyContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
});
const Interests = () => {
    const navigate = useNavigate();
    //hook for search item
    const [searchTerm, setSearchTerm] = useState('');
    //hook for array of items that are already selected
    const [AlreadyChecked, setAlreadyChecked] = useState<string[]>([]);
    //to disabled the next button if selection is less than or equal to 3
    const [disabled, setDisabled] = useState(Boolean);
    return (
        <Container>
            <ProgressBar index={3} />
            <ButtonsContainer>
                <ButtonBack
                    className='bhEffect'
                    onClick={() => {
                        navigate('/WhyAreYouHere');
                    }}
                >
                    {'<'} Back
                </ButtonBack>
                <ButtonNext
                    className='bhEffect'
                    variant='contained'
                    disableElevation
                    onClick={() => {
                        navigate('/Community');
                    }}
                    disabled={disabled}
                >
                    Next
                </ButtonNext>
            </ButtonsContainer>
            <BodyContainer>
                <Text1>Let's get you stitched in.</Text1>
                <Text2>What are your interests?</Text2>
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    AlreadyChecked={AlreadyChecked}
                    setDisabled={setDisabled}
                />
            </BodyContainer>
        </Container>
    );
};

export default Interests;
