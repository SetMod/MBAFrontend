import { reactive, toRefs } from "vue"
import OrganizationRoles from "../models/OrganizationRolesModel"
import { organizationRolesService } from "../services/OrganizationRolesService"

interface OrganizationsRolesState {
    organizationRoles: OrganizationRoles[] | undefined
}

const state = reactive<OrganizationsRolesState>({
    organizationRoles: undefined
})

export default function useOrganizationRoles() {
    const getOrganizationsRoles = () => {
        organizationRolesService.getAllOrganizationRoles().then((organizationRoles => {
            if (organizationRoles instanceof String) alert(organizationRoles)
            else if (Array.isArray(organizationRoles)) state.organizationRoles = organizationRoles
        }))
    }
    return {
        getOrganizationsRoles,
        ...toRefs(state)
    }
}