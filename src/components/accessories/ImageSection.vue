<template>
    <section-fream section-title="推荐图集">
        <div class="loading" v-if="loading">loading...</div>
        <div class="error" v-if="error">error</div>
        <image-list v-if="dataReady" :imgList="imgList"></image-list>
        <magic-button title="查看更多图集" :link="{path:'/list',query:{arttype:'photos'}}"></magic-button>
    </section-fream>
</template>

<script>
/* 
* 这里处理所有数据，并传递给子组件
* 子组件接收数据、显示
*/
import SectionFream from '../common/SectionFream.vue'
import ImageList from "../common/ImageList"
import MagicButton from "../common/MagicButton"

import axios from 'axios'
import * as config from '../../config'

export default {
    data() {
        return {
            loading: true,
            error:false,
            imgList:null
        }
    },
    components: {
        SectionFream,
        ImageList,
        MagicButton
    },
    created() {
        this.dataReady = true
        axios.get(config.articleApi, {
            params: {
                "artType": "photos",
                "recommend":1,
                "limit": 4
            }
        })
            .then((res) => {
                this.loading = false
                //console.log(res)
                this.imgList = res.data.list
            })
            .catch(err => {
                this.loading = this.imgList = false
                this.error = true
                //console.log(err)
            })
    }
}
</script>
<style lang="scss">
.loading {
    text-align: center;
}
</style>
