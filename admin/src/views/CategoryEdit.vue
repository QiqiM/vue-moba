<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parent"  :key="item._id"
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parent: []
    };
  },
  methods: {
    async save() {
      let res;  
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: res.data
      });
    },
    async fecth() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchparent() {
      // eslint-disable-next-line
      const res = await this.$http.get("rest/categories");   
      this.parent = res.data;
      console.log(this.parent)
    }
  },
  created() {
    this.fetchparent();
    this.id && this.fecth();
  }
};
</script>
