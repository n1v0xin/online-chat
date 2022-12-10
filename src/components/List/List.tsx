import React from "react";
import { socket } from "../../constants/api";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { loadUsers } from "../../redux/reducers/usersSlice";
import "./list.scss";

const List = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.list);
  const currentUser = useAppSelector(
    (state) =>
      state.users.list[
        state.users.list.findIndex((user) => user.id === socket.id)
      ]
  );

  React.useEffect(() => {
    socket.on("update_user_list", (users) => {
      dispatch(loadUsers(users));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, users]);

  return (
    <div className="list">
      <div className="list__title">List online:</div>

      {users.length
        ? users.map((user) => {
            return (
              <div className="list__item" key={user.id}>
                {user.nickname}
                {currentUser?.id === user.id ? " (you)" : null}
                {user?.isTyping ? " (typing...)" : null}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default List;
