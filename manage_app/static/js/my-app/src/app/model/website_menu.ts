export class WebsiteMenu {
	id: string;
	name: string;
	type: number = 0;
	type_text: string;
	icon_info: string;
	connect_id: number;
	connect_name: string;
	sort: number;
	parent_id: number = 0;
	sub_menus: WebsiteMenu[];
	created_date: string;
	modified_date: string;
}