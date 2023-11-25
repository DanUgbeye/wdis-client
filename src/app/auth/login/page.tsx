"use client";
import ApiService from "@/modules/api/api";
import { UserAPIService, UserLoginData } from "@/modules/user/api";
import { USER_ROLES } from "@/modules/user/user.type";
import Button from "@/presentation/_shared/components/Button";
import { Container } from "@/presentation/_shared/components/Container";
import Input from "@/presentation/_shared/components/Input";
import { Formik } from "formik";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

export default function UserLogin() {
  const initialValues: UserLoginData = {
    email: "",
    password: "",
  };

  async function handleSubmit(data: UserLoginData) {
    const userApi = new UserAPIService(ApiService.getInstance());
    let res;
    try {
      res = await userApi.login(USER_ROLES.USER, data);
    } catch (err: any) {
      toast.error(err.message);
      return;
    }

    console.log(res);
  }

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
          onSubmit={async (values, { setSubmitting }) => {
            console.log(values);
            await handleSubmit(values);
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
