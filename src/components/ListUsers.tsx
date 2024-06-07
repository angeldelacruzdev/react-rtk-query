import React from "react";
import { ResponseUserDto } from "../services/dto/response-users.dto";
import { useDeleteUserMutation } from "../services/users.api";
import { UpdateHomeModal } from "./UpdateHomeModal";

type props = {
  users: ResponseUserDto[] | undefined;
};

export const ReListUsers = React.memo(({ users }: props) => {
  const [deleteUser] = useDeleteUserMutation();

  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState<number | null>(null);

  const handleOpenModal = (id: number) => {
    setOpen(true);
    if (id != null) setUserId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(users)

  return (
    <>
      {users && (
        <ul>
          {users?.map((user) => (
            <li key={user.id}>
              {user.firstName} - {user.lastName}
              <button onClick={() => deleteUser(user.id)}>"Delete"</button>
              <button
                className="bg-red-100"
                onClick={() => handleOpenModal(user.id)}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      )}

      {userId && (
        <UpdateHomeModal open={open} id={userId} handleClose={handleClose} />
      )}
    </>
  );
});
