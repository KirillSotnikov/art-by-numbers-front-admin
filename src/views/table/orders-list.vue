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
          placeholder="Search (order number)"
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
      <el-table-column align="center" label="Order Number" width="140" fixed>
        <template slot-scope="scope">
          {{ scope.row.orderNumber | orderNumberFilter }}
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
            width="440"
            trigger="click"
            content="this is content, this is content, this is content"
          >
            <el-table :data="[scope.row.deliveryData]">
              <el-table-column width="100" property="city.ua" label="City"></el-table-column>
              <el-table-column width="300" property="department.ua" label="Відділення"></el-table-column>
            </el-table>
            <el-button slot="reference">
              {{ scope.row.deliveryType | deliveryTypeFilter }}
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="CRM Data" width="180">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            title="CRM data"
            width="240"
            trigger="click"
            content="this is content, this is content, this is content"
          >
            <el-table :data="[scope.row.crmOrderData]">
              <el-table-column width="80" property="id" label="ID"></el-table-column>
              <el-table-column width="120" property="status" label="Status"></el-table-column>
            </el-table>
            <el-button slot="reference">
              CRM order details
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Payment type" width="180">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            title="Payment data"
            width="300"
            trigger="click"
            content="this is content, this is content, this is content"
          >
            <el-table :data="[scope.row.paymentData]">
              <el-table-column width="160" property="id" label="ID"></el-table-column>
              <el-table-column width="100" property="status" label="Status"></el-table-column>
            </el-table>
            <el-button slot="reference">
              {{ scope.row.paymentType | paymentTypeFilter }}
            </el-button>
          </el-popover>
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
              <el-table-column width="100" property="product.articul" label="Articul"></el-table-column>
              <el-table-column width="200" property="product.name.ua" label="Name"></el-table-column>
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
import {orderStatusLabels, orderDeliveryTypeLabels, paymentTypeLabels, orderPaymentDataLabels} from '@/types'

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
    orderNumberFilter(val) {
      const joy = val.match(/.{1,4}/g);
      return joy.join(' ');
    },
    deliveryTypeFilter(val) {
      return orderDeliveryTypeLabels[val];
    },
    paymentTypeFilter(val) {
      return paymentTypeLabels[val];
    },
    paymentDataFilter(val) {
      return orderPaymentDataLabels[val];
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
            || item.orderNumber.toLowerCase().includes(this.search.replace(/\s/g, '').toLowerCase())
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
