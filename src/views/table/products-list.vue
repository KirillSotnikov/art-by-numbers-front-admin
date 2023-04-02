<template>
  <div class="app-container">
    <el-dialog
      title="Create product"
      :visible.sync="createDialogVisible"
      @closed="closeCreateDialog"
    >
      <el-form :model="createForm" :rules="rules" ref="createForm" label-width="140px" class="demo-ruleForm">
        <el-form-item label="Articul" prop="articul">
          <el-input v-model="createForm.articul"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Name (UA)" prop="nameUa">
          <el-input v-model="createForm.nameUa"></el-input>
        </el-form-item>
        <el-form-item label="Name (RU)" prop="nameRu">
          <el-input v-model="createForm.nameRu"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Type" prop="type">
          <el-select v-model="createForm.type" placeholder="Product type">
            <el-option
              v-for="(item, index) in Object.values(productTypeEnum)"
              :key="index"
              :label="item | productTypeFilter"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Category" prop="category">
          <el-select v-model="createForm.category" placeholder="Product category">
            <el-option
              v-for="(item, index) in Object.values(categoryEnum)"
              :key="index"
              :label="item | categoryFilter"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Size" prop="size">
          <el-select v-model="createForm.size" placeholder="Product size">
            <el-option
              v-for="(item, index) in Object.values(sizeEnum)"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Difficult" prop="difficult">
          <el-select v-model="createForm.difficult" placeholder="Product difficult">
            <el-option
              v-for="(item, index) in Object.values(difficultEnum)"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="In sale" prop="inSale">
          <el-switch v-model="createForm.inSale"></el-switch>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Price" prop="price">
          <el-input min="0" v-model="createForm.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Discount" prop="discountPrice">
          <el-input min="0" v-model="createForm.discountPrice" type="number"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Description (UA)" prop="descUa">
          <el-input type="textarea" v-model="createForm.descUa"></el-input>
        </el-form-item>
        <el-form-item label="Description (RU)" prop="descRu">
          <el-input type="textarea" v-model="createForm.descRu"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Gallery" prop="gallery">
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            :on-change="handleCreateUpload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handleCreatePreview"
            :on-remove="handleCreateRemove"
            :before-remove="beforeCreateRemove"
            multiple
            accept="image/*"
            :file-list="fileCreateList">
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 2Mb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetCreateForm">Cancel</el-button>
        <el-button type="primary" @click="submitCreateForm">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Edit product"
      :visible.sync="editDialogVisible"
      @closed="closeEditDialog"
    >
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" class="demo-ruleForm">
        <el-form-item label="Articul" prop="articul">
          <el-input v-model="editForm.articul"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Name (UA)" prop="nameUa">
          <el-input v-model="editForm.nameUa"></el-input>
        </el-form-item>
        <el-form-item label="Name (RU)" prop="nameRu">
          <el-input v-model="editForm.nameRu"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Type" prop="type">
          <el-select v-model="editForm.type" placeholder="Product type">
            <el-option
              v-for="(item, index) in Object.values(productTypeEnum)"
              :key="index"
              :label="item | productTypeFilter"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Category" prop="category">
          <el-select v-model="editForm.category" placeholder="Product category">
            <el-option
              v-for="(item, index) in Object.values(categoryEnum)"
              :key="index"
              :label="item | categoryFilter"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Size" prop="size">
          <el-select v-model="editForm.size" placeholder="Product size">
            <el-option
              v-for="(item, index) in Object.values(sizeEnum)"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Difficult" prop="difficult">
          <el-select v-model="editForm.difficult" placeholder="Product difficult">
            <el-option
              v-for="(item, index) in Object.values(difficultEnum)"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="In sale" prop="inSale">
          <el-switch v-model="editForm.inSale"></el-switch>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Price" prop="price">
          <el-input min="0" v-model="editForm.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Discount" prop="discountPrice">
          <el-input min="0" v-model="editForm.discountPrice" type="number"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Description (UA)" prop="descUa">
          <el-input type="textarea" v-model="editForm.descUa"></el-input>
        </el-form-item>
        <el-form-item label="Description (RU)" prop="descRu">
          <el-input type="textarea" v-model="editForm.descRu"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Gallery" prop="gallery">
          <div
            class="flex-row"
            v-for="(item, index) in (productToEdit ? productToEdit.gallery.images : [])"
            :key="index"
          >
            <img
              :src="item"
              class="gallery-image"
            >
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </div>
        </el-form-item>
        <el-form-item label="New images" prop="gallery">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handleEditPreview"
            :on-remove="handleEditRemove"
            :before-remove="beforeEditRemove"
            multiple
            :file-list="fileEditList">
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 2Mb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetEditForm">Cancel</el-button>
        <el-button type="primary" @click="submitEditForm">Confirm</el-button>
      </span>
    </el-dialog>
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
      <el-button @click="openCreateDialog" type="success" plain>Create new product</el-button>
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
          <el-checkbox v-model="!!scope.row.deletedAt" disabled>
            {{scope.row.deletedAt ? 'Yes' : 'No'}}
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip label="Gallery" width="241">
        <template slot-scope="scope">
          <div class="flex-row flex-wrap">
            <img
              v-for="(item, index) in scope.row.gallery.images"
              :key="index"
              :src="item"
              class="gallery-image"
            >
          </div>
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
            <el-button @click="openEditDialog(scope.row.id)" type="primary" plain>Edit</el-button>
            <el-popconfirm
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
import { getList } from '@/api/table'
import FileUpload from 'vue-upload-component'
import {productTypeLabels, categoryLabels, ProductType, Category, ProductSize, Difficult} from '@/types'

