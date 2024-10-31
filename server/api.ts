import express from 'express';
import { Message } from 'ai';
import { ChatBedrockConverse } from "@langchain/aws";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";

const router = express.Router();

router.get('/', function (_req, res) {
  res.send('API server')
})
const TEMPLATE = process.env.SYSTEM_PROMPT ?? "You are a chatbot.\n";
const formatMessage = (message: Message) => {
  return `${message.role}: ${message.content}`;
};
router.post('/chat', (req, res) => {
  try {
    const { messages } = req.body;
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", TEMPLATE],
      ["human", "{input}"]
    ]);
    const model = new ChatBedrockConverse({
      model: process.env.MODEL_ID || "anthropic.claude-3-5-sonnet-20240620-v1:0",
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      }
    });

    const outputParser = new HttpResponseOutputParser();
    const chain = prompt.pipe(model).pipe(outputParser);

    chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
    })
      .then(async stream => {
        for await (const chunk of stream) {
          res.write(chunk);
        }
      });
  } catch (e: any) {
    console.error(e);
    res.status(e.status ?? 500).json({ error: e.message });
  }

})
export default router 
