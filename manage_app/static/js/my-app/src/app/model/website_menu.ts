export class WebsiteMenu {
	id: string;
	name: string;
	code: string;
	icon_info: string;
	url: string;
	sort: number;
	parent_id: number = 0;
	sub_menus: WebsiteMenu[];
	created_date: string;
	modified_date: string;
}