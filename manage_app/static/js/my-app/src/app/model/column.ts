import ImageSeries from './image_series';

export class Column {
	id: string;
	name: string;
	sub_title: string;
	ranking: number;
	series_list: ImageSeries[];
}