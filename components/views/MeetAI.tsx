import React, { useState } from "react";
import BackButton from "../ui/buttons/BackButton";
import { MealActions } from "../../utils/constants";
import { useSteps } from "../../context/StepContext";
import antonio from "../../public/images/chef large.png";
import Image from "next/image";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikValues,
  FormikHelpers,
} from "formik";
import { useChef } from "../../context/ChefContext";
import { waitForTwoSeconds } from "../../utils/functions";

const MeetAI = () => {
  const { setStep } = useSteps();
  const [isSearching, setIsSearching] = useState(false);
  const { setSearchValue, setMealIdeas } = useChef();
  const { AI_MEAL_IDEAS } = MealActions;

  //TODO: remove it
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (input: string) => {
    //Check if character limit is exceeded
    if (input.length > 50) {
      setError(true);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/meal-ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      try {
        const suggestion: { result: string } = await res.json();
        const { result } = suggestion;
        const resultWithoutNewLines = result.replace(/\n/g, " ");
        const parsedResult = JSON.parse(resultWithoutNewLines);
        setMealIdeas(parsedResult);
      } catch (e) {
        console.log("Error parsing JSON: ", e);
        console.log("Response: ", res);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
    setIsSearching(true);
    setSearchValue(values.meal);

    // await waitForTwoSeconds();
    // const ideas = [
    //   {
    //     name: "Thai Spicy Coconut Soup",
    //     calories: 320,
    //   },
    //   {
    //     name: "Chinese Wonton Soup",
    //     calories: 387,
    //   },
    // ];
    // setMealIdeas(ideas);

    await submit(values.meal);

    setStep(AI_MEAL_IDEAS);
  };

  return (
    <>
      <BackButton />
      <div className={"flex flex-col items-center gap-2"}>
        <Image src={antonio} alt={"antonio"} width={250} quality={100} />

        <Formik initialValues={{ meal: "" }} onSubmit={handleSubmit}>
          {({ values, isSubmitting }) => (
            <>
              <h1 className={"text-2xl font-bold"}>
                {!isSearching
                  ? "Meet Antonio Ingrediente, our chef"
                  : `Looking for '${values.meal}' ideas...`}
              </h1>
              <h2 className={"mx-12 text-gray-500 text-center"}>
                {!isSearching
                  ? "Antonio is an A.I. powered chef that's always ready to share his meal ideas & recipes with you. Seriously, try him!"
                  : "It might take Antonio up to 10-20 seconds to come up with an idea for you. Let's not rush a master at work!"}
              </h2>

              <Form
                className={`w-full relative ${
                  !isSearching ? "block" : "hidden"
                }`}
              >
                <Field
                  className={
                    "w-11/12 bg-white border border-gray-600 text-lg rounded-lg block mx-auto pr-40"
                  }
                  name="meal"
                  type="text"
                  placeholder="What would you like to eat?"
                  maxLength={50}
                />
                <ErrorMessage name="meal" component="div" />
                {values.meal.length > 0 && (
                  <button
                    className={
                      "text-green absolute top-2 text-lg right-10 z-100 cursor-pointer"
                    }
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Generate ideas
                  </button>
                )}
              </Form>
            </>
          )}
        </Formik>
        {!isSearching && (
          <h3 className={"text-gray-400 text-sm text-center"}>
            Antonio understands everything, from simple cues to complex demands.
            Try stuff like: “breakfast”, “asian soup”, “dinner meal with steak”,
            “healthy snack”.
          </h3>
        )}
      </div>
    </>
  );
};

export default MeetAI;
