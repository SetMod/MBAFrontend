import { RouteRecordRaw } from "vue-router";
import Analyzes from './views/Analyzes.vue'
import Analyze from './views/Analyze.vue'
import AnalyzeHome from './views/AnalyzeHome.vue'

export const OrganizationAnalyzesRoute: RouteRecordRaw = {
    path: 'analyzes',
    component: Analyzes,
    props: true,
}

export const OrganizationAnalyzeRoutes: RouteRecordRaw = {
    path: 'analyze/:analyzeId',
    component: Analyze,
    children: [
        {
            path: '',
            component: AnalyzeHome,
            props: true,
        }
    ]
}

export default {
    OrganizationAnalyzesRoute,
    OrganizationAnalyzeRoutes,
}
