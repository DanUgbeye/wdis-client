"use client";
import apiService from "@/modules/api/api";
import { BinAPIService } from "@/modules/bin/api";
import { NewBin } from "@/modules/bin/bin.types";
import { USER_ROLES } from "@/modules/user/user.type";
import Button from "@/presentation/_shared/components/Button";
import { Container } from "@/presentation/_shared/components/Container";
import Input from "@/presentation/_shared/components/Input";
import useUser from "@/presentation/features/user/hooks/useUser.hook";
import WithPrimaryLayout from "@/presentation/layouts/primary-layout/WithPrimaryLayout";
import WithOnProtectedRoute from "@/presentation/layouts/protected-route/WithProtectedRoute";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

function CreateBinPage() {
  const binService = new BinAPIService(apiService);
  const router = useRouter();
  const { user } = useUser();

  const initialValues: NewBin = {
    name: "",
    location: "",
  };

  async function handleSubmit(data: NewBin) {
    let res;
    try {
      res = await binService.createBin(data);
    } catch (err: any) {
      toast.error(err.message);
      return;
    }

    toast.success("waste bin created");
    router.replace("/bins");
  }

  return (
    user &&
    user.role === USER_ROLES.DISPOSER && (
      <Container className=" ">
        <div className=" mb-4 text-center text-4xl font-bold uppercase leading-relaxed text-white ">
          <h2 className="  ">Create Bin</h2>
        </div>

        <div className=" mx-auto mt-12 w-full max-w-lg rounded-lg bg-white px-6 pb-20 pt-12 sm:px-12 ">
          <Formik
            initialValues={initialValues}
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={async (values, { setSubmitting, setValues }) => {
              await handleSubmit(values);
              setSubmitting(false);
              setValues(initialValues);
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
                <form onSubmit={handleSubmit} className="  w-full ">
                  <fieldset className=" mb-9 flex flex-col gap-y-4 ">
                    <Input
                      id="name"
                      name="name"
                      label="Name"
                      type="text"
                      placeholder="name"
                      error={errors.name || ""}
                      touched={touched.name}
                      value={values.name || ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />

                    <Input
                      id="location"
                      name="location"
                      label="Location"
                      type="text"
                      placeholder="location"
                      error={errors.location || ""}
                      touched={touched.location}
                      value={values.location || ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </fieldset>

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Create
                  </Button>
                </form>
              </>
            )}
          </Formik>
        </div>

        <div className=" my-12 ">
          <Link
            href={"/dashboard"}
            className=" text-white underline-offset-4 hover:underline "
          >
            Back
          </Link>
        </div>
      </Container>
    )
  );
}

export default WithOnProtectedRoute(
  WithPrimaryLayout(CreateBinPage, {
    className:
      " bg-gradient-to-br from-fuchsia-800 via-purple-800 to-violet-800 ",
  })
);
