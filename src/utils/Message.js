import Swal from "sweetalert2";

export const showErrorAlertModal = (message = "Something went wrong") => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
};

export const showSuccessModal = (
  message = "You has successfully done your action"
) => {
  return Swal.fire({
    title: "Done!",
    text: message,
    icon: "success",
  });
};
