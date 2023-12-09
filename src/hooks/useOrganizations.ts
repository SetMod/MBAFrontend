import { computed, ref } from "vue";
import OrganizationMembers from "../models/OrganizationMembersModel";
import Organizations from "../models/OrganizationsModel";
import { organizationsService } from "../services/OrganizationsService";
import useCRUD from "./useCRUD";
import useState from "./useState";

const ORGANIZATION_STORAGE_KEY = "organization"
const organizationsState = useState<Organizations>()

const {
    error: organizationsError,
    isLoading: isOrganizationsLoading,
    model: organization,
    models: organizations,
    updatedModel: updatedOrganization,
    newModel: newOrganization,
    deletedModel: deletedOrganization,
    getFromLocalStorage,
    addToLocalStorage,
    removeFromLocalStorage,
    getAllModels: getOrganizations,
    getModelById: getOrganizationById,
    getModelByField: getOrganizationByField,
    getModelsByFields: getOrganizationsByFields,
    createModel: createOrganization,
    updateModel: updateOrganization,
    deleteModel: deleteOrganization,
} = useCRUD(organizationsService, organizationsState, ORGANIZATION_STORAGE_KEY)

const SELECTED_ORGANIZATION_STORAGE_KEY = "selected_organization"
const selectedOrganization = ref<Organizations | null>(getFromLocalStorage(SELECTED_ORGANIZATION_STORAGE_KEY))
const userOrganizations = ref<Organizations[] | null>()

export default function useOrganizations() {

    const selectOrganization = async (orgId: number) => {
        isOrganizationsLoading.value = true
        organizationsError.value = null
        try {
            const organization = await organizationsService.getById(orgId)
            selectedOrganization.value = organization
            addToLocalStorage(organization, SELECTED_ORGANIZATION_STORAGE_KEY)

            return organization
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                organizationsError.value = err
                selectedOrganization.value = null
                removeFromLocalStorage(SELECTED_ORGANIZATION_STORAGE_KEY)
            }
        } finally {
            isOrganizationsLoading.value = false
        }
    }

    const getUserOrganizations = async (userId: number) => {
        isOrganizationsLoading.value = true
        organizationsError.value = null
        try {
            const organizations = await organizationsService.getUserOrganizations(userId)
            userOrganizations.value = organizations

        } catch (err) {
            if (err instanceof Error) {
                organizationsError.value = err
                userOrganizations.value = null
            }
        } finally {
            isOrganizationsLoading.value = false
        }
    }

    // const getOrganizationMembers = async (userId: number) => {
    //     isOrganizationsLoading.value = true
    //     const response = await organizationsService.getOrganizationMembers(userId)
    //     if (Array.isArray(response)) organizationsState.organizationMembers = response
    //     isOrganizationsLoading.value = false

    //     return response
    // }
    // const addUserToOrganization = async (usersOrganization: OrganizationMembers) => {
    //     isOrganizationsLoading.value = true
    //     const response = await organizationsService.addUserToOrganization(usersOrganization)
    //     isOrganizationsLoading.value = false

    //     return response
    // }
    // const deleteUserFromOrganization = async (usersOrganization: OrganizationMembers) => {
    //     isOrganizationsLoading.value = true
    //     const response = await organizationsService.deleteUserFromOrganization(usersOrganization)
    //     isOrganizationsLoading.value = false

    //     return response
    // }
    return {
        selectedOrganization,
        userOrganizations,
        isOrganizationsLoading,
        organizationsError,
        organization,
        organizations,
        updatedOrganization,
        newOrganization,
        deletedOrganization,
        getFromLocalStorage,
        addToLocalStorage,
        removeFromLocalStorage,
        getOrganizations,
        getOrganizationById,
        getOrganizationByField,
        getOrganizationsByFields,
        getUserOrganizations,
        // getOrganizationMembers,
        // addUserToOrganization,
        // deleteUserFromOrganization,
        createOrganization,
        updateOrganization,
        deleteOrganization,
        selectOrganization,
    }
}