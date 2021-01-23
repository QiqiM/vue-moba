<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/35cecaa91d00f10783c9fba1bd7088c7.jpeg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/998eb31ae1b7511672169603a0d72b43.jpeg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/be696f15192d84f6c2e14386aa8f8392.jpeg"
          alt=""
        />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-2"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-warp">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
        <div class="sprite sprite-arrow mr-1"></div>
        <span>收起</span>
      </div>
    </div>

    <!-- end of nav icons -->
    <!-- <card title="新闻资讯" icon="cc-menu-circle">
      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
      </div>

      <div class="pt-3">
        <swiper>
          <swiper-slide v-for="m in 5" :key="m">
            <div class="py-2" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>【星元部件爆料】公孙离-觅星灵兔</span>
              <span>07/05</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </card> -->

    <ListCard title="新闻资讯" icon="cc-menu-circle" :categories="newsCats">
      <!-- 在父组件中拿到子组件循环的数据 -->
      <!-- 写法1 -->
      <!-- #items="{category}" 等价于 v-slot:items="{category}" -->
      <template #items="{category}">
        <div class="py-2" v-for="(news, i) in category.newsList" :key="i">
          <span>[{{ news.categoryName }}]</span>
          <span>|</span>
          <span>{{ news.title }}</span>
          <span>{{ news.date }}</span>
        </div>
      </template>
    </ListCard>
    <!-- <card title="精彩视频" icon="cc-menu-circle"> </card> -->

    <ListCard title="精彩视频" icon="cc-menu-circle" :categories="newsCats">
      <!-- 在父组件中拿到子组件循环的数据 -->
      <!-- 写法1 -->
      <!-- #items="{category}" 等价于 v-slot:items="{category}" -->
      <template #items="{category}">
        <div class="py-2" v-for="(news, i) in category.newsList" :key="i">
          <span>[{{ news.categoryName }}]</span>
          <span>|</span>
          <span>{{ news.title }}</span>
          <span>{{ news.date }}</span>
        </div>
      </template>
    </ListCard>
  </div>
</template>

<script>
/* eslint-disable */
import Card from "../components/Card";
import ListCard from "../components/ListCard";

export default {
  data() {
    return {
      swiperOptions: {
        autoplay: true,
        loop: true,
        pagination: {
          el: ".pagination-home",
        },
        // Some Swiper option/callback...
      },
      newsCats: [
        {
          name: "热门",
          newsList: new Array(5).fill(1).map((v) => {
            return {
              categoryName: "公告",
              title: "6月2号全服不停服更新公告",
              date: "06/01",
            };
          }),
        },
        {
          name: "新闻",
          newsList: new Array(5).fill(1).map((v) => {
            return {
              categoryName: "新闻",
              title: "6月2号全服不停服更新公告",
              date: "06/01",
            };
          }),
        },
        {
          name: "活动",
          newsList: new Array(5).fill(1).map((v) => {
            return {
              categoryName: "公告",
              title: "6月2号全服不停服更新公告",
              date: "06/01",
            };
          }),
        },
        {
          name: "赛事",
          newsList: new Array(5).fill(1).map((v) => {
            return {
              categoryName: "公告",
              title: "6月2号全服不停服更新公告",
              date: "06/01",
            };
          }),
        },
        {
          name: "视频",
          newsList: new Array(5).fill(1).map((v) => {
            return {
              categoryName: "公告",
              title: "6月2号全服不停服更新公告",
              date: "06/01",
            };
          }),
        },
      ],
    };
  },
  components: {
    Card,
    ListCard,
  },
};
</script>

<style lang="scss">
// 导入scss文件
@import "../assets/scss/_variables.scss";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1; // 透明度，不要透明
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    // m /4 余 0
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
