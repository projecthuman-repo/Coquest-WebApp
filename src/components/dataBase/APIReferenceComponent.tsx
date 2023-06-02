import { useEffect, useState } from 'react';
import { find, genres, get } from '../../apiinterface/index';



const APIReferenceComponent = () => {
    const [allUsers, setallUsers] = useState([]);
    const [singleUserInfo, setsingleUserInfo] = useState();
    const [genre, setGenre] = useState([]);

    //all get functions return an array of data
    useEffect(() => {
        get('getCommunities', ['name']).then((data) => {
            setallUsers(data);
        });
    }, []);
    console.log(allUsers);
    //all find by ID functions return a single point of data
    useEffect(() => {
        find('findUserbyID', 'k443h3', ['userID', 'currentLevel']).then(
            setsingleUserInfo
        );
    }, []);
    console.log(setsingleUserInfo);
    // && to check the existance of the state
    useEffect(() => {
        genres().then(setGenre);
    }, []);

    return (
        <div>
            {allUsers &&
                allUsers.map((data) => <div>{JSON.stringify(data)}</div>)}
            <br />
            {singleUserInfo ? JSON.stringify(singleUserInfo) : 'loading...'}
            <br />
            <p>{genre}</p>
        </div>
    );
};

export default APIReferenceComponent;
