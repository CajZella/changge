<template>
  <div class="container">
    <aside class="sidebar">
      <img class="logo-svg" src="../assets/vue.svg" alt="Logo" />
      <button class="menu-item" :class="{ active: selectedTab === 'conversations' }" @click="selectTab('conversations')">对话</button>
      <button class="menu-item" :class="{ active: selectedTab === 'knowledge' }" @click="selectTab('knowledge')">文档库管理</button>
      <div v-if="selectedTab === 'conversations'" class="select-group">
        <select v-model="selectedModel">
          <option value="ChatGLM3-6B">ChatGLM3-6B</option>
          <option value="ChatGPT3.5">ChatGPT3.5</option>
        </select>
        <select v-model="selectedLibrary">
          <option value="None">无</option>
        </select>
        <div class="slider-container">
          <input type="range" v-model="sliderValue" min="0.00" max="2.00" step="0.01">
          <span>{{ sliderValue }}</span>
        </div>
      </div>
    </aside>
    <main class="main-content">
      <div v-if="selectedTab === 'conversations'">
        <chat></chat>
      </div>
      <div v-if="selectedTab === 'knowledge'">
        <!-- Knowledge base content goes here -->
      </div>
    </main>
  </div>
</template>

<script>
import Chat from './Chat.vue'

export default {
  data() {
    return {
      selectedTab: 'conversations',
      selectedModel: 'ChatGLM3-6B',
      selectedLibrary: 'None',
      sliderValue: 0.5,
    };
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
  },
  components: {
    Chat
  }
};
</script>

<style scoped>
.logo-svg {
  display: block;
  margin: 1rem auto;
  width: 60%;
  height: auto;
}

.container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 20vw;
  background-color: #f2f2f2;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.main-content {
  width: 100vw;
  background-color: #fff;
  box-sizing: border-box;
}

.menu-item {
  display: block;
  width: 100%;
  padding: 0.6rem 1rem;
  border: none;
  background-color: white;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item.active {
  background-color: #007bff;
  color: white;
}


.sidebar .logo-svg + .menu-item {
  margin-top: 1.5rem;
}

.select-group {
  margin-top: 1rem; /* 为下拉框组添加上边距 */
}

.select-group select {
  width: 100%;
  padding: 0.3rem 0.6rem;
  margin-bottom: 0.5rem; /* 为下拉框之间添加间距 */
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}
.slider-container {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* 为滑动条和值显示之间添加间隔 */
}

.slider-container input[type=range] {
  width: 100%; /* 滑动条占据满宽度 */
}

</style>

