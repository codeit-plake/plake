export const setupModalRoot = () => {
  beforeAll(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  afterAll(() => {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });
};
