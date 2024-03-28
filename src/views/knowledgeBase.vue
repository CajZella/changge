<template>
  <div style="margin-top: 8vh">
    <p style="font-weight: bold">请选择或新建知识库:</p>
    <el-select v-model="kbName" size="large">
      <el-option
        v-for="item in kbList"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <div v-if="kbName==='新建知识库'" class="createKB">
      <p style="font-weight: bold">新建知识库名称</p>
      <el-input v-model="createKBname" placeholder="请输入知识库名称" size="large"></el-input>
      <div style="margin-top: 20px;">
        <i style="font-weight: bold; margin-right: 1vw">向量库类型</i>
        <el-select v-model="createVecType" style="width: 220px; margin-right: 5vw">
          <el-option v-for="item in vecTypeList" :key="item" :label="item" :value="item"/>
        </el-select>
        <i style="font-weight: bold; margin-right: 1vw">Embedding 模型</i>
        <el-select v-model="createEmbedModel" style="width: 220px">
          <el-option v-for="item in embedModelList" :key="item" :label="item" :value="item"/>
        </el-select>
      </div>
      <el-button color="#4e2fd1"
                 @click="handleCreateKB"
                 style="width: 770px; margin-top: 20px;box-shadow: 0 0 3px #4e2fd1;"
                 size="large">
        <i style="font-weight: bold">新  建</i>
      </el-button>
    </div>
    <div style="margin-top: 5vh">
      <p style="font-weight: bold">上传知识文件</p>
      <upload-file v-model:uploadFiles="uploadFiles"/>
      <div class="fileSetting">
        <p style="font-weight: bold">文本处理配置</p>
        <div style="display:flex;">
          <div style="flex: 1">
            <p>单段文本最大长度</p>
            <el-input-number v-model="chunkSize"/>
          </div>
          <div style="flex: 1">
            <p>文本段最大重合长度</p>
            <el-input-number v-model="chunkOverlap"/>
          </div>
        </div>
      </div>
      <div style="margin-top: 1vh;">
        <el-button color="#4e2fd1"
                   @click="handleUploadFiles"
                     style="width: 800px; margin-top: 1vw;box-shadow: 0 0 3px #4e2fd1;"
                   size="large">
          <i style="font-weight: bold">添加文件到文档库</i>
        </el-button>
      </div>
    </div>

    <el-table :data="fileList" style="width: 100%" height="250">
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
import {create_knowledge_base, list_file_detail, list_knowledge_bases, upload_docs} from "@/api/request";
import {useRoute} from "vue-router";
import router from "@/router";
export default {
  name: "knowledgeBase",
  components: {UploadFile, IconDownloadOne, IconDeleteOne},
  setup(_props) {
    const kbList = ref([])
    const kbName = ref('')
    const createKBname = ref('')
    const createVecType = ref('')
    const createEmbedModel = ref('')
    const vecTypeList = ref(['faiss'])
    const embedModelList = ref(['m3e-base'])
    const uploadFiles = ref([])
    const chunkSize = ref(100)
    const chunkOverlap = ref(10)
    const fileList = ref([])
    const curPage = ref(1)
    const totalPage = ref(1)
    const getKbList = async () => {
      // await list_knowledge_bases().then(res => {
      //   kbList.value = res.data
      // })
      kbList.value = [] // todo: delete
      kbList.value.push('新建知识库')
    }
    const getFileList = async () => {
      await list_file_detail(kbName.value).then(res => {
        fileList.value = res.data
      })
    }
    const handleCreateKB = async() => {
      await create_knowledge_base(createKBname.value, createVecType.value, createEmbedModel.value).then(res => {
        router.push({path: `/knowledgeBase`, query: {knowledge_base_name: createKBname.value}})
      })
    }

    const handleUploadFiles = async () => {
      // 调用 api 上传文件到文档库
      await upload_docs(uploadFiles.value, kbName.value, chunkSize.value, chunkOverlap.value).then(res => {
        getFileList()
      })
    }
    const changePage = (currentPage) => {
      curPage.value = currentPage

    }
    const downloadDoc = (index, row) => {
      saveAs(row['docURL'], row['name'])
    }
    const deleteDoc = (index, row) => {
      // todo: 调用 api 删除文档
      // todo: 删除成功后重新获取当前页数据
    }
    onMounted(() => {
      getKbList()
      kbName.value = useRoute().query.kbName as string
      if (kbName.value == undefined){
        kbName.value = kbList.value[0]
        router.push({path: `/knowledgeBase`, query: {knowledge_base_name: kbName.value}})
      }
      if (kbName.value !== '新建知识库')
        getFileList()
    })
    return {
      kbList,
      kbName,
      createKBname,
      createVecType,
      createEmbedModel,
      handleCreateKB,
      vecTypeList,
      embedModelList,
      uploadFiles,
      chunkSize,
      chunkOverlap,
      fileList,
      curPage,
      totalPage,
      getKbList,
      handleUploadFiles,
      changePage,
      downloadDoc,
      deleteDoc,
    }
  }
}
</script>

<style scoped>
.createKB {
  margin: 3vh 0 0 0;
  padding: 15px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, 0 0 2px #4e2fd1;
}
.fileSetting {
  margin: 1vh 0 0 0;
  padding: 15px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, 0 0 2px #4e2fd1;
}
</style>