<script setup lang="ts">
import ChatWindow from './components/ChatWindow.vue'
</script>

<template>
  <div class="w-full h-screen">
    <ChatWindow placeholder="Ask any question" endpoint="/api/chat" title="Chat-AI-Vue" />
  </div>
</template>
