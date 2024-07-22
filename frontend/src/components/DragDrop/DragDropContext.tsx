import React, { createContext } from "react";
import { Image } from "../../models/common";

type DragDropContextType = {
	attachments: any[];
	setAttachments: (attachments: Image[]) => void;
};

type DragDropContextProviderProps = {
	attachments: any[];
	setAttachments: (attachments: Image[]) => void;
	children: React.ReactNode;
};

export const DragDropContext = createContext<DragDropContextType>({
	attachments: [],
	setAttachments: () => {},
});

// Purpose is to pass the attachments state to all descendants so they can modify it
export const DragDropContextProvider = ({
	attachments,
	setAttachments,
	children,
}: DragDropContextProviderProps) => {
	return (
		<DragDropContext.Provider value={{ attachments, setAttachments }}>
			{children}
		</DragDropContext.Provider>
	);
};
