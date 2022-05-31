import { reactive, ref, toRefs } from "vue";
import Organizations from "../models/OrganizationsModel";
import { organizationService } from "../services/OrganizationsService";

interface OrganizationsState {
    organization: Organizations | undefined,
    organizations: Organizations[] | undefined
}

const state = reactive<OrganizationsState>({
    organization: undefined,
    organizations: undefined
})

export default function useOrganizations() {
    const isOrganizationsLoading = ref(false)
    const getAllOrganizations = () => {
        isOrganizationsLoading.value = true
        organizationService.getAllOrganizations().then((organizations) => {
            if (organizations instanceof String) alert(organizations)
            else if (Array.isArray(organizations)) state.organizations = organizations
        }).finally(() => isOrganizationsLoading.value = false)
    }
    return {
        isOrganizationsLoading,
        getAllOrganizations,
        ...toRefs(state)
    }
}