const initialForm = {
  nameRu: '',
  nameUa: '',
  articul: '',
  type: ProductType.patriotic,
  category: Category.picture_by_numbers,
  size: ProductSize["30_30"],
  difficult: Difficult.ONE,
  price: 0,
  discountPrice: undefined,
  inSale: false,
  descRu: '',
  descUa: ''
}

export default {
  components: {
    FileUpload
  },
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
    }
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
      search: '',
      createDialogVisible: false,
      productTypeEnum: ProductType,
      categoryEnum: Category,
      sizeEnum: ProductSize,
      difficultEnum: Difficult,
      fileCreateList: [],
      fileEditList: [],
      // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]


      editDialogVisible: false,
      productToEdit: null,

      rules: {
        nameRu: [
          { required: true, message: 'Please input product name (RU)', trigger: 'blur' },
        ],
        nameUa: [
          { required: true, message: 'Please input product name (UA)', trigger: 'blur' },
        ],
        articul: [
          { required: true, message: 'Please input product articul', trigger: 'blur' },
        ],
        type: [
          { required: true, message: 'Please select product type', trigger: 'change' }
        ],
        category: [
          { required: true, message: 'Please select product category', trigger: 'change' }
        ],
        size: [
          { required: true, message: 'Please select product size', trigger: 'change' }
        ],
        difficult: [
          { required: true, message: 'Please select product difficult', trigger: 'change' }
        ],
        price: [
          { required: true, message: 'Please input product price', trigger: 'blur' },
          { min: 1, message: 'Price should be at least 1', trigger: 'blur' },
        ],
        discountPrice: [
          { min: 1, message: 'Price should be at least 1', trigger: 'blur' },
        ],
        descRu: [
          { required: true, message: 'Please input product description (RU)', trigger: 'blur' }
        ],
        descUa: [
          { required: true, message: 'Please input product description (UA)', trigger: 'blur' }
        ],
      },
      createForm: initialForm,
      editForm: initialForm,
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route.query.create': {
      handler(val) {
        this.createDialogVisible = val === 'true';
      },
      immediate: true
    },
    '$route.query.edit': {
      async handler(val) {
        if (!val) {
          this.productToEdit = null;
          this.editForm = initialForm;
          this.editDialogVisible = false;
        }
        if (!this.list) {
          await new Promise((r) => setTimeout(r, 2000));
          if (!this.list) return;
        }
        const product = this.list.find((item) => item.id === val);
        console.log(product);
        if (!product) return;
        this.productToEdit = product;
        this.editForm = {
          articul: product.articul,
          nameRu: product.name,
          nameUa: product.name,
          type: product.type,
          category: product.category,
          size: product.size,
          difficult: product.difficult,
          price: product.price,
          discountPrice: product.discountPrice,
          inSale: product.inSale ?? false,
          descRu: product.description,
          descUa: product.description,
        }
        this.editDialogVisible = true;
      },
      immediate: true
    },
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
    handleCreateRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleCreatePreview(file) {
      console.log('handleCreatePreview', file);
    },
    handleCreateUpload(file) {
      const limit = 1024 * 1024 * 2;
      if (file.size > limit) {
        this.$message.error('Image size is larger than 2Mb');
      }
      console.log('handleCreateUpload', file);
    },
    beforeCreateRemove(file, fileList) {
      return this.$confirm(`Do you want to remove ${ file.name } ?`);
    },
    handleEditRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleEditPreview(file) {
      console.log(file);
    },
    beforeEditRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
    },
    submitCreateForm() {
      this.$refs.createForm.validate((valid) => {
        if (valid) {
          alert('submit!');
          this.closeCreateDialog();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetCreateForm() {
      this.$refs.createForm.resetFields();
      this.closeCreateDialog();
    },
    submitEditForm() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          alert('submit!');
          this.closeEditDialog();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetEditForm() {
      this.$refs.editForm.resetFields();
      this.closeEditDialog();
    },
    openCreateDialog() {
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, create: 'true' } })
    },
    closeCreateDialog() {
      const newQueryParams = {
        ...this.$route.query,
        create: undefined,
      };
      this.$router.push({
        path: this.$route.path,
        query: newQueryParams,
      })
    },
    openEditDialog(id) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, edit: id }
      })
    },
    closeEditDialog() {
      const newQueryParams = {
        ...this.$route.query,
        edit: undefined,
      };
      this.$router.push({
        path: this.$route.path,
        query: newQueryParams,
      })
    },
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
