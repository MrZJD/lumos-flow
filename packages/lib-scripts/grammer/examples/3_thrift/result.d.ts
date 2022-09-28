
interface ListReq {
	name?: string;
	page?: number;
	pageSize?: number;
}
interface ListItem {
	id: number;
	name: string;
	status: number;
	createdAt: string;
	updatedAt?: string;
}
interface ListRes {
	data: ListItem[];
	total: number;
}
interface HttpService {
	GetList(req: ListReq): ListRes;
}