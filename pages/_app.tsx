import "../styles/globals.css";
import "../styles/Calendar.css";

import type { AppProps } from "next/app";
import { MenuProvider } from "../context/MenuContext";
import { AppStepProvider } from "../context/StepContext";

//TODO - introduce repository pattern

import { ChefProvider } from "../context/ChefContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { MealProvider } from "../context/MealContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <ChefProvider>
          <AppStepProvider>
            <MenuProvider>
              <MealProvider>
                <Component {...pageProps} />
              </MealProvider>
            </MenuProvider>
          </AppStepProvider>
        </ChefProvider>
      </UserProvider>
    </>
  );
}
