import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userModel } from '../../models/userobserver';

function OrientationRedirector() {
    let navigate = useNavigate();

    useEffect(() => {
        // TODO:
        // Attempt to create user that shares the same ID as their newly created identity on the identity server (Login-Process)
        // Store the ID in the shared user modal.
        // If the user already exists, subscribe to the userObservable and initilize the shared user modal.

        navigate(`/registration/${typeof userModel.registered === "number" ? userModel.registered : 1}`, { replace: true });
    }, [navigate]);

    return null; // Component does not render anything
}

export default OrientationRedirector;
