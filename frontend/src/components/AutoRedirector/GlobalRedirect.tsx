import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserRegistration } from './UserRegistration';
import { isCompleteRegistration } from '../../models/usermodel';

function GlobalRedirect() {
    // TODO: Obtain the authenticated boolean from a valid JWT token and the registered flag from session storage
    // These hard-coded booleans help devs simulate different possible activation statuses.
    const authenticated = true;
    let {registered, done} = useUserRegistration();

    let navigate = useNavigate();

    useEffect(() => {
        // TODO:
        // Attempt to create user that shares the same ID as their newly created identity on the identity server (Login-Process)
        // Store the ID in the shared user modal.
        // If the user already exists, subscribe to the userObservable and initilize the shared user modal.

        if(!authenticated) {
            // TODO: Redirect to login process
        } else if(done) {
            if(!isCompleteRegistration(registered)) {
                navigate('/registration', {replace: true});
            }
        }
    }, [navigate, authenticated, done, registered]);

    return null;
}

export default GlobalRedirect;
