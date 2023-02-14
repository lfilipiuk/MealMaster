import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAIApi } from "openai";
import { configuration } from "../../utils/constants";

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

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `You are an amazing chef who creates simple recipes. You need to create a recipe from this suggestion: '${input}.'\n\nProvide a JSON array with 2 meal ideas with following fields: name, calories, ingredients (name, quantity, unit), instructions (include newlines). Don't use newlines or whitespaces in the JSON.:`,
    temperature: 0.85,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const suggestion = response.data?.choices?.[0].text;

  if (suggestion === undefined) {
    throw new Error("No suggestion found");
  }

  await within(async () => ({ result: suggestion }), res, 120000);
}
