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
        <el-form-item label="CRM product ID" prop="crmProductId">
          <el-input v-model="createForm.crmProductId"></el-input>
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
        <el-form-item label="Label" prop="labelEnabled">
          <el-switch v-model="createForm.labelEnabled"></el-switch>
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
            list-type="picture"
            accept="image/*"
            :file-list="fileCreateList"
          >
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
          <el-input disabled v-model="editForm.articul"></el-input>
        </el-form-item>
        <el-form-item label="CRM product ID" prop="crmProductId">
          <el-input disabled v-model="editForm.crmProductId"></el-input>
        </el-form-item>
        <el-form-item label="CRM name" prop="crmName">
          <el-input disabled v-model="editForm.crmName"></el-input>
        </el-form-item>
        <el-form-item label="CRM description" prop="crmDescription">
          <el-input disabled v-model="editForm.crmDescription"></el-input>
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
        <el-form-item label="Label" prop="labelEnabled">
          <el-switch v-model="editForm.labelEnabled"></el-switch>
        </el-form-item>
        <el-form-item v-if="editForm.labelEnabled" label="Label type" prop="labelData.type">
          <el-select v-model="editForm.labelData.type" placeholder="labelData type">
            <el-option
              v-for="(item, index) in Object.values(labelTypeEnum)"
              :key="index"
              :label="item | labelTypeFilter"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="editForm.labelEnabled && editForm.labelData.type === labelTypeEnum.SALE" label="Sale untill" prop="labelData.until">
          <el-date-picker
            :picker-options="datePickerOptions"
            v-model="editForm.labelData.until"
            type="datetime"
            placeholder="Select date and time">
          </el-date-picker>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Price" prop="price">
          <el-input min="0" v-model.number="editForm.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Discount" prop="discountPrice">
          <el-input min="0" v-model.number="editForm.discountPrice" type="number"></el-input>
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
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            :on-change="handleEditUpload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-remove="handleEditRemove"
            :before-remove="beforeEditRemove"
            multiple
            list-type="picture"
            accept="image/*"
            :file-list="fileEditList"
          >
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
          size="small"
          placeholder="Search (name, articul, crm ID)"
        />
      </div>
      <div class="flex-row">
        <el-button @click="forceSrcSync" type="plain" plain>Force CRM sync</el-button>
        <!--      <el-button @click="openCreateDialog" type="success" plain>Create new product</el-button>-->
      </div>
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
            RU: {{ scope.row.name.ru }}
          </p>
          <p class="my-0 word-bread">
            UA: {{ scope.row.name.ua }}
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
      <el-table-column align="center" label="CRM ID" width="90">
        <template slot-scope="scope">
          <p class="word-bread">
          {{ scope.row.crmProductId }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Price" width="80">
        <template slot-scope="scope">
          <p class="word-bread">
          {{ scope.row.price }}₴
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Discount price" width="90">
        <template slot-scope="scope">
          <p v-if="scope.row.discountPrice" class="word-bread">
            {{ scope.row.discountPrice }}₴
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
      <el-table-column align="center" label="Label" width="100">
        <template slot-scope="scope">
          <p v-if="scope.row.labelData" class="word-bread">
            {{ scope.row.labelData.type | labelTypeFilter }}
          </p>
          <p v-if="scope.row.labelData && scope.row.labelData.type === labelTypeEnum.SALE" class="word-bread">
            {{ scope.row.labelData.until | labelUntilFilter }}
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
            RU: {{ scope.row.description.ru }}
          </p>
          <p class="word-bread">
            UA: {{ scope.row.description.ua }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="Actions" width="170">
        <template slot-scope="scope">
          <div class="flex-row">
            <el-button @click="openEditDialog(scope.row.id)" type="primary" plain>Edit</el-button>
            <el-popconfirm
              v-if="scope.row.deletedAt"
              title="Are you sure to show this?"
              confirm-button-text='OK'
              cancel-button-text='No, Thanks'
              icon="el-icon-info"
              icon-color="red"
              @onConfirm="restoreProduct(scope.row.id)"
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
              @onConfirm="hideProduct(scope.row.id)"
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
import { getProductList, addProduct, hideProduct, restoreProduct, editProduct, crmSync } from '@/api/products'
import FileUpload from 'vue-upload-component'
import {
  productTypeLabels,
  categoryLabels,
  ProductType,
  Category,
  ProductSize,
  Difficult,
  labelTypeLabels, LabelType
} from '@/types'
import {uploadImage} from "@/api/image-upload";


const initialForm = {
  nameRu: '',
  nameUa: '',
  crmProductId: '',
  crmName: '',
  crmDescription: '',
  articul: '',
  type: ProductType.patriotic,
  category: Category.picture_by_numbers,
  size: ProductSize["30_30"],
  difficult: Difficult.ONE,
  price: 0,
  discountPrice: undefined,
  labelEnabled: false,
  descRu: '',
  descUa: '',
  labelData: {
    type: LabelType.NEW,
    until: Date.now() + 60 * 60 * 1000,
  },
}

export default {
  components: {
    FileUpload
  },
  filters: {
    labelTypeFilter(labelType) {
      return labelTypeLabels[labelType];
    },
    labelUntilFilter(until) {
      return new Date(until).toLocaleString();
    },
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
      datePickerOptions: {
        disabledDate (date) {
          return date < new Date()
        }
      },
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
      labelTypeEnum: LabelType,
      fileCreateList: [],
      fileEditList: [],
      // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]


      editDialogVisible: false,
      productToEdit: null,

      rules: {
        nameRu: [
          { required: true, message: 'Please input product name (RU)', trigger: 'blur' },
        ],
        crmProductId: [
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
        // price: [
        //   { type: 'number', message: 'age must be a number', trigger: 'blur' },
        //   { required: true, message: 'Please input product price', trigger: 'blur' },
        //   { pattern: /^\d{1}$/, message: 'Price should be at least 1', trigger: 'blur' },
        // ],
        price: [
          { validator: this.checkPrice, trigger: 'blur' }
        ],
        discountPrice: [
          { validator: this.checkDiscountPrice, trigger: 'blur' },
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
          await new Promise((r) => setTimeout(r, 3000));
          if (!this.list) return;
        }
        const product = this.list.find((item) => item.id === val);
        console.log('product', product);
        if (!product) return;
        this.productToEdit = product;
        this.editForm = {
          articul: product.articul,
          crmProductId: product.crmProductId,
          crmName: product.crmName,
          crmDescription: product.crmDescription,
          nameRu: product.name.ru,
          nameUa: product.name.ua,
          type: product.type,
          category: product.category,
          size: product.size,
          difficult: product.difficult,
          price: product.price.toString(),
          discountPrice: product.discountPrice ? product.discountPrice.toString() : undefined,
          labelEnabled: !!product.labelData ?? false,
          labelData: product.labelData ?? initialForm.labelData,
          descRu: product.description.ru,
          descUa: product.description.ua,
        }
        this.fileEditList = product.gallery.images.map((imageUrl) => {
          const filename = imageUrl.replace(/^.*[\\\/]/, '');
          return {
            name: filename,
            url: imageUrl,
          }
        })
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
    async forceSrcSync() {
      await crmSync();
      this.$message('Data will be synced in 1 minute')
    },
    handleCreateRemove(file, fileList) {
      this.fileCreateList = fileList;
    },
    handleCreatePreview(file) {
      console.log('handleCreatePreview', file);
    },
    async handleCreateUpload(file) {
      const res = await uploadImage(file.raw);
      const imageUrl = res.data.imageUrl
      const filename = imageUrl.replace(/^.*[\\\/]/, '')
      this.fileCreateList = [
        ...this.fileCreateList,
        {
          name: filename,
          url: imageUrl,
        }
      ]
    },
    async handleEditUpload(file) {
      const res = await uploadImage(file.raw);
      const imageUrl = res.data.imageUrl
      const filename = imageUrl.replace(/^.*[\\\/]/, '')
      this.fileEditList = [
        ...this.fileEditList,
        {
          name: filename,
          url: imageUrl,
        }
      ]
    },
    beforeCreateRemove(file, fileList) {
      return this.$confirm(`Do you want to remove ${ file.name } ?`);
    },
    handleEditRemove(file, fileList) {
      this.fileEditList = fileList;
    },
    handleEditPreview(file) {
      console.log(file);
    },
    beforeEditRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
    },
    async submitCreateForm() {
      this.$refs.createForm.validate(async (valid) => {
        if (valid) {
          const dto = {
            type: this.createForm.type,
            articul: this.createForm.articul,
            crmProductId: this.createForm.crmProductId,
            size: this.createForm.size,
            difficult: this.createForm.difficult,
            description: {
              ua: this.createForm.descUa,
              ru: this.createForm.descRu,
            },
            name: {
              ua: this.createForm.nameUa,
              ru: this.createForm.nameRu,
            },
            price: Number(this.createForm.price),
            category: this.createForm.category,
            discountPrice: this.createForm.discountPrice ? Number(this.createForm.discountPrice) : undefined,
            gallery: {
              images: this.fileCreateList.map((item) => item.url),
            }
          };
          const res = await addProduct(dto);
          this.list = [res.data, ...this.list]
          this.closeCreateDialog();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async hideProduct(id) {
      await hideProduct(id);
      this.list = this.list.map((item) => item.id === id ? { ...item, deletedAt: Date.now() } : item)
    },
    async restoreProduct(id) {
      await restoreProduct(id);
      this.list = this.list.map((item) => item.id === id ? { ...item, deletedAt: null } : item)
    },
    resetCreateForm() {
      this.$refs.createForm.resetFields();
      this.closeCreateDialog();
    },
    async submitEditForm() {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          const dto = {
            type: this.editForm.type,
            articul: this.editForm.articul,
            crmProductId: this.editForm.crmProductId,
            size: this.editForm.size,
            difficult: this.editForm.difficult,
            description: {
              ua: this.editForm.descUa,
              ru: this.editForm.descRu,
            },
            name: {
              ua: this.editForm.nameUa,
              ru: this.editForm.nameRu,
            },
            price: Number(this.editForm.price),
            category: this.editForm.category,
            labelData: this.editForm.labelEnabled
              ? this.editForm.labelData.type === LabelType.SALE
                ? { type: this.editForm.labelData.type, until: new Date(this.editForm.labelData.until).getTime() }
                : { type: this.editForm.labelData.type }
              : undefined,
            discountPrice: this.editForm.discountPrice ? Number(this.editForm.discountPrice) : undefined,
            gallery: {
              images: this.fileEditList.map((item) => item.url),
            }
          };
          const res = await editProduct(this.productToEdit.id, dto);
          this.list = this.list.map((item) => item.id === this.productToEdit.id ? res.data : item)
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
    checkPrice(rule, value, callback) {
      if (!value) {
        return callback(new Error('Please input the price'));
      }
      const price = Number(value);
      if (!Number.isInteger(price)) {
        return callback(new Error('Please input digits'));
      } else {
        if (price < 1) {
          return callback(new Error('Price must be greater than 1'));
        } else {
          return callback();
        }
      }
    },
    checkDiscountPrice(rule, value, callback) {
      if (value) {
        const price = Number(value);
        if (!Number.isInteger(price)) {
          return callback(new Error('Please input digits'));
        } else {
          if (price >= this.editForm.price) {
            return callback(new Error(`Discount price must be less than ${this.editForm.price}`));
          } else {
            return callback();
          }
        }
      }
      return callback();
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
      this.createForm = initialForm;
      this.fileCreateList = [];
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
      this.editForm = initialForm;
      this.fileEditList = [];
    },
    getDisplayData() {
      if (this.list) {
        const filteredSearch = [...this.list].filter((item) => {
          return !this.search
            || item.name.ua.toLowerCase().includes(this.search.toLowerCase())
            || item.name.ru.toLowerCase().includes(this.search.toLowerCase())
            || item.articul.toLowerCase().includes(this.search.toLowerCase())
            || item.crmProductId.toLowerCase().includes(this.search.toLowerCase())
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
      getProductList().then(response => {
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
