import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const js = `
const mystery = (str) => {
  const arr = str.trim().toLowerCase().split(" ");

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(" ");
};
`;

const messages = [
  {
    role: 'user',
    content: `Translate the following JavaScript to Python: ${js}`,
  },
];

(async () => {
  const reply = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });

  const reply_text = reply.data.choices[0].message.content;
  console.log(reply_text);
})();
