import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useUserRegistration } from '../../components/AutoRedirector/UserRegistration';
import { getRegistrationProgress } from '../../models/common';

function OrientationRedirector() {
    let {registered, done} = useUserRegistration();
    let navigate = useNavigate();

    useEffect(() => {
        if(done) {
            navigate(`/registration/${getRegistrationProgress(registered)}`, { replace: true });
        }
    }, [done]);

    if(done) {
        return (
            <Outlet />
        )
    } else {
        return null;
    }
}

export default OrientationRedirector;
