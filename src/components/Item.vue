<template>

    <div :class="{'has-open-menu':MobileMenuOpened}">
        <header-ele @MenuTrigger="MenuTrigger"></header-ele>
        <div class="loading" v-if="loading">Loading...</div>
        <div class="error" v-if="error">Error</div>
        <div class="details-content" v-if="post">
            <item-photo v-if="post.artType == 'photos'" :info="post"></item-photo>
            <item-article v-if="post.artType == 'normal'" :info="post"></item-article>
        </div>
        <footer-ele></footer-ele>
    </div>

    
</template>
<script>
import axios from 'axios'
import * as config from '../config'

import HeaderEle from "./Header.vue";
import FooterEle from "./Footer.vue";
import ItemPhoto from "./common/ItemPhoto.vue";
import ItemArticle from "./common/ItemArticle.vue";
import * as unity from '../unity'
import myStorage from '../Storage'

export default {
  data() {
    return {
      MobileMenuOpened: false,
      loading: false,
      post: null,
      error: null,
      test:{
          title:"test"
      }
    };
  },
  methods: {
    MenuTrigger: function(status) {
      this.MobileMenuOpened = status;
    },
    fetchData(){
        this.error = this.post = null
        this.loading = true
        axios.get(config.articleApi + this.$route.params.id)
        .then(res=>{
            this.loading = false
            this.post = res.data
            unity.setWebTitle(this.post.title)

            myStorage.addHistory({//添加浏览历史记录
              id:this.post.id,
              title:this.post.title,
              type:this.post.artType,
              times:1,
              timestamp:(new Date()).getTime()
            })

        })
        .catch(err=>{

        })
    }
  },
  components: {
    HeaderEle,
    FooterEle,
    ItemPhoto,
    ItemArticle
  },
  created(){
      this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  }
};
</script>
<style lang="scss">
@import "../scss/reset";
.details-content {
  max-width: $SECTION_WIDTH_MAXIMUM;
  margin:0 auto;
}
</style>


