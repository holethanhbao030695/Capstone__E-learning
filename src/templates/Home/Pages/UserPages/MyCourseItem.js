import { Card } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleEndSpinner, handleStartSpinner, } from "../../../../redux/actions/userManagermentAction";
import { GetCoursesServices } from "../../../../services/GetCoursesServices";
const { Meta } = Card;

const MyCourseItem = ({ course }) => {
    const { userInfo } = useSelector((state) => {
        return state.userReducer;
    });
    const dispatch = useDispatch();

    const cancelCourse = () => {
        let data = {
            maKhoaHoc: course.maKhoaHoc,
            taiKhoan: userInfo.taiKhoan,
        };
        console.log(data);
        dispatch(handleStartSpinner());
        GetCoursesServices
            .huyGhiDanh(data)
            .then((res) => {
                console.log(res);
                dispatch(handleEndSpinner());
                alert(res.data);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                dispatch(handleEndSpinner());
                alert(err.response.data);
                window.location.reload();
            });
    };

    return (
        <div className="w-full sm:w-1/2 lg:w-1/4 p-5">
            <Card
                className="max-w-[360px] mx-auto" hoverable
                cover={<img alt="course img" className="h-52 lg:h-40 xl:h-52" src={course.hinhAnh} />}
            >
                <Meta title={course.tenKhoaHoc} />
                <button onClick={() => { cancelCourse(); }}
                    className="px-5 py-2 rounded bg-color-primary text-white hover:shadow-xl font-bold mx-auto block mt-5"
                >
                    Hủy đăng ký
                </button>
            </Card>
        </div>
    );
};

export default MyCourseItem;