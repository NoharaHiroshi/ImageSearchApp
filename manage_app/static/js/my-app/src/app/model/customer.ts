import { CustomerDiscount } from './customer_discount';

export class Customer {
	id: string;
	name: string;
	phone: string;
	email: string;
	customer_discount: CustomerDiscount;
	created_date: string;
}