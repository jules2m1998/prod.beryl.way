import Swal, { type SweetAlertResult } from "sweetalert2";

const successAlert = (msg: string): Promise<SweetAlertResult<any>> =>
  Swal.fire({
    text: msg,
    icon: "success",
    buttonsStyling: false,
    confirmButtonText: "Ok",
    heightAuto: false,
    customClass: {
      confirmButton: "btn fw-semobold btn-light-primary",
    },
  });

const errorAlert = (msg: string): Promise<SweetAlertResult<any>> =>
  Swal.fire({
    text: msg,
    icon: "error",
    buttonsStyling: false,
    confirmButtonText: "Ok",
    heightAuto: false,
    customClass: {
      confirmButton: "btn fw-semobold btn-light-primary",
    },
  });
export { successAlert, errorAlert };
