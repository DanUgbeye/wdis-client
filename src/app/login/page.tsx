"use client";
import Button from "@/presentation/_shared/components/Button";
import { Container } from "@/presentation/_shared/components/Container";
import Input from "@/presentation/_shared/components/Input";
import { Formik } from "formik";
import Link from "next/link";
import React from "react";

export default function UserLogin() {
  const initialValues: { email: string; password: string } = {
    email: "",
    password: "",
  };

  return (
    <main className=" min-h-screen bg-gradient-to-br from-fuchsia-800 via-purple-800 to-violet-800 ">
      <Container className="  ">
        <div className=" py-12 text-center text-4xl font-bold uppercase leading-relaxed text-white ">
          <h2 className="  ">USER LOGIN</h2>
        </div>

        <Formik
          initialValues={initialValues}
          // validationSchema={loginSchema}
          validateOnChange={false}
          validateOnBlur={true}
          onSubmit={(values, { setSubmitting }) => {
            // if(!values.email || !values.password) {

            // }
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <>
              <form
                onSubmit={handleSubmit}
                className="  mx-auto w-full max-w-lg rounded-lg bg-white px-6 py-12 sm:px-12 "
              >
                <fieldset className=" mb-9 flex flex-col gap-y-4 ">
                  <Input
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="email address"
                    error={errors.email || ""}
                    touched={touched.email}
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />

                  <Input
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="password"
                    error={errors.password || ""}
                    touched={touched.password}
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </fieldset>

                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  text={"Login"}
                />
              </form>
            </>
          )}
        </Formik>

        <div className=" my-12 ">
          <Link
            href={"/"}
            className=" text-white underline-offset-4 hover:underline "
          >
            Back to home
          </Link>
        </div>
      </Container>
    </main>
  );
}
