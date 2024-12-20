import React from "react";
import TagSearch, { TagSearchProps } from "./TagSearch";

export interface HashtagSearchProps
	extends Omit<TagSearchProps, "tags" | "onChange"> {
	hashtags: string[];
	onChange: (selectedHashtags: string[]) => void;
}

const HashtagSearch: React.FC<HashtagSearchProps> = (props) => {
	const { hashtags, onChange, ...rest } = props;

	const handleChange = (selectedTags: string[]) => {
		const selectedHashtags = hashtags.filter((hashtag) =>
			selectedTags.includes(hashtag),
		);
		onChange(selectedHashtags);
	};

	return (
		<TagSearch
			{...rest}
			tags={hashtags.filter((hashtag) => hashtag !== "")}
			placeholder="Search hashtags"
			onChange={handleChange}
		/>
	);
};

export default HashtagSearch;
