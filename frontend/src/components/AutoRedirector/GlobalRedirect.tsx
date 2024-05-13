import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useUserRegistration } from './UserRegistration';
import { isCompleteRegistration } from '../../models/common';
import { gql } from 'graphql-request';
import graphQLClient from '../../apiInterface/client';

const setAuthCookieMutation = gql`
    mutation SetCookieWithToken($token: String!) {
        setCookieWithToken(token: $token) {
            response
            code
        }
    }
`;

function GlobalRedirect() {
    let { registered, done, authenticated, setAuthenticated } = useUserRegistration();

    const loc = useLocation();
    let navigate = useNavigate();

    // TODO: replace token exchange mechanism with PKCE 
    let [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (done) {
            if (!authenticated) {
                if (token) {
                    console.log('setting cookie with token', token);
                    graphQLClient.request(setAuthCookieMutation, { token: token })
                        .then(() => {
                            setAuthenticated(true);
                        });
                } else {
                    // TODO: dynamically fetch appId from DB
                    window.location.href = `${process.env.REACT_APP_AUTH_URI}?appId=2`;
                }
                // Explicitly check for "/registration" pathname to prevent endless reload loop
            } else if (!isCompleteRegistration(registered) && loc.pathname !== "/registration") {
                // TODO: replace temporary navigation solution with one that doesn't briefly display originally requested page
                navigate('/registration', { replace: true });
                // Temporary fix: refresh page after navigating to /registration
                // https://stackoverflow.com/a/71642098
                navigate(0);
            }
        }
    }, [done, authenticated, registered, token, loc]);

    return null;
}

export default GlobalRedirect;
