import { organizationMembersService } from "../services/OrganizationMembersService";
import useCRUD from "./useCRUD";

const ORGANIZATION_MEMBER_STORAGE_KEY = "organizationMember"
export default function useOrganizationMembers() {
    const {
        error: organizationMembersError,
        isLoading: isOrganizationMembersLoading,
        model: organizationMember,
        models: organizationMembers,
        updatedModel: updatedOrganizationMember,
        newModel: newOrganizationMember,
        deletedModel: deletedOrganizationMember,
        getFromLocalStorage,
        addToLocalStorage,
        removeFromLocalStorage,
        getAllModels: getOrganizationMembers,
        getModelById: getOrganizationMemberById,
        getModelByField: getOrganizationMemberByField,
        getModelsByFields: getOrganizationMembersByFields,
        createModel: createOrganizationMember,
        updateModel: updateOrganizationMember,
        deleteModel: deleteOrganizationMember,
    } = useCRUD(organizationMembersService, ORGANIZATION_MEMBER_STORAGE_KEY)

    return {
        isOrganizationMembersLoading,
        organizationMembersError,
        organizationMember,
        organizationMembers,
        updatedOrganizationMember,
        newOrganizationMember,
        deletedOrganizationMember,
        getFromLocalStorage,
        addToLocalStorage,
        removeFromLocalStorage,
        getOrganizationMembers,
        getOrganizationMemberById,
        getOrganizationMemberByField,
        getOrganizationMembersByFields,
        createOrganizationMember,
        updateOrganizationMember,
        deleteOrganizationMember,
    }
}