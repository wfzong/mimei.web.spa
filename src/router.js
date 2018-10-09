import Home from './components/Home.vue'
const News = () => import('./components/News.vue')
import AuthLayout from './components/AuthLayout.vue'
import Login from './components/common/Login.vue'
import Register from './components/common/Register.vue'
import UserCenter from './components/UserCenter.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import Privacy from './components/Privacy.vue'
import Copyright from './components/Copyright.vue'
//import Posts from './components/Posts.vue'//发布、编辑文章
const Posts = () => import('./components/Posts.vue')
const Item = () => import('./components/Item.vue')
const List = () => import('./components/List.vue')

import auth from "./auth"

export default {
	mode: 'history',
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/news",
            component: News
        },
        {
            path: "/list",
            component: List
        },
        {
            path:"/item/:id",
            component:Item
        },
        {
            path: "/user",
            component:UserCenter,
            beforeEnter:requireAuth,
        },
        {
            path: "/about",
            component:About
        },
        {
            path: "/contact",
            component:Contact
        },
        {
            path: "/privacy",
            component:Privacy
        },
        {
            path: "/copyright",
            component:Copyright
        },
        {
            path:"/user/posts",
            component:Posts
        },
        {
            path: "/auth",
            component:AuthLayout,
            children:[
                {
                    path:"login",
                    component:Login,
                    beforeEnter:requireNotAuth
                },
                {
                    path:"register",
                    component:Register,
                    beforeEnter:requireNotAuth
                },
                {
                    path: "logout",//退出登录
                    beforeEnter:(to, from, next) => {
                        auth.logout(function(){
                            console.log("out")
                        })
                        next({path:"/",query:{"action":"logout"}})
                    }
                }
            ]
        }
    ]
}

function requireAuth (to, from, next){//限定，用户登录后才能访问
    if(!auth.loggedIn()){
        next({
            path:"/auth/login",
            query:{
                redirect: to.fullPath
            }
        })
    } else {
        next()
    }
}

function requireNotAuth (to, from, next) {//限定，用户非登录状态下才能访问
    if(auth.loggedIn()){
        alert("您已经登录了，不用重复登录")
        next({path:"/user"})
    } else {
        next()
    }   
}
