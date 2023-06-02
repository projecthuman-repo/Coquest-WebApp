import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Spinner from '../Spinner/Spinner';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { get } from '../../apiinterface';
const randomImage =
    'https://source.unsplash.com/1600x900/?nature,photography,technology';
interface Props {
    searchTerm?: any;
    setSearchTerm?: any;
    AlreadyChecked?: any;
    setDisabled?: any;
    // any props that come into the component
}
const BoxContainer = styled.div`
    & :hover.bhEffect {
        background-color: rgb(233, 233, 233);
        color: black;
    }
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    margin-right: 100px;
`;

const CommunityContainer = styled.div({
    marginTop: 20,
    display: 'flex',
    justifydirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 400,
    width: 600,
    marginLeft: 30,
});
const CardStyle = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-Content',
    width: 295,
});
const Text = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '15px',
    lineHeight: '18px',
    fontWeight: 420,
    color: '#000000',
});
const Text1 = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 220,
    color: '#000000',
    marginTop: 10,
    wordWrap: 'break-word',
    width: '100%',
    height: '100%',
});
const Text2 = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '17px',
    lineHeight: '18px',
    fontWeight: 320,
    color: 'white',
});
const OverImage = styled.div({
    display: 'inline',
    width: '100%',
    justifyContent: 'center',
    marginTop: -25,
    transform: 'translateX(-36%)',
});
const ButtonStyle = styled(Button)({
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 200,
    textTransform: 'none',
    fontSize: 16,
    borderRadius: 30,
    height: 30,
    marginLeft: 320,
    marginTop: -50,
    width: 80,
});
const CommunitySearchBar = ({ searchTerm, setSearchTerm }: Props) => {
    //communities array hook
    const [communities, setCommunities] = useState<any[]>([]);
    //searchResult array hook
    const [searchResult, setSearchResult] = useState<any[]>([]);
    //loading screen hook
    const [loading, setloading] = useState(true);

    //gets all the communities from the database and assign it to the hook communities
    useEffect(() => {
        get('getCommunities', ['name']).then((data) => {
            setCommunities(data);
            setloading(false);
        });
    }, []);
    //function for searching for searchTerm from the database
    const performSearch = () => {
        let result = [];
        for (let i = 0; i < communities.length; i++) {
            const obj = communities[i];
            const name = obj.name;
            if (name.includes(searchTerm)) {
                result.push(obj);
            }
        }
        setSearchResult(result);
    };

    // the button next should be diabled until the user has selected 3 or more generes
    //function that runs everytime the user updates searchTerm
    useEffect(() => {
        performSearch();
    }, [searchTerm]);
    return (
        <BoxContainer>
            <input
                style={{
                    width: 300,
                    height: 45,
                    borderRadius: 30,
                }}
                type='text'
                onChange={(e: { target: { value: any } }) => {
                    setSearchTerm(e.target.value);
                }}
                placeholder='&#x1F50D;  Search groups'
                value={searchTerm}
            />

            {loading ? (
                <Spinner message={'loading'} />
            ) : (
                <CommunityContainer>
                    {searchResult.map((item, index) => (
                        <CardStyle>
                            <CardMedia
                                component='img'
                                height='200'
                                image={randomImage}
                                alt='company image'
                            ></CardMedia>
                            <OverImage>
                                <Text2>Location</Text2>
                                <ButtonStyle className='bhEffect'>
                                    Join
                                </ButtonStyle>
                            </OverImage>
                            <CardContent style={{ textAlign: 'left' }}>
                                <Text>Guild/{item.name}</Text>
                                <Text1>
                                    What is the full Lorem Ipsum text? The full
                                    passage of standard Lorem Ipsum copy is:
                                    What is the full Lorem Ipsum text? The full
                                    passage of standard Lorem Ipsum copy is:
                                </Text1>
                            </CardContent>
                        </CardStyle>
                    ))}
                </CommunityContainer>
            )}
        </BoxContainer>
    );
};

export default CommunitySearchBar;
