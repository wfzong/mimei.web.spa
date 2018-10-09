<template>
    <div :class="{'has-open-menu':MobileMenuOpened}">
        <header-ele @MenuTrigger="MenuTrigger"></header-ele>
        <div class="list-title">
            <h2 v-if="!this.catInfo">图片及文章列表</h2>
            <h2 v-if="this.catInfo">{{this.catInfo.title}}</h2>
        </div>
        <list-element v-if="listData" :list="listData"></list-element>

        <div class="error" v-if="error">ERROR</div>
        <div class="loading" v-if="loading">loading...</div>

        <footer-ele></footer-ele>
    </div>
</template>


<script>
import axios from "axios";
import * as config from "../config";

import HeaderEle from "./Header.vue";
import FooterEle from "./Footer.vue";
import ListElement from "./common/ListArticleAndImage.vue";
import * as unity from "../unity";

export default {
  data() {
    return {
      MobileMenuOpened: false,
      loading: true,
      error: false,
      listData: null,
      catInfo:null
    };
  },
  methods: {
    MenuTrigger: function(status) {
      this.MobileMenuOpened = status;
    },
    fetchData() {
      axios
        .get(config.articleApi, {
          params: {
            artType:
              ["normal", "photos"].indexOf(this.$route.query.arttype) < 0
                ? null
                : this.$route.query.arttype,
            recommend: parseInt(this.$route.query.recommend),
            categories:parseInt(this.$route.query.categories)
            //limit: 4
          }
        })
        .then(res => {
          this.loading = false;
          //console.log(res);
          this.listData = res.data.list;
          this.catInfo = res.data.categoryInfo;
        })
        .catch(err => {
          this.loading = this.listData = false;
          this.error = true;
          //console.log(err);
        });
    }
  },
  components: {
    HeaderEle,
    FooterEle,
    ListElement
  },
  created() {
    this.fetchData();
  },
  watch:{
      '$route': 'fetchData'
  }
};
</script>

<style lang="scss">
@import "../scss/reset";
.list-title {
  max-width: $SECTION_WIDTH_MAXIMUM;
  margin: 0 auto;

  @include min-screen($SECTION_WIDTH_LARGE) {
    padding: $PADDING_X_LARGE $PADDING_X_LARGE 0 $PADDING_X_LARGE;
  }
  @include screen($SECTION_WIDTH_MEDIUM,$SECTION_WIDTH_LARGE) {
    padding: $PADDING_MEDIUM $PADDING_MEDIUM 0 $PADDING_MEDIUM;
  }
  @include max-screen($SECTION_WIDTH_MEDIUM) {
    padding: $PADDING_X_SMALL $PADDING_X_SMALL 0 $PADDING_X_SMALL;
  }
}
</style>
