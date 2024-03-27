import instance, { customAxios } from "./axios.js";
export const BASE_URL = "https://fams-net05-02.somee.com/";

/// nếu cái nào cần bearer thì dùng customAxios, đọc code customAxios
// còn lại nào không cần bearer thì dùng cái instance, login ở dưới là ví dụ
export const SignInAccount = (userData) => {
  return instance.post(`api/auth/login`, userData);
};

export const GetAccount = () => {
  return customAxios.get(`api/auth/who-am-i`);
};

//API của student

export const GetAllStudent = (totalCount) => {
  return customAxios.get(
    `api/students?desc=false&pageNumber=1&pageSize=${totalCount}`
  );
};

export const CreateStudent = (data) => {
  return customAxios.post(`api/students?${data}`);
};

export const GetAllStudentInClass = (id) => {
  return customAxios.get(`api/classes/${id}`);
};

export const GetStudentById = (id) => {
  return customAxios.get(`api/students/${id}`);
};

export const ImportStudent = (idObj, formData, importOption) => {
  return customAxios.post(
    `api/classes/${idObj.classId}/import-students-by-excel?importOption=${importOption}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// API của class

export const GetClassScore = (id) =>
  customAxios.get(`api/classes/${id}/scores`);

export const GetAllClasses = (totalCount) =>
  customAxios.get(`api/classes?desc=false&pageNumber=1&pageSize=${totalCount}`);

export const GetModulesByClassId = (id) =>
  customAxios.get(`api/classes/${id}/modules`);

export const GetClassById = (id) => customAxios.get(`api/classes/${id}`);

export const UpdateStudentScore = (classId, studentId, data) =>
  customAxios.put(`api/classes/${classId}/students/${studentId}/scores`, {
    scores: data,
  });

export const ImportStudentScore = (idObj, formData, importOption) => {
  return customAxios.post(
    `api/classes/${idObj.classId}/import-student-score/${idObj.moduleId}?importOption=${importOption}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// API của Reservation
export const AddReservation = (data) =>
  customAxios.post(`api/reservation`, data);

export const GetAllReservation = (totalCount) =>
  customAxios.get(`api/reservation?pageSize=${totalCount}&pageNumber=1`);

export const DropOutStudent = (classId, id) =>
  customAxios.put(`/api/classes/${classId}/update-status-in-batch`, {
    studentIdList: [id],
    attendingStatus: "DropOut",
  });
