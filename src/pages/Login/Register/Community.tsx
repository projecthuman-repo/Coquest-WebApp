import { Button, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import link from '@mui/material/Link';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProgressBar from '../../../components/ProgressBar/index';
import SearchBar from '../../../components/SearchBar/Searchbar';
import CommunitySearchBar from '../../../components/SearchBar/CommunitySearchBar';
// styles for community page
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
    marginBottom: 20,
});

const BodyContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
});
const Community = () => {
    const navigate = useNavigate();
    //Search bar hook
    const [searchTerm, setSearchTerm] = useState('');
    //disabled hook for next
    const [disabled, setDisabled] = useState(Boolean);
    return (
        <Container>
            <ProgressBar index={3} />
            <ButtonsContainer>
                <ButtonBack
                    className='bhEffect'
                    onClick={() => {
                        navigate('/interests');
                    }}
                >
                    {'<'} Back
                </ButtonBack>
                <ButtonNext
                    className='bhEffect'
                    variant='contained'
                    disableElevation
                    onClick={() => {
                        navigate('/Dashboard');
                    }}
                    disabled={disabled}
                >
                    Finish
                </ButtonNext>
            </ButtonsContainer>
            <BodyContainer>
                <Text1>Find your community.</Text1>
                <CommunitySearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </BodyContainer>
        </Container>
    );
};

export default Community;
