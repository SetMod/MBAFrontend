import OrganizationMembers from "../models/OrganizationMembersModel";
import Organizations from "../models/OrganizationsModel";
import { organizationsService } from "../services/OrganizationsService";
import useCRUD from "./useCRUD";
import useState from "./useState";

const ORGANIZATION_STORAGE_KEY = "organization"
const organizationsState = useState<Organizations>()

export default function useOrganizations() {
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
        // getOrganizationMembers,
        // addUserToOrganization,
        // deleteUserFromOrganization,
        createOrganization,
        updateOrganization,
        deleteOrganization,
    }
}