import { createContext, useEffect, useState } from "react";
import { customAxios } from "../api/axios.js";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalReservation, setTotalReservation] = useState(0);
  const [totalEmailTemplate, setTotalEmailTemplate] = useState(0);

  useEffect(() => {
    customAxios
      .get("api/students")
      .then((response) => {
        setTotalStudents(response.data.totalCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    customAxios
      .get("api/classes")
      .then((response) => {
        setTotalClasses(response.data.totalCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    customAxios
      .get("api/reservation")
      .then((response) => {
        setTotalReservation(response.data.totalCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    customAxios
      .get("api/email/email-templates")
      .then((response) => {
        setTotalEmailTemplate(response.data.totalCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        totalStudents,
        totalClasses,
        totalReservation,
        totalEmailTemplate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
