<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="讲师名"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="searchObj.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table :data="list">
        <!-- 表格 -->
      <el-tablev-loading="listLoading" :data="list"  element-loading-text="数据加载中" border fit highlight-current-row>

      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (pageNbr - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="gmtModified" label="修改时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageNbr"
      :page-size="pageSize"
      :total="totalNbr"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"/>
  </div>
</template>

<script>
import teacher from '@/api/edu/teacher'
export default {
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      pageNbr: 1, // 当前页码页码
      pageSize: 10, // 当前页记录数
      totalNbr: 0,
      totalSize: 0, // 总记录数
      searchObj: {},// 查询条件
    }
  },

  created() { // 当页面加载时获取数据
    this.fetchData()
  },

  methods: {
    fetchData(pageNbr = 1) { // 调用api层获取数据库中的数据
      console.log('加载列表')
      this.pageNbr = pageNbr
      this.listLoading = true
      teacher.getPageList(this.pageNbr, this.pageSize, this.searchObj).then(response => {
        // debugger 设置断点调试
        if (response.success === true) {
          console.log(response.data)
          this.list = response.data.rows
          this.totalNbr = response.data.totalNbr
          this.totalSize = response.data.totalSize
        }
        this.listLoading = false
      })
    },
    //逻辑删除
    removeDataById(id) {
        // debugger
        // console.log(memberId)
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            return teacher.removeById(id)
        }).then(() => {
            this.fetchData()
            this.$message({
                type: 'success',
                message: '删除成功!'
            })
        }).catch((response) => { // 失败
            if (response === 'cancel') {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            } else {
              this.$message({
                  type: 'error',
                  message: '删除失败'
              })
            }
        })
    },
    //清空搜索框
    resetData() {
        this.searchObj = {}
        this.fetchData()
    }
  }
}
// eslint-disable-next-line eol-last
</script>