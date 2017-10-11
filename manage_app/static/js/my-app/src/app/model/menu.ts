export class Menu {
	id: string;
	name: string;
	code: string;
	icon_info: string;
	url: string;
	sort: number;
	parent_id: string;
	sub_menus: Menu[];
	created_date: string;
	modified_date: string;
}