import { RouteRecordRaw } from "vue-router"
import Datasources from './views/Datasources.vue'
import Datasource from './views/Datasource.vue'
import DatasourceHome from './views/DatasourceHome.vue'

export const OrganizationDatasourcesRoute: RouteRecordRaw = {
    path: 'datasources',
    component: Datasources,
    props: true,
}

export const OrganizationDatasourceRoutes: RouteRecordRaw = {
    path: 'datasource/:datasourceId',
    component: Datasource,
    children: [
        {
            path: '',
            component: DatasourceHome,
            props: true,
        }
    ]
}

export default {
    OrganizationDatasourcesRoute,
    OrganizationDatasourceRoutes,
}