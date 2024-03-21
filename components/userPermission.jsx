import { instanceOfAxios } from "./others/localstorage";

function UserPermission() {
  
  instanceOfAxios.get(`permissions/` + localStorage.getItem("user_id")).then((response) => {
    console.log(response.data.data.plan, "data form user permission")
  });
}

export default UserPermission;
