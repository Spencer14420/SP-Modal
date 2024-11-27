export class Modal {
  element;
  modalContent;
  showButtons;
  closeButtons;
  outsideClickHandler;
  isTransitioning = false;
  constructor(selector) {
    const modalElement = document.querySelector(selector);
    if (!(modalElement instanceof HTMLElement)) {
      throw new Error(`Modal element with selector "${selector}" not found.`);
    }
    this.element = modalElement;
    const modalContent = this.element.querySelector(".modal-content");
    if (!(modalContent instanceof HTMLElement)) {
      throw new Error(`Modal content element not found inside "${selector}".`);
    }
    this.modalContent = modalContent;
    this.showButtons = document.querySelectorAll(
      `[data-showModal="${selector}"]`
    );
    this.closeButtons = document.querySelectorAll(
      `[data-closeModal="${selector}"]`
    );
    this.outsideClickHandler = this.handleOutsideClick.bind(this);
    this.initializeEventListeners();
  }
  show() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.element.style.display = "block";
    this.element.setAttribute("aria-hidden", "false");
    this.element.setAttribute("aria-modal", "true");
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "0px";
    document.body.classList.add("modal-open");
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop fade";
    document.body.appendChild(backdrop);
    void this.element.offsetHeight;
    this.element.classList.add("show");
    backdrop.classList.add("show");
    document.addEventListener("click", this.outsideClickHandler);
    setTimeout(() => {
      this.isTransitioning = false;
    }, 300);
  }
  hide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.element.classList.remove("show");
    const backdrop = document.querySelector(".modal-backdrop.fade.show");
    if (backdrop) {
      backdrop.classList.remove("show");
    }
    const transitionDuration = parseFloat(getComputedStyle(this.element).transitionDuration) * 1e3;
    setTimeout(() => {
      this.element.style.display = "none";
      this.element.setAttribute("aria-hidden", "true");
      this.element.removeAttribute("aria-modal");
      if (backdrop) {
        backdrop.remove();
      }
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.classList.remove("modal-open");
      document.removeEventListener("click", this.outsideClickHandler);
      this.isTransitioning = false;
    }, transitionDuration);
  }
  initializeEventListeners() {
    this.showButtons?.forEach((button) => {
      button.addEventListener("click", () => this.show());
    });
    this.closeButtons?.forEach((button) => {
      button.addEventListener("click", () => this.hide());
    });
  }
  handleOutsideClick(event) {
    if (!this.modalContent.contains(event.target)) {
      this.hide();
    }
  }
}
