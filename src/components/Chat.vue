<template>
  <div class="chat-container">
    <div class="chat-messages" ref="messages">
      <div v-for="(message, index) in messages" :key="index" class="message-wrapper" :class="{ 'sent': message.sentByUser, 'received': !message.sentByUser }">
        <div class="message">
          {{ message.text }}
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      messages: [],
      newMessage: ''
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({
          text: this.newMessage,
          sentByUser: true // Assuming the user is sending the message
        });
        // Simulate receiving a response from the other party
        setTimeout(() => {
          const randomResponse = this.getRandomResponse();
          this.messages.push({
            text: randomResponse,
            sentByUser: false // Simulating a response from the other party
          });
          // Scroll to the bottom of the messages container
          this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
        }, 500);
        this.newMessage = '';
      }
    },
    getRandomResponse() {
      const responses = [
        "Hello!",
        "How are you?",
        "Nice to meet you!",
        "What's up?",
        "在一个遥远的森林里，住着一只名叫Ellie的小狐狸。Ellie非常喜欢探险，每天她都会去森林里找寻新的奇迹。一天，她发现了一条隐蔽的小径，决定跟着它走，看看能发现什么。\n" +
        "\n" +
        "沿途上，Ellie遇到了各种各样的动物朋友们，包括聪明的猫头鹰Oliver，慢条斯理的乌龟Toby，还有总是乐观的兔子Mia。它们都告诉Ellie，这条小径最终会通往一片神秘的地方，那里藏有一个森林中最宝贵的秘密。\n" +
        "\n" +
        "充满好奇心的Ellie决定继续前进，她穿过浓密的树林，越过小溪，最后来到了一片开阔的草地。草地的中央，有一颗巨大无比的树，树干周围环绕着五彩斑斓的花朵，看起来非常美丽。\n" +
        "\n" +
        "Ellie走近那颗大树，突然，她听到了树上传来温柔的声音：“欢迎你，Ellie。你的勇气和好奇心引导你来到这里。作为奖励，我将赐予你一个特殊的礼物。”接着，从树中飘落下一束光芒，轻轻包裹住Ellie。那一刻，她感觉到自己的心灵变得更加强大和明亮。\n" +
        "\n" +
        "从那天起，Ellie发现自己能够与森林中的动植物交流，帮助它们解决问题，使森林变得更加和谐。Ellie继续她的探险旅程，但她永远不会忘记那颗神秘大树和它给予的礼物。\n" +
        "\n" +
        "这个小故事告诉我们，勇气和好奇心可以带领我们发现生命中的奇迹，友谊和帮助他人使我们的世界变得更加美好。\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n"
      ];
      const randomIndex = Math.floor(Math.random() * responses.length);
      return responses[randomIndex];
    }
  }
};
</script>

<style scoped>

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  margin-left: auto;
  border-radius: 8px;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f5f5f5;
}

.message-wrapper {
  display: flex;
  margin-bottom: 60px;
}

.message {
  max-width: 80%;
  padding: 1.0vw;
  border-radius: 1.5vw;
  color: #333;
  font-size: 1.5vw;
  box-shadow: 0 0.6vw 1.2vw rgba(0, 0, 0, 0.16);
  word-break: break-word;
}

.sent .message {
  align-self: flex-end;
  background-color: #007BFF;
  color: white;
}

.received .message {
  align-self: flex-start;
  background-color: #EAEAEA;
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 0.5vw;
  height: 5vh;
}

.chat-input input {
  flex-grow: 1;
  margin-right: 0.5vw;
  padding: 0.5vw;
  border: 0.1vw solid #007BFF;
  border-radius: 1vw;
  font-size: 1vw;
  height: auto;
}

.chat-input button {
  flex-grow: 0;
  padding: 0.5vw 1vw;
  border-radius: 1vw;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1vw;
  height: auto;
}


button:hover {
  background-color: #0056b3;
}

</style>
