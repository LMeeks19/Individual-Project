import { Close } from "@mui/icons-material";
import { enqueueSnackbar, closeSnackbar } from "notistack";

// Class that allows gor the queueing of alerts with various styles

export default class SnackbarAlert {
  queueAlert(varient, message) {
    enqueueSnackbar(message, {
      variant: varient,
      autoHideDuration: "2000",
      action: (key) => (
        <Close
          sx={{ cursor: "pointer" }}
          size="small"
          onClick={() => closeSnackbar(key)}
        />
      ),
    });
  }

  success(message) {
    this.queueAlert("success", message);
  }

  info(message) {
    this.queueAlert("info", message);
  }

  warn(message) {
    this.queueAlert("warning", message);
  }

  error(message) {
    this.queueAlert("error", message);
  }

  default(message) {
    this.queueAlert("default", message);
  }
}
