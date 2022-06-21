import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import Button from 'primevue/button';
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog'
import Editor from 'primevue/editor';
import FileUpload from 'primevue/fileupload';
import Message from 'primevue/message';
import PrimeVue from 'primevue/config'
import Toolbar from 'primevue/toolbar'
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber'
import Column from 'primevue/column';
import ToastService from 'primevue/toastservice';
import Toast from "primevue/toast";
import Password from "primevue/password";
import Tooltip from 'primevue/tooltip';

const app = createApp(App);

app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)

app.directive('tooltip', Tooltip);

app.component('Button', Button);
app.component('Chart', Chart);
app.component('Column', Column);
app.component('Dialog', Dialog);
app.component('DataTable', DataTable);
app.component('Dropdown', Dropdown);
app.component('Editor', Editor);
app.component('FileUpload', FileUpload);
app.component('Textarea', Textarea);
app.component('Toast', Toast);
app.component('Toolbar', Toolbar);
app.component('Message', Message);
app.component('InputText', InputText);
app.component('InputMask', InputMask);
app.component('InputNumber', InputNumber);
app.component('Password', Password);

app.mount('#app')
