import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useState } from "react";
type Props = {
  open: boolean;

  handleClose: () => void;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const HomeModal = ({ open = false, handleClose }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (event: unknown) => {
    event.preventDefault();
    console.log(
      `Formulario enviado: ${firstName} ${lastName}, isActive: ${isActive}`
    );
  };
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        open={open}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Nuevo usuario
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <TextField
              id="firstName"
              label="Nombre"
              variant="outlined"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <TextField
              id="lastName"
              label="Apellido"
              variant="outlined"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            <Checkbox
              id="isActive"
              label="¿Activo?"
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
            />
            <Button type="submit" variant="contained">
              Enviar
            </Button>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};
