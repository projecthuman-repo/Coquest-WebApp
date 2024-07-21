import React, { useState } from "react";
import { Image } from "../../models/common";
import "./index.css";

export type CarouselProps = {
	images: Image[];
};

function ImageCarousel({ images }: CarouselProps) {
	const [activeIndex, setActiveIndex] = useState<number>(0);

	const handleBack = () => {
		setActiveIndex(activeIndex - 1);
		if (activeIndex <= 0) {
			setActiveIndex(images.length - 1);
		}
	};

	const handleNext = () => {
		setActiveIndex(activeIndex + 1);
		if (activeIndex >= images.length - 1) {
			setActiveIndex(0);
		}
	};

	return (
		<div className="image-carousel">
			<div className="image-container">
				{images.length > 1 && (
					<div className="back-icon-container" onClick={handleBack}>
						<img
							src="/icons/arrow-back.png"
							alt="Back"
							className="icon back-icon"
						/>
					</div>
				)}
				{images.map((image, index) => (
					<img
						key={index}
						src={image.path}
						alt="Post Image"
						className={`carousel-image ${
							index !== activeIndex ? "hidden" : "visible"
						}`}
					/>
				))}
				{images.length > 1 && (
					<div
						className="forward-icon-container"
						onClick={handleNext}
					>
						<img
							src="/icons/arrow-forward.png"
							alt="Forward"
							className="icon forward-icon"
						/>
					</div>
				)}
			</div>
			{images.length > 1 && (
				<div className="indicator-container">
					{images.map((_, index) => (
						<div
							key={index}
							className={`indicator ${
								index === activeIndex ? "active" : ""
							}`}
						></div>
					))}
				</div>
			)}
		</div>
	);
}
export default ImageCarousel;
