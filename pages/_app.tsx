import "../styles/globals.css";
import "../styles/Calendar.css";

import type { AppProps } from "next/app";
import { MenuProvider } from "../context/MenuContext";
import { AppStepProvider } from "../context/StepContext";
import { Provider, createClient } from "urql";
import { ChefProvider } from "../context/ChefContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { MealProvider } from "../context/MealContext";

const client = createClient({
  url: process.env.NEXT_PUBLIC_BACKEND_API as string,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <ChefProvider>
          <AppStepProvider>
            <MenuProvider>
              <MealProvider>
                <Provider value={client}>
                  <Component {...pageProps} />
                </Provider>
              </MealProvider>
            </MenuProvider>
          </AppStepProvider>
        </ChefProvider>
      </UserProvider>
    </>
  );
}
