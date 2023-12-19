import { RouteRecordRaw } from "vue-router";
import Organization from './views/Organization.vue'
import Organizations from './views/Organizations.vue'
import OrganizationHome from './views/OrganizationHome.vue'
import OrganizationSettings from './views/OrganizationSettings.vue'
import MembersModule from '../Members'
import DatasourcesModule from '../Datasources'
import AnalyzesModule from '../Analyzes'
import ReportsModule from '../Reports'

export const UserOrganizationsRoute: RouteRecordRaw = {
    path: 'organizations',
    component: Organizations,
    props: true,
}

export const OrganizationRoutes: RouteRecordRaw = {
    path: "/organization/:orgId",
    component: Organization,
    children: [
        {
            path: '',
            component: OrganizationHome,
            props: true,
        },
        {
            path: 'settings',
            component: OrganizationSettings,
            props: true,
        },
        MembersModule.MemberRoutes.OrganizationMembersRoute,
        MembersModule.MemberRoutes.OrganizationMemberRoutes,
        DatasourcesModule.DatasourceRoutes.OrganizationDatasourceRoutes,
        DatasourcesModule.DatasourceRoutes.OrganizationDatasourcesRoute,
        AnalyzesModule.AnalyzeRoutes.OrganizationAnalyzeRoutes,
        AnalyzesModule.AnalyzeRoutes.OrganizationAnalyzesRoute,
        ReportsModule.ReportRoutes.OrganizationReportRoutes,
        ReportsModule.ReportRoutes.OrganizationReportsRoute,
        ReportsModule.ReportRoutes.OrganizationReportCreateRoute,
    ]
}

export default {
    OrganizationRoutes,
    UserOrganizationsRoute
}
