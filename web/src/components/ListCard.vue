<template>
  <div class="">
    <card :title="title" :icon="icon">
      <div class="nav jc-between">
        <div
          class="nav-item"
          :class="{ active: active === i }"
          v-for="(category, i) in categories"
          :key="i"
          @click = "active = i"
        >
          <div class="nav-link">{{category.name}}</div>
        </div>
      </div>

      <div class="pt-3">
        <swiper>
          <swiper-slide v-for="(category, i) in categories" :key="i">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </card>
  </div>
</template>

<script>
import Card from "./Card";
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
        active: 0
    };
  },
  components: {
    Card,
  },
};
</script>

<style lang="scss" scoped></style>
