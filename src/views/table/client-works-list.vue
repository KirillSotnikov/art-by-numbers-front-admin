<template>
  <div class="app-container">
    <el-dialog
      title="Create product"
      :visible.sync="createDialogVisible"
      @closed="closeCreateDialog"
    >
      <el-form :model="createForm" :rules="rules" ref="createForm" label-width="140px" class="demo-ruleForm">
        <el-form-item label="Nickname" prop="nickname">
          <el-input v-model="createForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="Link" prop="link">
          <el-input v-model="createForm.link"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Image" prop="gallery">
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            :on-change="handleCreateUpload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handleCreatePreview"
            :on-remove="handleCreateRemove"
            :before-remove="beforeCreateRemove"
            :limit="1"
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
        <el-form-item label="Nickname" prop="nickname">
          <el-input v-model="editForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="Link" prop="link">
          <el-input v-model="editForm.link"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Image" prop="gallery">
          <div class="flex-row">
            <img
              :src="workToEdit ? workToEdit.image : ''"
              class="gallery-image"
            >
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </div>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handleEditPreview"
            :on-remove="handleEditRemove"
            :before-remove="beforeEditRemove"
            :limit="1"
            accept="image/*"
          >
            <el-button size="small" type="primary">Click to upload and change</el-button>
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
          placeholder="Search (nickname)"
        />
      </div>
      <el-button @click="openCreateDialog" type="success" plain>Create new client work</el-button>
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
      <el-table-column align="center" label="Nickname" width="250" fixed>
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="Link">
        <template slot-scope="scope">
          <a :href="scope.row.link" target="_blank">
            {{ scope.row.link }}
          </a>
        </template>
      </el-table-column>
      <el-table-column label="Image" width="95">
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            class="gallery-image"
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="Is hidden" width="100">
        <template slot-scope="scope">
          <el-checkbox v-model="!!scope.row.deletedAt" disabled>
            {{scope.row.deletedAt ? 'Yes' : 'No'}}
          </el-checkbox>
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
import { getClientWorksList } from '@/api/client-works'
import FileUpload from 'vue-upload-component'

const initialForm = {
  nickname: '',
  link: '',
}

export default {
  components: {
    FileUpload
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
      fileCreateList: [],
      fileEditList: [],
      // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]


      editDialogVisible: false,
      workToEdit: null,

      rules: {
        nickname: [
          { required: true, message: 'Please input nickname', trigger: 'blur' },
        ],
        link: [
          { required: true, message: 'Please input link', trigger: 'blur' },
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
          this.workToEdit = null;
          this.editForm = initialForm;
          this.editDialogVisible = false;
        }
        if (!this.list) {
          await new Promise((r) => setTimeout(r, 2000));
          if (!this.list) return;
        }
        const work = this.list.find((item) => item.id === val);
        console.log(work);
        if (!work) return;
        this.workToEdit = work;
        this.editForm = {
          nickname: work.nickname,
          link: work.link,
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
            || item.nickname.toLowerCase().includes(this.search.toLowerCase())
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
      getClientWorksList().then(response => {
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
