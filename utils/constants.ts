export const MealActions = {
  ADD_EDIT_MEAL: "ADD_EDIT_MEAL",
  ADD_CUSTOM_MEAL: "ADD_CUSTOM_MEAL",
  CREATE_AI_MEAL: "CREATE_AI_MEAL",
  SUMMARY: "SUMMARY",
  AI_MEAL_IDEAS: "AI_MEAL_IDEAS",
  SHOW_MEAL_IN_MENU: "SHOW_MEAL_IN_MENU",
  SHOW_MEAL_DETAILS: "SHOW_MEAL_DETAILS",
};

const { Configuration, OpenAIApi } = require("openai");

export const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
