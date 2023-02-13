import React, { useState } from "react";
import { GetStaticProps } from "next";
import { getAllMeals } from "../../utils/mongo/api-util";
import { ShowCaloriesToggle } from "../../components/menu/ShowCaloriesToggle";
import { useSteps } from "../../context/StepContext";
import { Formik, Form, Field } from "formik";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/ui/modal/Modal";
import ModalContent from "../../components/ui/modal/ModalContent";
import { MealActions } from "../../utils/constants";
import { useMeal } from "../../context/MealContext";

export default function Meals({ data }: any) {
  const [showCalories, setShowCalories] = useState(false);
  const { modalOpen, openModal, closeModal, setStep } = useSteps();
  const { selectedMeal, setSelectedMeal } = useMeal();
  const { ADD_CUSTOM_MEAL, SHOW_MEAL_IN_MENU } = MealActions;

  return (
    <>
      <div className={"max-w-lg mx-auto my-16"}>
        <div className={"flex justify-between items-end"}>
          <h1
            className={
              "text-black font-proxima text-left font-bold text-3xl p-0"
            }
          >
            Your meals
          </h1>
          <div>
            <ShowCaloriesToggle
              onChange={() => setShowCalories(!showCalories)}
              checked={showCalories}
              disabled={modalOpen}
            />
          </div>
        </div>

        <div className={"block w-full"}>
          <Formik
            className={"w-full"}
            initialValues={{ search: "" }}
            onSubmit={() => {}}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <div className={"flex justify-between gap-2 my-4"}>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>

                    <Field
                      type="text"
                      name="search"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Search meals..."
                      className="block flex-grow w-full p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button
                    className={
                      "border border-gray-300 shadow-lg rounded-full py-1 px-3 w-36"
                    }
                    onClick={() => {
                      setStep(ADD_CUSTOM_MEAL);
                      openModal();
                    }}
                  >
                    + New meal
                  </button>
                </div>

                <div className={"flex flex-col gap-3 mt-8"}>
                  {data
                    .filter((item: any) =>
                      item.details.name
                        .toLowerCase()
                        .includes(values.search.toLowerCase())
                    )
                    .map((item: any) => (
                      <div
                        key={item._id}
                        className={
                          "flex flex-col gap-2 py-3 px-4 rounded-lg bg-white shadow-lg cursor-pointer"
                        }
                        onClick={() => {
                          setStep(SHOW_MEAL_IN_MENU);
                          setSelectedMeal(item);
                          openModal();
                        }}
                      >
                        <div className={"flex items-center text-lg gap-2"}>
                          <h2 className={"text-black"}>{item.details.name}</h2>
                          {showCalories && (
                            <p className={"text-gray-400"}>
                              {item.details.calories} kcal
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </Form>
            )}
          </Formik>

          <div className={"h-full w-screen"}>
            <AnimatePresence>
              {modalOpen && (
                <Modal handleClose={closeModal}>
                  <ModalContent meals={data} menu={{}} />
                </Modal>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const meals = await getAllMeals();

  return {
    props: {
      data: meals,
    },
  };
};
