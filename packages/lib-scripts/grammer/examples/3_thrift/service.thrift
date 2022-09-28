
struct ListReq {
  1: optional string name;
  2: optional i32 page;
  3: optional i32 pageSize;
}

struct ListItem {
  1: required i32 id;
  2: required string name;
  3: required i32 status;
  4: required string createdAt;
  5: optional string updatedAt;
}

struct ListRes {
  1: required list<ListItem> data;
  2: required i32 total;
}

service HttpService {
  ListRes GetList(1: ListReq req)(api.get='/api/some_list')
}
