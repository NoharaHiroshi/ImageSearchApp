export class Comment {
	id: string;
	customer_id: string;
	customer_name: string;
	content: string;
	comment_id: string;
	type: number = 0;
	reply_list: Comment[];
	created_date: string;
	modified_date: string;
}