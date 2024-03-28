<template>
  <el-container style="position: absolute; left: 0; top:0; width: 100%; height: 100%;">
    <el-aside class="aside">
      <div style="text-align: center; margin: 8vh 0 4vh 0">
        <el-image src="/src/assets/logo.png" style="width: 80px; height: 80px; margin: 0"/>
        <i class="title">长歌</i>
      </div>
      <div style="text-align: right; margin-right: 7px">
        <i style="color: gray; font-size: 14px;font-weight: bold;">当前版本： 正式版本</i>
      </div>
      <div style="background: white; margin: 20px; padding: 20px; border-radius: 5px">
        <el-menu
          active-text-color="#fff"
          text-color="#000"
          default-active="/conversation"
          router>
          <el-menu-item index="/conversation" style="margin: 10px 0 10px 0;">
            <template #title>
              <icon-waterfalls-v theme="outline" size="24" style="margin-right: 5px"/>
              <span>对话</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/knowledgeBase" style="margin: 10px 0 10px 0;">
            <template #title>
              <icon-folder-one theme="outline" size="24" style="margin-right: 5px"/>
              <span>知识库管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/agent" style="margin: 10px 0 10px 0;">
            <template #title>
              <icon-find theme="outline" size="24" style="margin-right: 5px"/>
              <span>Agent</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-main style="display: flex; justify-content: center">
      <router-view class="content"/>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import {
  WaterfallsV as IconWaterfallsV,
  FolderOne as IconFolderOne,
  Find as IconFind,
} from "@icon-park/vue-next";

export default {
  name: "index",
  components: {IconWaterfallsV, IconFolderOne, IconFind},
}
</script>

<style scoped>
.aside {
  position: relative;
  left: 0;
  top: 0;
  width: 240px;
  background: #f8f8fa;
}
.el-menu-item.is-active {
  background-color: #4e2fd1 !important;
  box-shadow: 0 0 5px #4e2fd1;
  border-radius: 10px;
}
.el-menu-item:hover{
  background-color: #d5dbff !important;
  box-shadow: 0 0 5px #d5dbff;
  border-radius: 10px;
}
/* 当鼠标移出时恢复默认的 border-radius */
.el-menu-item:not(.is-active):not(:hover) {
  border-radius: 10px;
}
.el-menu {
  border-right: 0;
}
.title {
  font-family: 优设标题;
  font-size: 56px;
  color: #4e2fd1;
  text-shadow: 0 0 2px #9482e1;
}
.content {

}
</style>