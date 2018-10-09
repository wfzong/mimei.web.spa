import 'es6-promise/auto';

import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state:{
        initLogin:false,
        token:null,
        userInfo:null
    },
    mutations,
    getters,
    actions,
    strict: debug,
    plugins: debug ? [] : []
})