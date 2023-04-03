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
      <el-table-column align="center" label="Order ID" width="100" fixed>
        <template slot-scope="scope">
          {{ scope.row.orderNumber }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Status" width="120">
        <template slot-scope="scope">
          {{ scope.row.status | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Total" width="120">
        <template slot-scope="scope">
          {{ scope.row.total }}₴
        </template>
      </el-table-column>
      <el-table-column align="center" label="Delivery type" width="200">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            title="Delivery details"
            width="300"
            trigger="click"
            content="this is content, this is content, this is content"
          >
            <el-table :data="[scope.row.deliveryData]">
              <el-table-column width="100" property="city" label="City"></el-table-column>
              <el-table-column width="200" property="postOfficeNumber" label="Post office number"></el-table-column>
            </el-table>
            <el-button slot="reference">
              {{ scope.row.deliveryType | deliveryTypeFilter }}
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Payment type" width="150">
        <template slot-scope="scope">
          {{ scope.row.paymentType | paymentTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Products" width="150">
<!--        <template slot-scope="scope">-->
<!--          <p-->
<!--            class="my-0 word-bread"-->
<!--            v-for="(product, index) in scope.row.products"-->
<!--            :key="index"-->
<!--          >-->
<!--            {{ product.item.name }} x{{product.amount}}-->
<!--          </p>-->
<!--        </template>-->
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            title="Order products"
            width="420"
            trigger="click"
            content="this is content, this is content, this is content"
          >
            <el-table :data="scope.row.products">
              <el-table-column width="80" property="amount" label="Amount"></el-table-column>
              <el-table-column width="100" property="item.articul" label="Articul"></el-table-column>
              <el-table-column width="200" property="item.name" label="Name"></el-table-column>
            </el-table>
            <el-button slot="reference">
              {{ scope.row.products.length }} products
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Client data" width="200">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            title="Client details"
            width="640"
            trigger="click"
            content="this is content, this is content, this is content"
          >
            <el-table :data="[scope.row.clientData]">
              <el-table-column width="100" property="firstName" label="Name"></el-table-column>
              <el-table-column width="150" property="lastName" label="Surname"></el-table-column>
              <el-table-column width="150" property="phone" label="Phone"></el-table-column>
              <el-table-column width="200" property="mail" label="Mail"></el-table-column>
            </el-table>
            <el-button slot="reference">
              {{ scope.row.clientData.lastName }} {{ scope.row.clientData.firstName }}
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip label="Comment" width="200">
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
import { getOrdersList } from '@/api/orders'
import { orderStatusLabels, orderDeliveryTypeLabels, paymentTypeLabels } from '@/types'

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
    },
    statusFilter(val) {
      return orderStatusLabels[val];
    },
    deliveryTypeFilter(val) {
      return orderDeliveryTypeLabels[val];
    },
    paymentTypeFilter(val) {
      return paymentTypeLabels[val];
    },
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
      getOrdersList().then(response => {
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
