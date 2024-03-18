<template>
  <div>
    <p>请选择或新建知识库</p>
    <el-select v-model="docLibName" placeholder="请选择或新建知识库" @click="getDocLibList">
      <el-option
        v-for="item in docLibList"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <div v-if="docLibName==='新建知识库'">
      <p>新建知识库</p>
      <el-input v-model="docLibName" placeholder="请输入知识库名称"></el-input>
    </div>
    <div>
      <p>上传知识库</p>
      <upload-file v-model:uploadFiles="uploadFiles"/>
    </div>
    <div>
      <div>
        <i>文本段最大长度   </i>
        <el-input-number v-model="textMaxLength" controls-position="right"/>
      </div>
      <div>
        <i>文本段最大重合长度     </i>
        <el-input-number v-model="textMaxOverlap" controls-position="right"/>
      </div>
      <div>
        <el-button type="primary" @click="uploadFileToDocLib">上传文件到文档库</el-button>
        <el-button type="info">取消</el-button>
        <el-button type="danger">删除文档库</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" height="250">
      <el-table-column prop="id" label="序号" width="70"></el-table-column>
      <el-table-column prop="name" label="文档名称" width="100"></el-table-column>
      <el-table-column prop="fileLoader" label="文档加载器" width="120"></el-table-column>
      <el-table-column prop="textSplitter" label="分词器" width="120"></el-table-column>
      <el-table-column prop="segmentNumber" label="文本段数量" width="70"></el-table-column>
      <el-table-column prop="status" label="向量库状态" width="70"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="downloadDoc(scope.$index, scope.row)">
            <icon-download-one size="15"/>
          </el-button>
          <el-button type="danger" size="small" @click="deleteDoc(scope.$index, scope.row)">
            <icon-delete-one size="15"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination layout="prev, pager, next" :page-count="totalPage" :current-page="curPage" :page-size='10' @current-change="changePage" style="margin: 10px;"/>
    </div>
  </div>
</template>

<script lang="ts">
import UploadFile from "@/util/uploadFiles.vue"
import {onMounted, ref} from "vue";
import {ElTable} from "element-plus";
import {saveAs} from "file-saver";
import {
  DownloadOne as IconDownloadOne,
  DeleteOne as IconDeleteOne,
} from "@icon-park/vue-next";
export default {
  name: "docLib",
  components: {UploadFile, IconDownloadOne, IconDeleteOne},
  setup(_props) {
    const docLibList = ref([])
    const docLibName = ref('')
    const uploadFiles = ref([])
    const textMaxLength = ref(100)
    const textMaxOverlap = ref(10)
    const tableData = ref([])
    const curPage = ref(1)
    const totalPage = ref(1)
    const getDocLibList = () => {
      // todo: 调用 api 获取知识库列表
      docLibList.value = ['新建知识库', '知识库1', '知识库2', '知识库3']
    }
    const getTableList = () => {
      // todo: 调用 api 获取当前页数据
      tableData.value = [
        {
          id: 1,
          name: '文档1',
          fileLoader: 'fileLoader1',
          textSplitter: 'textSplitter1',
          segmentNumber: 100,
          status: '已加载'
        },
        {
          id: 2,
          name: '文档2',
          fileLoader: 'fileLoader2',
          textSplitter: 'textSplitter2',
          segmentNumber: 200,
          status: '已加载'
        },
        {
          id: 3,
          name: '文档3',
          fileLoader: 'fileLoader3',
          textSplitter: 'textSplitter3',
          segmentNumber: 300,
          status: '已加载'
        }
      ]
    }
    const uploadFileToDocLib = () => {
      // 调用 api 上传文件到文档库
    }
    const changePage = (currentPage) => {
      curPage.value = currentPage
      getTableList()
    }
    const downloadDoc = (index, row) => {
      saveAs(row['docURL'], row['name'])
    }
    const deleteDoc = (index, row) => {
      // todo: 调用 api 删除文档
      // todo: 删除成功后重新获取当前页数据
    }
    onMounted(() => {
      getDocLibList()
      getTableList()
    })
    return {
      docLibList,
      docLibName,
      uploadFiles,
      textMaxLength,
      textMaxOverlap,
      tableData,
      curPage,
      totalPage,
      getDocLibList,
      uploadFileToDocLib,
      changePage,
      downloadDoc,
      deleteDoc,
    }
  }
}
</script>

<style scoped>

</style>