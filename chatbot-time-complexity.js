import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const bubble_sort = `
def sort(array):    
  for i in range(len(array)):
    for j in range(0, len(array) - i - 1):
      if array[j] > array[j + 1]:
        temp = array[j]
        array[j] = array[j+1]
        array[j+1] = temp
  `;

const quick_sort = `
def partition(array, low, high):
    pivot = array[high]
    i = low - 1
 
    for j in range(low, high):
        if array[j] <= pivot:
            i = i + 1
            (array[i], array[j]) = (array[j], array[i])
    (array[i + 1], array[high]) = (array[high], array[i + 1])
    return i + 1
  
def sort(array, low, high):
    if low < high:
        pi = partition(array, low, high)
        sort(array, low, pi - 1)
        sort(array, pi + 1, high)
`;

const messages = [
  {
    role: 'user',
    content:
      'Calculate the time complexity of the following function: ${quick_sort} ',
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
