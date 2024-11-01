<template>
    <div class="flex h-screen">
        <ChatPane :title="title" :placeholder="placeholder" :messages="messages" :handleSubmit="handleSubmit"
            :setMessages="setMessages" v-model:input="input" />
        <SidePane />
    </div>
</template>

<script setup lang="ts">
import { useChat } from '@ai-sdk/vue';
import ChatPane from './ChatPane.vue';
import SidePane from './SidePane.vue';

const props = defineProps<{ placeholder: string, endpoint: string, title: string }>()
const { messages, input, handleSubmit, setMessages } = useChat({
    keepLastMessageOnError: true,
    api: props.endpoint,
    onError: e => console.log(e.message),
    streamProtocol: "text",
})

</script>