// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAIApi } from "openai";
import { configuration } from "../../utils/constants";

type Data = {
  result: string;
};

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { input } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    // prompt: `You are an amazing chef who creates simple recipes. You need to create a recipe from this suggestion: '${input}.'\n\nProvide a JSON with the following fields: name, calories, ingredients (name, quantity, unit), instructions.:`,
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

  res.status(200).json({ result: suggestion });
}
