<template>
    <div class="flex h-screen">
        <div class="flex-1 flex flex-col max-w-5xl min-w-[600px] m-2 border-2 ring bg-slate-100 ">
            <div class="flex items-center justify-between p-4 border-b">
                <div class="flex items-center">
                    <span class="text-lg font-bold" >{{ title }}</span>
                </div>
                <div class="flex gap-2 h-8">
                    <img src="/trash.svg" class="h-full hover:cursor-pointer" alt="trash icon" :onclick="clearMessages">
                </div>
            </div>
            <div class="flex-1 overflow-y-auto p-4" id="chatbox_body">
                <div class="space-y-4">
                    <div v-for="message in messages" :class="[
                        'flex gap-4 p-4 rounded-lg whitespace-break-spaces',
                        message.role === 'user' ? 'bg-blue-100 justify-items-start' : 'bg-gray-200 justify-items-end'
                    ]">
                        <div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                            <img v-if="message.role === 'user'" src="/user.svg" class="w-full h-full object-cover" />
                            <img v-else src="/bot.svg" class="w-full h-full object-cover" />
                        </div>
                        <div class="flex justify-start">
                            {{ message.content }}
                        </div>
                    </div>
                    <div ref="messageBottom"></div>
                </div>
            </div>
            <div class="border-t p-4">
                <form @submit="handleSubmit" class="flex w-full gap-4">
                    <div class="flex-1">
                        <input name="user-entry"
                            class="w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            v-model="input" :placeholder="placeholder" />
                    </div>
                    <div>
                        <button type="submit"
                            class="px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="">
            <div class="p-4">
                <!-- side pane -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useChat, } from '@ai-sdk/vue';
import { useTemplateRef, watch } from 'vue';
const messageBottom = useTemplateRef("messageBottom")
const props = defineProps<{ placeholder: string, endpoint: string, title: string }>()
const clearMessages = () => setMessages([]);
const { messages, input, handleSubmit, setMessages } = useChat({
    keepLastMessageOnError: true,
    api: props.endpoint,
    onError: e => console.log(e.message),
    streamProtocol: "text"

})
watch(messages, () => {
    messageBottom.value?.scrollIntoView({ behavior: "smooth" })
})

</script>