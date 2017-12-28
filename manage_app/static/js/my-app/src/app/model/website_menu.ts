export class WebsiteMenu {
	id: string;
	name: string;
	code: string;
	type: number = 0;
	type_text: string;
	icon_info: string;
	url: string;
	connect_id: number;
	sort: number;
	parent_id: number = 0;
	sub_menus: WebsiteMenu[];
	created_date: string;
	modified_date: string;
}