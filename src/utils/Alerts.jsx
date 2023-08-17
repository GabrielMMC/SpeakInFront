import { toast } from "react-toastify";

export function renderToast({ type, message, position, theme }) {
  toast[type](message, {
    position: position || "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme || "light",
  });
}