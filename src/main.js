import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { createRouter, createWebHashHistory } from 'vue-router'

import Splitter from "primevue/splitter";
import SplitterPanel from 'primevue/splitterpanel';
import Dialog from "primevue/dialog";
import Button from 'primevue/button';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import InputText from 'primevue/inputtext';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Badge from 'primevue/badge';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('./views/Dashboard.vue'),
            meta: { requiresAuth: true }
        }
    ]
})

function isLoggedIn() {
    return true
    // Verifica si hay un token de autenticación en la cookie
    const token = getCookie('token');
    return token !== null;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isLoggedIn()) {
        next({ name: 'login' })
    } else {
        next()
    }
})

createApp(App)
    .component("Dialog", Dialog)
    .component("Button", Button)
    .component("Splitter", Splitter)
    .component("SplitterPanel", SplitterPanel)
    .component("Tabs", Tabs)
    .component("TabList", TabList)
    .component("Tab", Tab)
    .component("Badge", Badge)
    .component("TabPanels", TabPanels)
    .component("TabPanel", TabPanel)
    .component("InputText", InputText)
    .component("Accordion", Accordion)
    .component("AccordionPanel", AccordionPanel)
    .component("AccordionHeader", AccordionHeader)
    .component("AccordionContent", AccordionContent)
    .use(router)
    .use(PrimeVue, {
        theme: {
            preset: Aura
        },

        ripple: true, inputStyle: "outlined",
        locale: {
            startsWith: "Comienza por",
            contains: "Contiene",
            notContains: "No contiene",
            endsWith: "Termina en",
            equals: "Igual a",
            notEquals: "Diferente a",
            noFilter: "Sin Filtro",
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
            dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        }
    })
    .mount('#app')
