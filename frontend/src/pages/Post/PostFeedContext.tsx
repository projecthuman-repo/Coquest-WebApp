import React, { createContext, useState, useEffect } from "react";
import { subscribeToUserModelSubject } from "../../observers/userobserver";
import { User } from "../../models/usermodel";
import Loading from "../../components/Loading";

// TODO fetch post data from backend
const data = [
	{
		postID: "1",
		userID: "1",
		title: "Interesting Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus lorem ac massa bibendum facilisis. Curabitur quis scelerisque risus. Maecenas sit amet ipsum rhoncus, mollis dui suscipit, suscipit quam. Fusce nisl urna, malesuada non dapibus sed, hendrerit vel lacus. Donec tincidunt vestibulum augue vitae consequat.",
		likes: 123,
		attachments: [
			"/image_placeholder.jpg",
			"/image_placeholder2.jpg",
			"/image_placeholder1.png",
		],
		createdAt: "2024-05-05",
		comments: [
			{
				username: "author_username",
				body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			},
			{
				username: "author_username",
				body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			},
			{
				username: "author_username",
				body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			},
			{
				username: "author_username",
				body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			},
			{
				username: "author_username",
				body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			},
		],
	},
	{
		postID: "2",
		userID: "1",
		title: "Another Interesting Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus lorem ac massa bibendum facilisis. Curabitur quis scelerisque risus.",
		likes: 567,
		attachments: ["/image_placeholder.jpg"],
		createdAt: "2024-07-05",
		comments: [
			{
				username: "author_username",
				body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			},
			{
				username: "author_username",
				body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			},
		],
	},
];

// Define the type for the context data
type PostFeedContextType = {
	posts: any[]; // Adjust the type as per your post structure
	setPosts: (posts: any[]) => void;
	user: User;
};

type PostFeedContextProviderProps = {
	children: React.ReactNode;
};

export const PostFeedContext = createContext<PostFeedContextType>({
	posts: [],
	setPosts: () => {},
	user: {} as User,
});

export const PostFeedContextProvider = ({
	children,
}: PostFeedContextProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [posts, setPosts] = useState(data);

	useEffect(() => {
		// get user of the account from whose name the comments will be posted
		let unsubscribe: (() => void) | null | undefined = null;
		const setupSubscription = async () => {
			unsubscribe = await subscribeToUserModelSubject((user) => {
				setUser(user);
			});
		};

		setupSubscription();

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}

			window.removeEventListener("resize", () => {});
		};
	}, [user]);

	if (!user) {
		return <Loading />;
	}

	return (
		<PostFeedContext.Provider value={{ posts, setPosts, user }}>
			{children}
		</PostFeedContext.Provider>
	);
};
