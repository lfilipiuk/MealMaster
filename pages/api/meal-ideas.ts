import type { NextApiRequest, NextApiResponse } from "next";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { configuration } from "../../utils/constants";

type Data = {
  result?: string;
  message?: string;
};

const openai = new OpenAIApi(configuration);

// export const config = {
//   runtime: "edge",
// };

async function within(
  fn: () => Promise<Data>,
  res: NextApiResponse<Data>,
  duration: number
) {
  const id = setTimeout(() =>
    res.status(500).json({
      message: "There was an error with the upstream service!",
    })
  );

  try {
    let data = await fn();
    clearTimeout(id);
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { input } = req.body;

  const prompt: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: "You are a helpful chatbot that helps people create meal ideas.",
    },
    {
      role: "user",
      content: `You are an amazing chef who creates simple recipes. You need to create a recipe from this suggestion: '${input}.'\n\nProvide a JSON array with TWO meal ideas with following fields: name, calories, ingredients (name, quantity, unit), instructions (include newlines). Don't use newlines or whitespaces in the JSON.:`,
    },
    {
      role: "user",
      content:
        'This is a valid response with 1 idea, you need to provide 2, only respond with a text formatted as a JSON array, don\'t add any other text:[{"name":"Polish Style Soup","calories":400,"ingredients":[{"name":"Potatoes","quantity":4,"unit":"pieces"},{"name":"Carrots","quantity":2,"unit":"pieces"},{"name":"Onion","quantity":1,"unit":"piece"},{"name":"Garlic","quantity":3,"unit":"cloves"},{"name":"Vegetable Stock","quantity":1,"unit":"liter"},{"name":"Tomato Puree","quantity":1,"unit":"cup"},{"name":"Bay Leaf","quantity":1,"unit":"pinch"},{"name":"Salt","quantity":1,"unit":"pinch"},{"name":"Pepper","quantity":1,"unit":"pinch"}],"instructions":"1. Heat oil in a pot.\\n2. Add potatoes, carrots, onion, and garlic. Cook for 5 minutes.\\n3. Pour in vegetable stock and bring to a boil.\\n4. Add tomato puree, bay leaf, salt, and pepper.\\n5. Simmer for 15 minutes until vegetables are tender.\\n6. Serve hot."}]',
    },
  ];

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompt,
    temperature: 0.85,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    // stream: false,
  });

  const suggestion = response.data?.choices?.[0]?.message?.content;

  //console.log(suggestion);

  if (suggestion === undefined) {
    throw new Error("No suggestion found");
  }

  const startIndex = suggestion.indexOf("[");
  const formattedSuggestion = suggestion.substring(startIndex);

  await within(async () => ({ result: formattedSuggestion }), res, 120000);
}
