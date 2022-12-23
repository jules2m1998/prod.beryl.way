import { Modal } from "bootstrap";

export const openModal = (id: string) => {
  const elt = document.getElementById(id) as Element;

  if (elt) {
    const modal = new Modal(elt);
    modal.show();
  } else {
    console.error("Model does not exist");
  }
};
