import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userModel } from '../../models/userobserver';

function GlobalRedirect() {
    // TODO: Obtain the authenticated boolean from a valid JWT token and the registered flag from session storage
    // These hard-coded booleans help devs simulate different possible activation statuses.
    const authenticated = true;
    const registered = userModel.registered;

    let navigate = useNavigate();

    useEffect(() => {
        if(!authenticated) {
            // TODO: Redirect to login process
        }

        if(!registered || typeof registered === "number") {
            navigate('/registration', {replace: true});
        }
    }, [navigate, authenticated, registered]);

    return null;
}

export default GlobalRedirect;
