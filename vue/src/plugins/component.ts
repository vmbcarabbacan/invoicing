import { App } from "vue"

/**
 * Imported Components
 */

// Forms
import Signin from '@/components/Forms/Signin.vue'

// reusables
import Table from '@/components/Table.vue'

export function components (app: App<Element>) {

    const data = [
        { key: 'vc-sign-in', component: Signin },
        { key: 'vc-table', component: Table },
    ]

    data.forEach(element => app.component(element.key, element.component));
}
