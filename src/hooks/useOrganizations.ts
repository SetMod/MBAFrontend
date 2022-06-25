import { reactive, ref, toRefs } from "vue";
import Organizations from "../models/OrganizationsModel";
import UserOrganizations from "../models/UserOrganizationsModel";
import UsersOrganizations from "../models/UsersOrganizationsModel";
import OrganizationsService from "../services/OrganizationsService";

interface OrganizationsState {
    organization: Organizations | undefined,
    organizations: Organizations[] | undefined,
    userOrganizations: UserOrganizations[] | undefined,
}

const state = reactive<OrganizationsState>({
    organization: undefined,
    organizations: undefined,
    userOrganizations: undefined,
})

export default function useOrganizations() {
    const organizationsService = reactive(new OrganizationsService())
    const isLoading = ref(false)

    const resetOrganizations = () => {
        state.organization = undefined
        state.organizations = undefined
        localStorage.removeItem('organization')
    }
    const resetOrganization = () => {
        state.organization = undefined
        localStorage.removeItem('organization')
    }

    const getOrganizations = async () => {
        isLoading.value = true
        const response = await organizationsService.getOrganizations()
        if (Array.isArray(response)) state.organizations = response
        isLoading.value = false

        return response
    }

    const getOrganizationById = async (userId: number) => {
        isLoading.value = true
        const response = await organizationsService.getOrganizationById(userId)
        if (response instanceof Organizations) {
            localStorage.setItem('organization', JSON.stringify(organizationsService.mapOrganizationToData(response)))
        }
        isLoading.value = false

        return response
    }

    const getUserOrganizations = async (userId: number) => {
        isLoading.value = true
        const response = await organizationsService.getUserOrganizations(userId)
        if (Array.isArray(response)) state.userOrganizations = response
        isLoading.value = false

        return response
    }
    const addUserToOrganization = async (usersOrganization: UsersOrganizations) => {
        isLoading.value = true
        const response = await organizationsService.addUserToOrganization(usersOrganization)
        isLoading.value = false

        return response
    }
    const createOrganization = async (newOrganization: Organizations, userId: number) => {
        isLoading.value = true
        const response = await organizationsService.createOrganization(newOrganization, userId)
        isLoading.value = false

        return response
    }

    const updateOrganization = async (updatedOrganization: Organizations) => {
        isLoading.value = true
        const response = await organizationsService.updateOrganization(updatedOrganization)
        isLoading.value = false

        return response
    }

    const deleteOrganization = async (organizationId: number) => {
        isLoading.value = true
        const response = await organizationsService.deleteOrganization(organizationId)
        isLoading.value = false

        return response
    }
    const deleteUserFromOrganization = async (usersOrganization: UsersOrganizations) => {
        isLoading.value = true
        const response = await organizationsService.deleteUserFromOrganization(usersOrganization)
        isLoading.value = false

        return response
    }
    return {
        isOrganizationsLoading: isLoading,
        resetOrganizations,
        resetOrganization,
        getOrganizationById,
        getOrganizations,
        getUserOrganizations,
        addUserToOrganization,
        createOrganization,
        updateOrganization,
        deleteOrganization,
        deleteUserFromOrganization,
        ...toRefs(state)
    }
}