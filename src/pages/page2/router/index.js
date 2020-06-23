import Vue from 'vue'
import VueRouter from 'vue-router'
import base from './base'

Vue.use(VueRouter)

 const createRouter = () => new VueRouter({
    // mode:'history',
    base:process.env.BASE_URL,
    routes: [
       ...base,
    ],
})
const Router = createRouter()

Router.resetRouter = ()=>{
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

export default Router