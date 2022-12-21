import { Modal } from "bootstrap";

const hideModal = (modalEl: HTMLElement | null): void => {
  if (!modalEl) {
    return;
  }

  const myModal = Modal.getInstance(modalEl);
  myModal?.hide();
};

const removeModalBackdrop = (): void => {
  if (document.querySelectorAll(".modal-backdrop.fade.show").length) {
    document.querySelectorAll(".modal-backdrop.fade.show").forEach((item) => {
      item.remove();
    });
  }
};

const escapeHtml = (unsafe?: string): string => {
  if (!unsafe) return "";
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

const highlightDetectedText = (
  value: string,
  search: string,
  className: string = "text-primary"
): string => {
  if (
    !search ||
    !value.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  )
    return escapeHtml(value);
  return value
    .toLocaleLowerCase()
    .replace(
      search.toLocaleLowerCase(),
      `<strong class="${className}">${escapeHtml(search)}</strong>`
    );
};

export { removeModalBackdrop, hideModal, highlightDetectedText };
