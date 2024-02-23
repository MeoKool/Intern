import StudentList from "../components/studentList/StudentList";

import StudentListInClassHeader from "../components/ClassList/StudentListInClassHeader";

export default function studentList() {
  return (
    <>
      <StudentListInClassHeader />
      <StudentList />
    </>
  );
}
