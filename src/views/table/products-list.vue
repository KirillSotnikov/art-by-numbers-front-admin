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
          size="mini"
          placeholder="Search (name, articul)"
        />
      </div>
      <el-button type="success" plain>Create new product</el-button>
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
      <el-table-column align="center" label="Articul" width="100" fixed>
        <template slot-scope="scope">
          <p class="word-bread">
            {{ scope.row.articul }}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="Name" width="300">
        <template slot-scope="scope">
          <p class="my-0 word-bread">
            RU: {{ scope.row.name }}
          </p>
          <p class="my-0 word-bread">
            UA: {{ scope.row.name }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Category" width="120">
        <template slot-scope="scope">
          <p class="word-bread">
            {{ scope.row.category | categoryFilter }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Type" width="120">
        <template slot-scope="scope">
          <p class="word-bread">
          {{ scope.row.type | productTypeFilter }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Size" width="80">
        <template slot-scope="scope">
          <p class="word-bread">
          {{ scope.row.size }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Price" width="80">
        <template slot-scope="scope">
          <p class="word-bread">
          {{ scope.row.price }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Discount price" width="90">
        <template slot-scope="scope">
          <p class="word-bread">
            {{ scope.row.discountPrice }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Difficult" width="80">
        <template slot-scope="scope">
          <p class="word-bread">
          {{ scope.row.difficult }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Is in sale" width="100">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.inSale" disabled>
            {{scope.row.inSale ? 'Yes' : 'No'}}
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Is hidden" width="100">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.deletedAt" disabled>
            {{scope.row.deletedAt ? 'Yes' : 'No'}}
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip label="Description" width="200">
        <template slot-scope="scope">
          <p class="word-bread">
          {{ scope.row.description }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="Actions" width="170">
        <template slot-scope="scope">
          <div class="flex-row">
            <el-button type="primary" plain>Edit</el-button>
            <el-button type="danger" plain>Hide</el-button>
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
import { getList } from '@/api/table'
import { productTypeLabels, categoryLabels } from '@/types'

export default {
  filters: {
    productTypeFilter(type) {
      return productTypeLabels[type]
    },
    categoryFilter(category) {
      return categoryLabels[category]
    },
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      displayList: null,
      page: 1,
      pageSize: 10,
      total: 0,
      showHidden: true,
      search: ''
    }
  },
  created() {
    this.fetchData()
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
            || item.articul.toLowerCase().includes(this.search.toLowerCase())
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
      getList().then(response => {
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
</style>
