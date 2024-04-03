import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserRegistration } from './UserRegistration';
import { isCompleteRegistration } from '../../models/common';

function GlobalRedirect() {
    let {registered, done, authenticated, setAuthenticated} = useUserRegistration();

    const loc = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        // TODO:
        // Attempt to create user that shares the same ID as their newly created identity on the identity server (Login-Process)
        // Store the ID in the shared user modal.
        // If the user already exists, subscribe to the userObservable and initilize the shared user modal.

        if(!authenticated) {
            // TODO: Redirect to login process
        } else if(done) {
            if(!isCompleteRegistration(registered) && loc.pathname !== "/registration") {
                // TODO: replace temporary navigation solution with one that doesn't briefly display originally requested page
                navigate('/registration', {replace: true});
                // Temporary fix: refresh page after navigating to /registration
                // https://stackoverflow.com/a/71642098
                navigate(0);
            }
        }
    }, [done, authenticated, registered, loc]);

    return null;
}

export default GlobalRedirect;
