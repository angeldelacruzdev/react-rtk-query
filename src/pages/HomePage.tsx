import { Box, Button, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { HomeModal } from "../components/HomeModal";
import { useGetUsersQuery } from "../services/users.api";
import { ListUsers } from "../components/ListUsers";

const HomePage = () => {
  const {
    data: users,
    error,
    isLoading,
    isFetching,
    isError,
  } = useGetUsersQuery({});

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading || isFetching) return <div>Is Loading</div>;
  if (isError) return <div>Error Ocurred: {JSON.stringify(error)}</div>;

  return (
    <Container maxWidth="lg" className="bg-gray-500">
      <Box component={"section"} className="bg-gray-700">
        <Grid container spacing={2}>
          <Grid xs={8}>
            <h1 className="font-bold text-red-400">Lista de usuarios</h1>
          </Grid>
          <Grid xs={4}>
            <div className="bg-red-500">
              <Button variant="outlined" onClick={handleClickOpen}>
                Nuevo Usuario
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid container xs={1}>
          <Grid>
            <HomeModal open={open} handleClose={handleClose} />
          </Grid>
        </Grid>
      </Box>
      <ListUsers users={users} />
    </Container>
  );
};

export default HomePage;
