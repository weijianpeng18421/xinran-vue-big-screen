import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

// 引入全局css
import './assets/scss/style.scss';

// 按需引入fontawesome
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faChartBar, faChartArea, faChartPie, faChartLine, faAlignLeft} from '@fortawesome/free-solid-svg-icons'/* fontawesome免费的三种类型icon 其他两种暂时不用 */
// import {faPenToSquare} from '@fortawesome/free-regular-svg-icons'
// import {faTwitter} from '@fortawesome/free-brands-svg-icons'
library.add(faChartBar, faChartArea, faChartPie, faChartLine, faAlignLeft)/* 添加icons到库中 */

// 全局引入DataVVue3 (官方DataV暂时不支持vue3+vite)
import dataVVue3 from '@kjgl77/datav-vue3'

const app = createApp(App)
    .component('icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.use(dataVVue3)

app.mount('#app')
