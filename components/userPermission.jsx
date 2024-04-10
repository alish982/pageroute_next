import { instanceOfAxios } from "./others/localstorage";

function UserPermission() {
  instanceOfAxios
    .get(`permissions/` + localStorage.getItem("user_id"))
    .then((response) => {});
}

export default UserPermission;
