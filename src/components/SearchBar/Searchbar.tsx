import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
export interface Props {
    searchTerm?: any;
    setSearchTerm?: any;
    AlreadyChecked?: any;
    setDisabled?: any;
    // any props that come into the component
}
//styles for this page
const BoxContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
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
const GenresContainer = styled.div({
    marginTop: 20,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 100,
    width: 350,
    marginLeft: 30,
});
const ButtonStyle = styled(FormControlLabel)({
    backgroundColor: 'rgb(138, 220, 148)',
    color: 'black',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 16,
    borderRadius: 30,
    height: 42,
    paddingRight: 10,
});
const Check = styled(Checkbox)({
    textAlign: 'left',
});

const Searchbar = ({
    searchTerm,
    setSearchTerm,
    AlreadyChecked,
    setDisabled,
}: Props) => {
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState<string[]>([]);
    //predefined array of genres
    const [genre, setGenre] = useState([
        'Sports',
        'Arts',
        'Music',
        'Generative Art',
        'Basketball',
    ]);
    const [checked, setChecked] = useState([false, false, false, false, false]);
    //use effect to run keyword search on array of genres
    let result = [''];
    //search for searchTerm from array of genres
    const performSearch = () => {
        setSearchResult(genre.filter((item) =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    };
    //checks if arrayofChecked items is less than or equal to 3
    useEffect(() => {
        if (AlreadyChecked.length < 3) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
        localStorage.setItem('genres', JSON.stringify(AlreadyChecked));
    }, [AlreadyChecked.length]);
    //remove for AlreadyChecked
    const removeCheck = (value: String) => {
        const index = AlreadyChecked.indexOf(value);
        if (index > -1) {
            // only splice array when item is found
            AlreadyChecked.splice(index, 1); // 2nd parameter means remove one item only
        }
    };
    //set the state for each individual item from the array of genres
    const setTheCheck = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>,
        selectedItem: string
    ) => {
        let value = index;

        if (value === 0) {
            setChecked([
                event.target.checked,
                checked[1],
                checked[2],
                checked[3],
                checked[4],
            ]);

            if (event.target.checked) {
                AlreadyChecked.push(selectedItem);
            } else {
                removeCheck(selectedItem);
            }
        } else if (value === 1) {
            setChecked([
                checked[0],
                event.target.checked,
                checked[2],
                checked[3],
                checked[4],
            ]);

            if (event.target.checked) {
                AlreadyChecked.push(selectedItem);
            } else {
                removeCheck(selectedItem);
            }
        } else if (value === 2) {
            setChecked([
                checked[0],
                checked[1],
                event.target.checked,
                checked[3],
                checked[4],
            ]);

            if (event.target.checked) {
                AlreadyChecked.push(selectedItem);
            } else {
                removeCheck(selectedItem);
            }
        } else if (value === 3) {
            setChecked([
                checked[0],
                checked[1],
                checked[2],
                event.target.checked,
                checked[4],
            ]);

            if (event.target.checked) {
                AlreadyChecked.push(selectedItem);
            } else {
                removeCheck(selectedItem);
            }
        } else if (value === 4) {
            setChecked([
                checked[0],
                checked[1],
                checked[2],
                checked[3],
                event.target.checked,
            ]);

            if (event.target.checked) {
                AlreadyChecked.push(selectedItem);
            } else {
                removeCheck(selectedItem);
            }
        }
    };
    //the button next should be diabled until the user has selected 3 or more generes
    //counter
    useEffect(() => {
        performSearch();
        console.log(searchTerm);
    }, [searchTerm]);
    //check if the user has selected at least 3 genres using counter
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
                placeholder='&#x1F50D;  Search topics'
                value={searchTerm}
            // onFocus will navigate to /search
            // onFocus={() => navigate('/search')}
            />
            <Text3>Select 3 or more.</Text3>

            <GenresContainer>
                {searchResult.map((item, index) => (
                    <ButtonStyle
                        key={index}
                        label={item}
                        style={{ backgroundColor: 'rgb(138,220,148)' }}
                        control={
                            <Check
                                checked={checked[index]} //dynamic
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    if (index === 0) {
                                        setTheCheck(index, event, item);
                                    } else if (index === 1) {
                                        setTheCheck(index, event, item);
                                    } else if (index === 2) {
                                        setTheCheck(index, event, item);
                                    } else if (index === 3) {
                                        setTheCheck(index, event, item);
                                    } else if (index === 4) {
                                        setTheCheck(index, event, item);
                                    }
                                }}
                                disableRipple
                                checkedIcon={
                                    <CheckIcon
                                        style={{
                                            color: 'black',
                                        }}
                                    />
                                }
                                icon={
                                    <CheckIcon
                                        style={{
                                            color: 'rgb(138, 220, 148)',
                                        }}
                                    />
                                }
                            />
                        }
                    />
                ))}
            </GenresContainer>
        </BoxContainer>

        //div container
        // display buttons of possible search terms
    );
};

export default Searchbar;
