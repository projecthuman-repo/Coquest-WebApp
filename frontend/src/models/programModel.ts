export interface Program {
	id: number;
	name: string;
	location: string;
	description: string;
	progress: number | null;
	time: string | null;
	date: string | null;
	openSpots: number | null;
}
