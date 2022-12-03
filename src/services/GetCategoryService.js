import { baseService } from "./baseService";

export class GetCategoryService extends baseService {
    constructor(){
        super();
    }

    getCategoryService = () =>{
        return this.get(`/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc`);
    }
}

export const GetCategoryCourses = new GetCategoryService();