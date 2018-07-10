export class Article {
	id: string;
	title: string;
	author: string;
	author_name: string;
	status: number;
	view_count: number = 0;
	comment_count: number = 0;
	version: number;
	agree_count: number = 0;
	disagree_count: number = 0;
	desc: string;
	content: string;
	comment_count: number = 0;
	created_date: string;
	modified_date: string;
}