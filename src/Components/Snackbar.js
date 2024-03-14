import { Close } from "@mui/icons-material";
import { enqueueSnackbar, closeSnackbar } from "notistack";

export default class SnackbarAlert {
  success(message) {
    enqueueSnackbar(message, {
      variant: "success",
      action: (key) => (
        <Close
          sx={{ cursor: "pointer" }}
          size="small"
          onClick={() => closeSnackbar(key)}
        />
      ),
    });
  }

  info(message) {
    enqueueSnackbar(message, {
      variant: "info",
      action: (key) => (
        <Close
          sx={{ cursor: "pointer" }}
          size="small"
          onClick={() => closeSnackbar(key)}
        />
      ),
    });
  }

  warn(message) {
    enqueueSnackbar(message, {
      variant: "warning",
      action: (key) => (
        <Close
          sx={{ cursor: "pointer" }}
          size="small"
          onClick={() => closeSnackbar(key)}
        />
      ),
    });
  }

  error(message) {
    enqueueSnackbar(message, {
      variant: "error",
      action: (key) => (
        <Close
          sx={{ cursor: "pointer" }}
          size="small"
          onClick={() => closeSnackbar(key)}
        />
      ),
    });
  }

  default(message) {
    enqueueSnackbar(message, {
      variant: "default",
      action: (key) => (
        <Close
          sx={{ cursor: "pointer" }}
          size="small"
          onClick={() => closeSnackbar(key)}
        />
      ),
    });
  }
}
