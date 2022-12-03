import React, { useState, useEffect } from 'react'
import BreadCrumb from '../../../../components/Breadcrumbs/Breadcrumbs';
import { useDispatch } from "react-redux";
import { handleEndSpinner, handleStartSpinner } from "../../../../redux/actions/userManagermentAction";
import MyCourseItem from "./MyCourseItem";
import { message } from "antd";
import { UserManagermentService } from '../../../../services/UserManagermentService';

export default function Profile() {
  const [userDetail, setUserDetail] = useState({});
  const [userEdit, setUserEdit] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(handleStartSpinner());
    // UserManagermentService
    //   .getUserInfo()
    //   .then((res) => {
    //     setUserDetail(res.data);
    //     setUserEdit(res.data);
    //     dispatch(handleEndSpinner());
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     dispatch(handleEndSpinner());
    //   });
  }, []);

  const handleChangeForm = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    console.log(name, value);
    setUserEdit({
      ...userEdit,
      [name]: value,
    });
  };

  const submitSaveChange = () => {
    dispatch(handleStartSpinner());
    UserManagermentService
      .updateUser()
      .then((res) => {
        console.log(res);
        message.success("Cập nhật thông tin tài khoản thành công");
        dispatch(handleEndSpinner());
        hideUserEditInfo();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleEndSpinner());
        hideUserEditInfo();
        window.location.reload();
      });
  };

  const hideUserInfo = () => {
    let userInfoEditElement = document.getElementsByClassName("user-info-edit");
    let userInfoElement = document.getElementsByClassName("user-info");
    console.log(userInfoEditElement);
    for (let i = 0; i < userInfoEditElement.length; i++) {
      console.log(userInfoEditElement[i]);
      userInfoEditElement[i].style.display = "inline-block";
    }
    for (let i = 0; i < userInfoElement.length; i++) {
      console.log(userInfoElement[i]);
      userInfoElement[i].style.display = "none";
    }
  };
  const hideUserEditInfo = () => {
    let userInfoEditElement = document.getElementsByClassName("user-info-edit");
    let userInfoElement = document.getElementsByClassName("user-info");
    console.log(userInfoEditElement);
    for (let i = 0; i < userInfoEditElement.length; i++) {
      console.log(userInfoEditElement[i]);
      userInfoEditElement[i].style.display = "none";
    }
    for (let i = 0; i < userInfoElement.length; i++) {
      console.log(userInfoElement[i]);
      userInfoElement[i].style.display = "inline-block";
    }
  };

  const renderPassword = () => {
    let password = "";
    for (let i = 0; i < userDetail.matKhau.length; i++) {
      password += "*";
    }
    return password;
  };


  return (
    <div className="min-h-screen pt-20 container mx-auto pl-7 bg-profile" >
      <p className="mb-10">
        <BreadCrumb />
      </p>
      <h1 className="text-4xl text-center" style={{color:'#e96036'}}>Profile</h1>
      {/* ---------- */}
      <div className="border-b py-5 mb-5" style={{ paddingLeft: '500px' }}>
        <h2 className="text-xl font-bold" style={{color:'#FFD700'}}>Thông tin cá nhân</h2>
        <ul className="my-5 text-base font-base " style={{color:'#00FFFF'}}>
          <li className="leading-8">
            <span className="w-32 inline-block">Họ tên: </span>
            <span className="user-info">{userDetail.hoTen}</span>
            <input value={userEdit.hoTen} type="text" name="hoTen" className="user-info-edit hidden my-1 border border-gray-500 rounded"
              onChange={(event) => { handleChangeForm(event); }}
            />
          </li>
          <li className="leading-8">
            <span className="w-32 inline-block">Số điện thoại: </span>
            <span className="user-info">{userDetail.soDT}</span>
            <input value={userEdit.soDT} type="text" name="soDT" className="user-info-edit hidden my-1 border border-gray-500 rounded"
              onChange={(event) => { handleChangeForm(event); }}
            />
          </li>
          <li className="leading-8">
            <span className="w-32 inline-block">Email: </span>
            <span className="user-info">{userDetail.email}</span>
            <input value={userEdit.email} type="email" name="email" className="user-info-edit hidden my-1 border border-gray-500 rounded"
              onChange={(event) => { handleChangeForm(event); }}
            />
          </li>
          <li className="leading-8">
            <span className="w-32 inline-block">Tài khoản: </span>
            <span className="user-info">{userDetail.taiKhoan}</span>
          </li>
          <li className="leading-8">
            <span className="w-32 inline-block">Mật khẩu: </span>
            <span className="user-info text-xl">
              {userDetail.matKhau ? renderPassword() : <></>}
            </span>
            <input value={userEdit.matKhau} type="text" name="matKhau" className="user-info-edit hidden my-1 border border-gray-500 rounded"
              onChange={(event) => { handleChangeForm(event); }}
            />
          </li>
        </ul>
        <span className="user-info text-lg border-blue-500 text-blue-500 cursor-pointer underline pl-40" onClick={hideUserInfo}>
          Cập nhật thông tin tài khoản
        </span>
        <button className="user-info-edit edit-save hidden hover:text-white hover:bg-color-primary rounded text-color-primary bg-white px-5 py-2 hover:border-color-primary border-color-primary border"
          onClick={() => submitSaveChange()}
        >
          Lưu thay đổi
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-center" style={{color:'#e96036'}}>Khóa học của tôi</h2>
        <div className="flex flex-wrap py-6">
          {userDetail.chiTietKhoaHocGhiDanh ? (
            userDetail.chiTietKhoaHocGhiDanh.map((course, index) => {
              return <MyCourseItem key={index} course={course} />;
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
