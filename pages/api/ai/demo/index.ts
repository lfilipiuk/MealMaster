import type { NextApiRequest, NextApiResponse } from "next";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { configuration } from "../../../../utils/constants";

type Data = {
  result?: string;
  message?: string;
};

const openai = new OpenAIApi(configuration);

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
      content: `You are an amazing chef who creates meal ideas. You need to create meal ideas (just names) for '${input}.'\n\nProvide a JSON array with five meal ideas. Don't use newlines or whitespaces in the JSON.:`,
    },
    {
      role: "user",
      content:
        'This is a valid response: ["Chicken and Rice","Chicken and Rice","Chicken and Rice","Chicken and Rice","Chicken and Rice"]',
    },
  ];

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompt,
    temperature: 0.85,
    max_tokens: 500,
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
  const endIndex = suggestion.indexOf("]") + 1;
  const formattedSuggestion = suggestion.substring(startIndex, endIndex);

  await within(async () => ({ result: formattedSuggestion }), res, 120000);
}
