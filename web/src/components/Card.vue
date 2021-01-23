<template>
  <div class="">
    <div class="card p-3 mt-3 bg-white">
      <div class="card-header d-flex ai-center pb-3">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="fs-xl flex-1 px-2">{{ title }}</div>
        <i class="iconfont icon-sandian"></i>
      </div>

      <!-- <hr /> -->
      <div class="card-body pt-3">
          <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String, required: true},
    icon: {type: String, required: true}
  },
  data() {
    return {};
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.card{
    .card-header{
        border-bottom: 1px solid $border-color; 
    }
}
</style>
