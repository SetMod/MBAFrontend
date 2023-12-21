import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import Badge from 'primevue/badge';
import Breadcrumb from 'primevue/breadcrumb';
import Button from 'primevue/button';
import Chart from 'primevue/chart';
import Column from 'primevue/column';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import Editor from 'primevue/editor';
import Fieldset from 'primevue/fieldset';
import FileUpload from 'primevue/fileupload';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext';
import MegaMenu from "primevue/megamenu"
import Menu from 'primevue/menu';
import Menubar from "primevue/menubar"
import Message from 'primevue/message';
import PanelMenu from 'primevue/panelmenu';
import Password from "primevue/password";
import PrimeVue from 'primevue/config'
import ProgressSpinner from 'primevue/progressspinner';
import ScrollPanel from 'primevue/scrollpanel';
import ScrollTop from 'primevue/scrolltop';
import Sidebar from 'primevue/sidebar';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea'
import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';
import Toolbar from 'primevue/toolbar'
import Tooltip from 'primevue/tooltip';
import Card from 'primevue/card';

import 'primevue/resources/themes/lara-light-green/theme.css'
import "primeicons/primeicons.css";
// import 'primevue/resources/themes/soho-dark/theme.css'
// import 'primevue/resources/themes/soho-light/theme.css'

const app = createApp(App);

app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.use(ConfirmationService);

app.directive('tooltip', Tooltip);

app.component('Card', Card);
app.component('Badge', Badge);
app.component('Breadcrumb', Breadcrumb);
app.component('Button', Button);
app.component('Chart', Chart);
app.component('Column', Column);
app.component('ConfirmDialog', ConfirmDialog);
app.component('DataTable', DataTable);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('Dialog', Dialog);
app.component('Divider', Divider);
app.component('Dropdown', Dropdown);
app.component('Editor', Editor);
app.component('Fieldset', Fieldset);
app.component('FileUpload', FileUpload);
app.component('InputMask', InputMask);
app.component('InputNumber', InputNumber);
app.component('InputText', InputText);
app.component('MegaMenu', MegaMenu);
app.component('Menu', Menu);
app.component('Menubar', Menubar);
app.component('Message', Message);
app.component('PanelMenu', PanelMenu);
app.component('Password', Password);
app.component('ProgressSpinner', ProgressSpinner);
app.component('ScrollPanel', ScrollPanel);
app.component('ScrollTop', ScrollTop);
app.component('Sidebar', Sidebar);
app.component('TabPanel', TabPanel);
app.component('TabView', TabView);
app.component('Tag', Tag);
app.component('Textarea', Textarea);
app.component('Toast', Toast);
app.component('Toolbar', Toolbar);

app.mount('#app')
