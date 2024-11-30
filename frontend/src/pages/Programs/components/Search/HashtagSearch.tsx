import React from "react";
import TagSearch, { TagSearchProps } from "./TagSearch";
import { Hashtag } from "../../../../models/programModel";

export interface HashtagSearchProps
	extends Omit<TagSearchProps, "tags" | "onChange"> {
	hashtags: Hashtag[];
	onChange: (selectedHashtags: Hashtag[]) => void;
}

const HashtagSearch: React.FC<HashtagSearchProps> = (props) => {
	const { hashtags, onChange, ...rest } = props;

	const handleChange = (selectedTags: string[]) => {
		const selectedHashtags = hashtags.filter((hashtag) =>
			selectedTags.includes(hashtag.name),
		);
		onChange(selectedHashtags);
	};

	return (
		<TagSearch
			{...rest}
			tags={hashtags.map((h) => h.name)}
			placeholder="Search hashtags"
			onChange={handleChange}
		/>
	);
};

export default HashtagSearch;
