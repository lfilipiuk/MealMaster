import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { getAllMeals } from "../../utils/mongo/api-util";

export default function Meals({ data }: any) {
  return (
    <>
      <div>Hello Meals</div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const meals = await getAllMeals();

  return {
    props: {
      data: meals,
    },
    revalidate: 30,
  };
};
