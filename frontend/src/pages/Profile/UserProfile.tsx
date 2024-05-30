import React from 'react';
import { useParams } from 'react-router-dom';
import UserProfileInternal from '../../components/Profile/UserProfileInternal';
import UserProfileExternal from '../../components/Profile/UserProfileExternal';


const UserProfile = () => {
    const { userId } = useParams<{ userId: string }>();

    const isOwnProfile = !userId;

    return (
        <div>
            {isOwnProfile ? <UserProfileInternal /> : <UserProfileExternal userId={userId!} />}
        </div>
    );
};

export default UserProfile;

