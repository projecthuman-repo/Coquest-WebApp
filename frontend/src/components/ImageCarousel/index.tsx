import React from "react";
// import React, {useState} from "react";
// import Carousel from 'react-bootstrap/Carousel';

export type CarouselProps = {
	images: string[];
};

function ImageCarousel({ images }: CarouselProps) {
	// const [index, setIndex] = useState(0);
	// const handleSelect = (selectedIndex :any) => {
	//   setIndex(selectedIndex);
	// };

	return (
		<>
			{images.map((image, index) => (
				<img
					key={index}
					src={image}
					alt="Post Image"
					className="post-image"
				/>
			))}
		</>
	);
}
export default ImageCarousel;
