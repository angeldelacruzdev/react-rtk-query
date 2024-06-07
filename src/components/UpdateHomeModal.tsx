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

import { useGetUserQuery, useUpdateUserMutation } from "../services/users.api";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
type Props = {
  open: boolean;
  id: number | null;
  handleClose: () => void;
};

type Inputs = {
  firstName: string;
  lastName: string;
  isActive: boolean;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const UpdateHomeModal = ({ open = false, id, handleClose }: Props) => {
  const { register, handleSubmit, control, setValue, reset } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      isActive: false,
    },
  });
  const {
    data: user,
    isLoading,
    isSuccess,
  } = useGetUserQuery(id, { skip: !id, refetchOnMountOrArgChange: true });

  const [updateUser, { error }] = useUpdateUserMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (id) await updateUser({ id, ...data }).then(() => reset());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess && user) {
      (Object.keys(user) as Array<keyof Inputs>).forEach((key) => {
        setValue(key, user[key]);
      });
    }
  }, [isSuccess, user, setValue]);

  if (isLoading) return <>Is loading...</>;

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="firstName"
              label="Nombre"
              variant="outlined"
              {...register("firstName")}
            />
            <TextField
              id="lastName"
              label="Apellido"
              variant="outlined"
              {...register("lastName")}
            />

            <Controller
              name="isActive"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Checkbox {...field} />}
            />
            <Button type="submit" variant="contained">
              Enviar
            </Button>
          </form>
          {JSON.stringify(error)}
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};
