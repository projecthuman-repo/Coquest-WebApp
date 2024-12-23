import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { Registered, RegisteredRepType } from "../../models/common";
import { subscribeToUserModelSubject } from "../../observers/userobserver";

interface UserRegistrationType {
	registered: Registered;
	setRegistered: (registered: Registered) => void;
	done: boolean;
	setDone: (done: boolean) => void;
	authenticated: boolean;
	setAuthenticated: (authenticated: boolean) => void;
}

// Creating the context
const UserContext = createContext<UserRegistrationType | undefined>(undefined);

export const useUserRegistration = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error(
			"useUserRegistration must be used within a UserRegistrationProvider",
		);
	}
	return context;
};

interface UserRegistrationProps {
	children: ReactNode;
}

// Provider component
export function UserRegistrationProvider({ children }: UserRegistrationProps) {
	const [registered, setRegistered] = useState<Registered>({
		type: RegisteredRepType.BOOLEAN,
		boolValue: false,
	});
	const [done, setDone] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		const unsubscribe = subscribeToUserModelSubject(
			(userData) => {
				setRegistered(userData.registered);
				setDone(true);
				setAuthenticated(true);
			},
			() => {
				localStorage.removeItem("userCache");
				setAuthenticated(false);
				setDone(true);
			},
		);
		return () => {
			unsubscribe.then((cleanup) => cleanup && cleanup());
		};
	}, []);

	return (
		<UserContext.Provider
			value={{
				registered,
				setRegistered,
				done,
				setDone,
				authenticated,
				setAuthenticated,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
