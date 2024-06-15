import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfileInternal from "../../components/Profile/UserProfileInternal";
import UserProfileExternal from "../../components/Profile/UserProfileExternal";
import { subscribeToUserModelSubject } from "../../observers/userobserver";
import { User } from "../../models/usermodel";

const UserProfile = () => {
	const { userId } = useParams<{ userId: string }>();
	const [user, setUser] = useState<User | null>(null);
	const isOwnProfile = !userId;

	useEffect(() => {
		let unsubscribe: (() => void) | null | undefined = null;

		const setupSubscription = async () => {
			unsubscribe = await subscribeToUserModelSubject((user) => {
				if (isOwnProfile || user.id === userId) {
					setUser(user);
				}
			});
		};

		setupSubscription();

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [userId, isOwnProfile]);

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{isOwnProfile ? (
				<UserProfileInternal user={user} />
			) : (
				<UserProfileExternal user={user} />
			)}
		</div>
	);
};

export default UserProfile;
