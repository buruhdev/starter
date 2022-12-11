import { DefineComponent } from "vue";

export interface Route {
    path: string,
    component: DefineComponent,
    name?: string
}
