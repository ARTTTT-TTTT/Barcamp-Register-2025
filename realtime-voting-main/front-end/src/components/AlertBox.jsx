import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions } from "@mui/material";

function AlertBox({ content, alert, callbackClose }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(alert);
    }, [alert]);

    const handdleClose = () => {
        setOpen(false);
        callbackClose();
    };

    return (
        <Dialog open={open} onClose={() => {}} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "700", fontSize: 24, fontFamily: "Noto Sans Thai" }}>
                แจ้งเตือน
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ fontSize: 16, fontFamily: "Noto Sans Thai" }}>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ mt: -1, justifyContent: "center" }}>
                <Button
                    sx={{
                        minHeight: "32px",
                        minWidth: "270px",
                        borderRadius: "0.7rem",
                        px: "6rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                    }}
                    color="error"
                    variant="contained"
                    onClick={handdleClose}
                    autoFocus
                >
                    ปิด
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertBox;
