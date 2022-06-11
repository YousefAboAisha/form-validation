import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  const [open, setOpen] = React.useState(true);

  return (
    <Stack spacing={2} sx={{ width: "100%", direction: "rtl" }}>
      <Snackbar open={open} autoHideDuration={3000}>
        <Alert
          severity="success"
          sx={{
            width: "100%",
            direction: "rtl",
            gap: "10px",
            padding: "5px 15px",
            backgroundColor: "var(--blue) !important",
          }}
        >
          {props.msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
