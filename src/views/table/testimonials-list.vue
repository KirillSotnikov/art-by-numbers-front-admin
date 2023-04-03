<template>
  <div class="app-container">
    <div class="flex-row justify-between">
      <div class="flex-row">
        <el-checkbox v-model="showHidden">
          Show hidden
        </el-checkbox>
      </div>
      <div>
        <el-input
          v-model="search"
          size="small"
          placeholder="Search (name)"
        />
      </div>
      <div></div>
    </div>
    <el-divider></el-divider>
    <el-table
      v-loading="listLoading"
      :data="displayList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      height="70vh"
    >
      <el-table-column align="center" label="Product" width="100" fixed>
        <template slot-scope="scope">
          <a
            :href="`http://localhost:3000/product/${scope.row.product.id}`"
            class="word-bread"
            target="_blank"
          >
            {{ scope.row.product.name }}
          </a>
        </template>
      </el-table-column>
      <el-table-column label="Name" width="300">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Rate" width="120">
        <template slot-scope="scope">
          <p class="word-bread">
            {{ scope.row.rate }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Comment">
        <template slot-scope="scope">
          <p class="word-bread">
          {{ scope.row.comment }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Created at" width="120">
        <template slot-scope="scope">
          <p class="word-bread">
          {{ scope.row.createdAt | dateFilter }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Is hidden" width="100">
        <template slot-scope="scope">
          <el-checkbox v-model="!!scope.row.deletedAt" disabled>
            {{scope.row.deletedAt ? 'Yes' : 'No'}}
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="Actions" width="100">
        <template slot-scope="scope">
          <div class="flex-row">
            <el-popconfirm
              v-if="scope.row.deletedAt"
              title="Are you sure to show this?"
              confirm-button-text='OK'
              cancel-button-text='No, Thanks'
              icon="el-icon-info"
              icon-color="red"
            >
              <el-button slot="reference" type="info" plain>Show</el-button>
            </el-popconfirm>
            <el-popconfirm
              v-else
              title="Are you sure to hide this?"
              confirm-button-text='OK'
              cancel-button-text='No, Thanks'
              icon="el-icon-info"
              icon-color="red"
            >
              <el-button slot="reference" type="danger" plain>Hide</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getTestionialsList } from '@/api/testimonials'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      displayList: null,
      page: 1,
      pageSize: 10,
      total: 0,
      showHidden: true,
      search: '',
    }
  },
  created() {
    this.fetchData()
  },
  filters: {
    dateFilter(val) {
      const d = new Date(val);
      return d.toLocaleString()
    }
  },
  watch: {
    search: {
      handler() {
        this.page = 1;
        this.handleListPagination();
      },
    },
    showHidden: {
      handler() {
        this.page = 1;
        this.handleListPagination();
      },
    },
    page: {
      handler() {
        this.handleListPagination();
      },
      immediate: true
    },
    list: {
      handler() {
        this.handleListPagination();
      },
    },
  },
  methods: {
    getDisplayData() {
      if (this.list) {
        const filteredSearch = [...this.list].filter((item) => {
          return !this.search
            || item.name.toLowerCase().includes(this.search.toLowerCase())
        });
        const filteredHidden = filteredSearch.filter((item) => {
          return this.showHidden ? item : !item.deletedAt;
        })
        const filtered = filteredHidden;
        return {
          total: filtered.length,
          list: filtered.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page),
        }
      }
      return { total: 0, list: null };
    },
    handleListPagination() {
      if (this.list) {
        const displayData = this.getDisplayData();
        this.total = displayData.total;
        this.displayList = displayData.list;
        return;
      }
      this.displayList = null
    },
    fetchData() {
      this.listLoading = true
      getTestionialsList().then(response => {
        console.log(response.data);
        this.list = response.data
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.page = val;
    },
  }
}
</script>
<style lang="scss" scoped>
.gallery-image{
  width: 63px;
  height: 63px;
  margin: 5px;
  border-radius: 5px;
}

.my-0{
  margin-top: 0;
  margin-bottom: 0;
}
.word-bread{
  word-break: break-word;
}
.flex-row{
  display: flex;
  align-items: center;
}
.justify-between{
  justify-content: space-between;
}
.flex-wrap{
  flex-wrap: wrap;
}
.upload-button{
  background-color: #409EFF;
  color: white;
  padding: 0.5rem;
  font-family: sans-serif;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-top: 1rem;
}
</style>
