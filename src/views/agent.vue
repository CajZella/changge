<template>
  <div
    v-if="result"
    v-html="md.render(result)"
    style="border-radius: 5px;"
  >
  </div>
  <el-input
    v-model="searchInput"
    size="large"
    placeholder="Please input"
    :autosize="{minRows: 1, maxRows: 5}"
    clearable>
    <template #suffix>
      <icon-send size="18" @click="handleSend"/>
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import {Send as IconSend} from "@icon-park/vue-next";
import {md} from "@/util/markdown";
import {ref} from "vue";
const searchInput = ref('');
const result = ref('[a.txt](http://www.baidu.com)');
const handleSend = () => {
  console.log(searchInput.value)
  // todo: api
}
</script>

<style scoped>

</style>