import React, { useState } from "react";
import BackButton from "../ui/buttons/BackButton";
import { useSteps } from "../../context/StepContext";
import { MealActions } from "../../utils/constants";
import { Field, FieldArray, Form, Formik, withFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { useMenu } from "../../context/MenuContext";
import * as Yup from "yup";

type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

type Meal = {
  name: string;
  ingredients: Ingredient[];
  instructions: string;
};

const CustomMeal = () => {
  const { setCurrentMenuItem, currentMenuItem, setMenuItem } = useMenu();
  const [addingIngredient, setAddingIngredient] = useState(false);
  const { setModalOpen, setCurrentStep } = useSteps();

  async function handleSave(values: any) {
    const response = await fetch("/api/meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        details: {
          name: values.name,
          calories: values.calories,
          ingredients: values.ingredients,
          instructions: values.instructions,
        },
        //TODO: type: "manual" or "ai", creator: "MEALMASTER" or user email
        created: "manual",
      }),
    });

    const meal = await response.json();
    //TODO: add meal to menu
  }

  async function handleSaveAndAdd(values: any) {
    setMenuItem({
      type: currentMenuItem,
      details: {
        name: values.name,
        calories: values.calories,
        ingredients: values.ingredients,
        instructions: values.instructions,
      },
    });
    await handleSave(values);
    setCurrentMenuItem(currentMenuItem);
  }

  const showBackButtonAndAddAsButton = currentMenuItem !== "";

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .max(40, "Name must be 40 characters or less"),
  });

  return (
    <div className={"font-proxima"}>
      <div className={"flex flex-row items-center gap-2"}>
        {showBackButtonAndAddAsButton && (
          <BackButton
            onClick={() => setCurrentStep(MealActions.ADD_EDIT_MEAL)}
          />
        )}
        <h1 className={"font-bold text-3xl"}>Adding a new meal</h1>
      </div>

      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          calories: 0,
          ingredients: [],
          instructions: "",
          newIngredient: {
            name: "",
            quantity: 0,
            unit: "",
          },
        }}
        onSubmit={async (values) => {
          setModalOpen(false);
        }}
      >
        {({
          values,
          handleSubmit,
          errors,
          touched,
          validateForm,
          setFieldError,
        }) => (
          <Form onSubmit={handleSubmit}>
            <>
              <div className={"flex flex-row gap-2 justify-between pt-4"}>
                <div className={"w-3/4"}>
                  <label className={"block py-2"} htmlFor="name">
                    Meal Name
                  </label>
                  <Field
                    className={`w-full bg-white border-gray-300 border rounded-lg h-12 px-2 text-lg ${
                      errors.name && touched.name ? "border-red-600" : ""
                    }`}
                    name="name"
                    type="text"
                    placeholder="Type here..."
                  />
                </div>

                <div className={"w-1/4"}>
                  <label className={"block py-2"} htmlFor="calories">
                    Calories (optional)
                  </label>
                  <Field
                    className={
                      "w-full bg-white border-gray-300 border rounded-lg h-12 focus:outline-none px-2 text-lg"
                    }
                    name="calories"
                    type="number"
                  />
                </div>
              </div>

              <h3 className={"py-2"}>Ingredients</h3>
              <FieldArray name={"ingredients"}>
                {({ insert, remove, push }) => (
                  <>
                    <div className={"overflow-auto scroll-smooth max-h-60"}>
                      {values.ingredients.length > 0 &&
                        values.ingredients.map(
                          (ingredient: Ingredient, index: number) => (
                            <div
                              key={ingredient.name}
                              className={
                                "w-full bg-steel rounded-lg h-12 px-2 text-lg my-2 flex flex-row justify-between items-center align-middle"
                              }
                            >
                              <h3>{ingredient.name}</h3>
                              <div
                                onClick={() => remove(index)}
                                className={
                                  "text-gray-400 pr-2 cursor-pointer hover:text-gray-900"
                                }
                              >
                                <FontAwesomeIcon icon={faTrashCan} width={15} />
                              </div>
                            </div>
                          )
                        )}
                    </div>
                    {!addingIngredient ? (
                      <button
                        className={"flex gap-1 text-lg items-center"}
                        type={"button"}
                        onClick={() => setAddingIngredient(true)}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          width={14}
                          className={"text-gray-500"}
                        />
                        <h3>Add Ingredient</h3>
                      </button>
                    ) : (
                      <div className={"flex flex-row gap-2 pt-2"}>
                        <Field
                          className={
                            "w-1/2 bg-white border-gray-300 border rounded-lg h-12 px-2 text-lg"
                          }
                          name={"newIngredient.name"}
                          type="text"
                          placeholder={"Ingredient name..."}
                        />
                        <Field
                          className={
                            "w-16 bg-white border-gray-300 border rounded-lg h-12 px-2 text-lg"
                          }
                          name={"newIngredient.quantity"}
                          type="text"
                          placeholder={"Qty..."}
                        />
                        <Field
                          className={
                            "w-1/6 bg-white border-gray-300 border rounded-lg h-12 px-2 text-lg form-select font-proxima"
                          }
                          as="select"
                          name="newIngredient.unit"
                        >
                          <option value="pcs.">pcs.</option>
                          <option value="g">g</option>
                          <option value="ml">ml</option>
                          <option value="ml">sp</option>
                          <option value="ml">tbsp</option>
                          <option value="glass">glass</option>
                        </Field>

                        <button
                          onClick={() => {
                            push({
                              name: values.newIngredient.name,
                              quantity: values.newIngredient.quantity,
                              unit: values.newIngredient.unit || "pcs.",
                            });
                            values.newIngredient = {
                              name: "",
                              quantity: 0,
                              unit: "",
                            };
                            setAddingIngredient(false);
                          }}
                          className={
                            "bg-green-light w-12 rounded-lg flex justify-center items-center hover:bg-green-medium transition-all duration-200"
                          }
                        >
                          <FontAwesomeIcon
                            icon={faCheck}
                            width={20}
                            className={"text-green"}
                          />
                        </button>
                        <button
                          onClick={() => setAddingIngredient(false)}
                          className={
                            "bg-white border w-12 rounded-lg flex justify-center items-center text-gray-500 shadow-sm shadow-gray-200 hover:text-gray-600 hover:shadow-gray-300 transition-all duration-200"
                          }
                        >
                          <FontAwesomeIcon
                            icon={faXmark}
                            width={12}
                            className={""}
                          />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </FieldArray>
              <label className={"block py-2 pt-4"} htmlFor="instructions">
                Instructions (optional)
              </label>
              <Field
                className={
                  "w-full bg-white border-gray-300 border rounded-lg px-2 text-sm resize-none"
                }
                rows={4}
                name={"instructions"}
                as={"textarea"}
                placeholder={"Type here..."}
              />
            </>
            <div className={"flex flex-row justify-between pt-4 gap-2"}>
              <button
                type="button"
                className={
                  "border border-gray-200 w-1/2 h-12 rounded-lg font-semibold text-lg shadow-lg shadow-gray-200 hover:shadow-gray-300 transition duration-200 ease-in-out"
                }
                onClick={() =>
                  validateForm().then((hasErrors) => {
                    handleSubmit();
                    if (Object.keys(hasErrors).length === 0) {
                      handleSave(values);
                    }
                  })
                }
              >
                Save meal
              </button>
              {showBackButtonAndAddAsButton && (
                <button
                  type="button"
                  className={
                    "w-1/2 h-12 bg-green rounded-lg font-semibold text-lg shadow-lg text-white hover:bg-green-dark transition duration-200 ease-in-out shadow-gray-200 hover:shadow-gray-300"
                  }
                  onClick={() =>
                    validateForm().then((hasErrors) => {
                      handleSubmit();
                      if (Object.keys(hasErrors).length === 0) {
                        handleSaveAndAdd(values);
                      }
                    })
                  }
                >
                  Save & add as {currentMenuItem}
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomMeal;
