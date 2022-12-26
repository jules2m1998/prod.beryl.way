import Swal, { type SweetAlertResult } from "sweetalert2";
import Router from "../../router/clean";

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

const makeRequestAndAlert = async (
  successMsg: string,
  errorMsg: string,
  to: string,
  request: () => Promise<any>
) => {
  const response = await request();
  if (response) {
    successAlert(successMsg).then(() => {
      Router.push({
        name: to,
      });
    });
  } else {
    errorAlert(errorMsg);
  }
};
export { successAlert, errorAlert, makeRequestAndAlert };
