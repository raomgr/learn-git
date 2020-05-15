<template>
  <div class="search">
    <el-select v-model="region" placeholder="请选择">
      <el-option
        v-for="item in regionList"
        :key="item.regionId"
        :label="item.regionName"
        :value="item.regionId">
      </el-option>
    </el-select>
    <div class="input-box">
      <el-input v-model="keyword" placeholder="姓名/邮箱" size="medium"></el-input>
    </div>
    <el-button>搜索</el-button>
  </div>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {
        region: '',
        regionList: [
          {
            regionId: 1,
            regionName: '北京'
          },
          {
            regionId: 2,
            regionName: '贵州'
          }
        ],
        keyword: ''
      }
    }
  }
</script>

<style lang="less" scoped>
.search{
  display: flex;
  margin-bottom: 30px;
  .input-box{
    margin: 0 20px;
  }
}
  .search /deep/ .el-button{
    color: #17caaa;
  }
</style>
