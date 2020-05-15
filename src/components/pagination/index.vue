<template>
  <div class="pagination-wrapper">
    <span class="info">显示第 {{beginCount}} 到第 {{endCount}} 条记录, 总共 {{totalCount}} 条记录</span>
    <div class="pagination-right">
      <el-pagination
        background
        @size-change="changePageSize"
        @current-change="changeCurrentPage"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pagination",
    props: {
      beginCount: {
        type: [Number, String],
        required: true
      },
      endCount: {
        type: [Number, String],
        required: true
      },
      currentPage: {
        type: [Number, String],
        required: true,
        default: 1
      },
      pageSize: {
        type: [Number, String],
        required: true,
        default: 10
      },
      totalCount: {
        type: [Number, String],
        required: true,
        default: 0
      }
    },
    methods: {
      changePageSize(val) {
        this.$emit('propPageSize', val)
      },
      changeCurrentPage(val) {
        this.$emit('propCurrentPage', val)
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination-wrapper {
    height: 25px;
    line-height: 25px;
    /*padding-bottom: 30px;*/

    .info {
      color: #A1A6B1;
      font-size: 14px;
    }

    .pagination-right {
      float: right;
    }
  }
  .pagination-wrapper /deep/ .el-pagination.is-background {
    .el-pager {
      .number {
        color: #283550;
        background: #fff;
      }

      .number.active {
        background: #17caaa;
        color: #fff;
      }
    }

    .btn-prev, .btn-next {
      background: #fff;
      border: 1px solid rgb(225, 227, 228);
      border-radius: 2px;
    }
  }
</style>
