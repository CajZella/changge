<template>
  <el-container>
    <el-aside class="aside">
      <div>
        <p>长歌</p>
        <p>ChangGe</p>
      </div>
      <div>
        <i>当前版本： 1.0</i>
      </div>
      <div style="background: white; margin: 20px; padding: 20px; border-radius: 5px">
        <el-menu
          active-text-color="#fff"
          text-color="#000"
          default-active="/conversation"
          router>
          <el-menu-item index="/conversation" style="margin: 10px 0 10px 0;">
            <template #title>
              <icon-waterfalls-v theme="outline" size="24"/>
              <span>对话</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/docLib" style="margin: 10px 0 10px 0;">
            <template #title>
              <icon-folder-one theme="outline" size="24"/>
              <span>知识库管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/agent" style="margin: 10px 0 10px 0;">
            <template #title>
              <icon-find theme="outline" size="24"/>
              <span>Agent</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-main >
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import {
  WaterfallsV as IconWaterfallsV,
  FolderOne as IconFolderOne,
  Find as IconFind,
} from "@icon-park/vue-next";

export default {
  name: "index",
  components: {IconWaterfallsV, IconFolderOne, IconFind}
}
</script>

<style scoped>
.aside {
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  width: 260px;
  background: #f8f8fa;
}
.el-menu-item.is-active {
  background-color: #4e2fd1 !important;
  border-radius: 10px;
}
.el-menu-item:hover{
  background-color: #d5dbff !important;
  border-radius: 10px;
}
/* 当鼠标移出时恢复默认的 border-radius */
.el-menu-item:not(.is-active):not(:hover) {
  border-radius: 10px;
}
.el-menu {
  border-right: 0;
}
</style>