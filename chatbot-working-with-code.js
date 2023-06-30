import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const func = `
def remove_common_prefix(x, prefix, ws_prefix): 
    x["completion"] = x["completion"].str[len(prefix) :] 
    if ws_prefix: 
        # keep the single whitespace as prefix 
        x["completion"] = " " + x["completion"] 
return x `;

const messages = [
  { role: 'system', content: 'you are a Python explaining assistant' },
  { role: 'user', content: `Explain the following function: ${func}` },
];

(async () => {
  const reply = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });

  const reply_text = reply.data.choices[0].message.content;
  console.log(reply_text);
})();
