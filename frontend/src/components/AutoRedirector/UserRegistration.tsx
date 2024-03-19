import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Registered, RegisteredRepType } from '../../models/usermodel';
import { userObservable } from '../../observers/userobserver';

interface UserRegistrationType {
    registered: Registered;
    setRegistered: (registered: Registered) => void;
    done: boolean;
    setDone: (done: boolean) => void;
}

// Creating the context
const UserContext = createContext<UserRegistrationType | undefined>(undefined);

export const useUserRegistration = () => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error('useUserRegistration must be used within a UserRegistrationProvider');
    }
    return context;
}

interface UserRegistrationProps {
    children: ReactNode;
}

// Provider component
export function UserRegistrationProvider({ children }: UserRegistrationProps) {
    const [registered, setRegistered] = useState<Registered>({type: RegisteredRepType.BOOLEAN, boolValue: false});
    const [done, setDone] = useState(false);

    useEffect(() => {
        const subscription = userObservable.subscribe({
            next: (userData) => {
                setRegistered(userData.registered);
                setDone(true);
            },
            error: (error) => console.error('Error fetching user data:', error),
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ registered, setRegistered, done, setDone }}>
            {children}
        </UserContext.Provider>
    );
}
