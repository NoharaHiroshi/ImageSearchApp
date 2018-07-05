export class ImageSeries {
	id: string;
	name: string;
	author: string;
	desc: string;
	short_desc: string;
	cover_image_id: string;
	cover_image_url: string;
	width: number;
	height: number;
	count: string;
	type: number = 0;
	type_text: string;
	view_count: number = 0;
	collect_count: number = 0;
	is_collected: number;
}