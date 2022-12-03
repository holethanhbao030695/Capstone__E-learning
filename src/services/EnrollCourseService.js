import { baseService } from "./baseService";

export class EnrollCourseService extends baseService {
    constructor(){
        super();
    }

    enrollCourseService = () =>{
        return this.get(`/api/QuanLyKhoaHoc/GhiDanhKhoaHoc`);
    }
}

export const enrollCourseService = new EnrollCourseService();