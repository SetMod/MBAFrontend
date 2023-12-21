import { RouteRecordRaw } from "vue-router"
import Visualizations from './views/Visualizations.vue'
import Visualization from './views/Visualization.vue'
import VisualizationHome from './views/VisualizationHome.vue'

export const OrganizationVisualizationsRoute: RouteRecordRaw = {
    path: 'visualizations',
    component: Visualizations,
    props: true,
}

// export const OrganizationVisualizationCreateRoute: RouteRecordRaw = {
//     path: 'report/create',
//     component: VisualizationCreate,
//     props: true,
// }

export const OrganizationVisualizationRoutes: RouteRecordRaw = {
    path: 'visualizations/:visualizationId',
    component: Visualization,
    children: [
        {
            path: '',
            component: VisualizationHome,
            props: true,
        }
    ]
}

export default {
    OrganizationVisualizationsRoute,
    OrganizationVisualizationRoutes,
}