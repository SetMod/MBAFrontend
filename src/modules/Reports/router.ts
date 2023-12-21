import { RouteRecordRaw } from "vue-router"
import Reports from './views/Reports.vue'
import Report from './views/Report.vue'
import ReportCreate from './views/ReportCreate.vue'
import ReportHome from './views/ReportHome.vue'

export const OrganizationReportsRoute: RouteRecordRaw = {
    path: 'reports',
    component: Reports,
    props: true,
}

export const OrganizationReportCreateRoute: RouteRecordRaw = {
    path: 'report/create',
    component: ReportCreate,
    props: true,
}

export const OrganizationReportRoutes: RouteRecordRaw = {
    path: 'report/:reportId',
    component: Report,
    children: [
        {
            path: '',
            component: ReportHome,
            props: true,
        }
    ]
}

export default {
    OrganizationReportsRoute,
    OrganizationReportCreateRoute,
    OrganizationReportRoutes,
}