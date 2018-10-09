<template>
    <section-fream section-title="文章推荐">
        <div class="section_content">
            <article-list :artList="list"></article-list>
            <list-more></list-more>
        </div>
    </section-fream>
</template>
<script>
import SectionFream from '../common/SectionFream.vue'
import ArticleList from '../common/ArticleList.vue'
import ListMore from '../common/ListMore.vue'

import axios from 'axios'
import * as config from '../../config'

export default {
    data(){
        return {
            loading: true,
            error:false,
            list:null
        }
    },
    components:{
        SectionFream,
        ArticleList,
        ListMore
    },
    created() {
        this.dataReady = true
        axios.get(config.articleApi, {
            params: {
                "artType": "normal",
                "recommend":1,
                "limit": 4
            }
        })
            .then((res) => {
                this.loading = false
                //console.log(res)
                this.list = res.data.list
            })
            .catch(err => {
                this.loading = this.list = false
                this.error = true
                //console.log(err)
            })
    }
}

</script>

<style lang="scss">
@import "../../scss/common/variable";
@import "../../scss/common/mixin";

.section_content {
    max-width: $SECTION_WIDTH_MAXIMUM;
    margin: 0 auto;
    display: table;
}
</style>