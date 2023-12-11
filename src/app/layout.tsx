"use client";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

// CSS FILES
import "./globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import {
  AuthContextProvider,
  UserContextProvider,
} from "@/presentation/features/user/context";
import { BinContextProvider } from "@/presentation/features/bin/context";
import ReportContextprovider from "@/presentation/features/report/context";

const queryClient = new QueryClient();

export interface RootLayoutProps extends React.PropsWithChildren {}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="en">
      <Head>
        <title>WDIS</title>
        <meta
          name="description"
          content="UNICAL Waste disposal Management App"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <body className={""}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <UserContextProvider>
              <BinContextProvider>
                <ReportContextprovider>
                  <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    newestOnTop={false}
                    theme="colored"
                    hideProgressBar
                  />

                  {children}
                </ReportContextprovider>
              </BinContextProvider>
            </UserContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
