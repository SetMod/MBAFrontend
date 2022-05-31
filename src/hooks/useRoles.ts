import { reactive, toRefs } from "vue"
import Roles from "../models/RolesModel"
import Users from "../models/UsersModel";
import { roleService } from "../services/RolesService";

interface RolesState {
    roles: Roles[] | undefined
}
const state = reactive<RolesState>({
    roles: undefined
})

export default function useRoles() {
    const getRoles = () => {
        roleService.getAllRoles().then((roles) => {
            if (roles) state.roles = roles
        })
    }
    const getUserRole = (user: Users | undefined) => {
        if (Array.isArray(state.roles) && user instanceof Users) {
            return state.roles.find((role) => role.roleId === user.roleId)?.roleName
        }
        else return 'User'
    }

    return {
        getRoles,
        getUserRole,
        ...toRefs(state)
    }
}