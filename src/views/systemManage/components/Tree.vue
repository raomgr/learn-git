<template>
  <div class="tree-component">
    <el-tree
      :data="treeList"
      show-checkbox
      default-expand-all
      :expand-on-click-node="false"
      :default-checked-keys="defaultCheckedList"
      node-key="id"
      ref="tree"
      check-on-click-node
      @check-change="getKeys"
      highlight-current
      :props="defaultProps">
    </el-tree>
    <!--<div class="buttons">-->
    <!--<el-button @click="getCheckedNodes">通过 node 获取</el-button>-->
    <!--<el-button @click="getKeys">通过 key 获取</el-button>-->
    <!--<el-button @click="setCheckedNodes">通过 node 设置</el-button>-->
    <!--<el-button @click="setCheckedKeys">通过 key 设置</el-button>-->
    <!--<el-button @click="resetChecked">清空</el-button>-->
    <!--</div>-->
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Tree",
    // props: {
    //   treeList: {
    //     type: Array,
    //     default() {
    //       return []
    //     },
    //     required: true
    //   }
    // },
    data() {
      return {
        treeList: [],
        defaultCheckedList: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
      }
    },
    computed: {
      ...mapState('roleManage', ['roleInfo', 'panelType'])
    },
    methods: {

      getKeys() {
        var aKey = this.getCheckedKeys(this.treeList, this.$refs.tree.getCheckedKeys(), 'id');
        // console.log(aKey.reverse());
        this.$store.dispatch('roleManage/handlePermissionIdList', {idList: aKey})
      },

      getCheckedKeys(data, keys, key) {
        var res = [];
        recursion(data, false);
        return res;

        // arr -> 树形总数据
        // keys -> getCheckedKeys获取到的选中key值
        // isChild -> 用来判断是否是子节点
        function recursion(arr, isChild) {
          var aCheck = [];
          for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            aCheck[i] = false;

            if (obj.children) {
              aCheck[i] = recursion(obj.children, true) ? true : aCheck[i];
              if (aCheck[i]) {
                res.push(obj[key]);
              }
            }

            for (var j = 0; j < keys.length; j++) {
              if (obj[key] === keys[j]) {
                aCheck[i] = true;
                if (res.indexOf(obj[key]) === -1) {
                  res.push(obj[key]);
                }
                break;
              }
            }
          }
          if (isChild) {
            return aCheck.indexOf(true) !== -1;
          }
        }
      },

      setSelect(list) {
        console.log(list)
        list.forEach(item => {
          if (item.status == 1) {

            this.$refs.tree.setChecked(item, true);
            // this.list.push(item)
            if (item.children) {
              this.setSelect(item.children)
            }
          }
        })
      },

      getDefault(list) {
        list.map(item => {
          if(item.status === 1) {
            if(item.children) {
              item.children.map(child => {
                if(child.status === 1) {
                  this.defaultCheckedList.push(child.id)
                  if(child.children) {
                    this.getDefault(child.children)
                  }
                }
              })
            } else {
              this.defaultCheckedList.push(item)
            }
          }
        })
      }
    },

    mounted() {
      if(this.panelType === 'createRole') {
        this.$request.getTreeList({
          type: 1,
          roleId: ''
        }).then(res => {
          this.treeList = res.treeList
        })
      }

      if(this.panelType === 'modifyPermission') {
        this.$request.getTreeList({
          type: 2,
          roleId: this.roleInfo.id
        }).then(res => {
          this.treeList = res.treeList
          this.getDefault(this.treeList)
        })
      }

      // this.setSelect(this.treeList)

      // setTimeout(this.setSelect(this.testList), 5000)


    }
  }
</script>

<style scoped lang="less">
  .tree-component {
    padding-left: 100px;
  }

  .tree-component /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #1793ca;
    border-color: #1793ca;
  }

  .tree-component /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #1793ca;
    border-color: #1793ca;
  }

  .tree-component /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #1793ca;
  }

  .tree-component /deep/ .el-checkbox__inner:hover {
    border-color: #1793ca;
  }

  .tree-component /deep/ .el-checkbox:last-of-type {
    margin-right: 10px;
  }

  .el-tree-node__label {
    position: relative;
  }

  .el-tree-node__label:before {
    content: '';
    width: 20px;
    height: 20px;
    display: block;
    position: absolute;
    top: 0;
    left: -24px;
    z-index: 999;
  }

  .el-checkbox__inner {
    top: 0;
  }
</style>
