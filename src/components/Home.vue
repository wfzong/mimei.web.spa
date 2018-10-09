<template>
    <div :class="{'has-open-menu':MobileMenuOpened}">
        <header-ele @MenuTrigger="MenuTrigger"></header-ele>

        <image-section/>
        <article-and-more-section></article-and-more-section>

        <footer-ele/>
    </div>
</template>
<script>
import HeaderEle from "./Header.vue";
import FooterEle from "./Footer.vue";
import ImageSection from "./accessories/ImageSection.vue";
import ArticleAndMoreSection from "./accessories/ArticleAndMoreSection.vue";
import * as unity from "../unity";

export default {
  data() {
    return {
      MobileMenuOpened: false
    };
  },
  methods: {
    MenuTrigger: function(status) {
      this.MobileMenuOpened = status;
    }
  },
  components: {
    HeaderEle,
    FooterEle,
    ImageSection,
    ArticleAndMoreSection
  },
  mounted() {
    unity.setWebTitle("网站首页 - memei.net");
  }
};
</script>

<style lang="scss">

</style>
