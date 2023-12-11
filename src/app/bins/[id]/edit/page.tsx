"use client";
import apiService from "@/modules/api/api";
import { BinAPIService } from "@/modules/bin/api";
import { BinData, NewBin } from "@/modules/bin/bin.types";
import { USER_ROLES } from "@/modules/user/user.type";
import Button from "@/presentation/_shared/components/Button";
import { Container } from "@/presentation/_shared/components/Container";
import Input from "@/presentation/_shared/components/Input";
import Spinner from "@/presentation/_shared/components/Spinner";
import useUser from "@/presentation/features/user/hooks/useUser.hook";
import WithPrimaryLayout from "@/presentation/layouts/primary-layout/WithPrimaryLayout";
import WithOnProtectedRoute from "@/presentation/layouts/protected-route/WithProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

function EditBinPage() {
  const binService = new BinAPIService(apiService);
  const { user } = useUser();
  const params = useParams();
  const binId = params.id as string;
  const router = useRouter();
  const QUERY_KEY = `BIN_${binId}`;

  const {
    isLoading: binLoading,
    data,
    error,
  } = useQuery<BinData, Error>({
    enabled: user !== null,
    queryKey: [QUERY_KEY, user],
    queryFn: () => binService.getBin(binId),
  });

  async function handleSubmit(data: NewBin) {
    let res;
    try {
      res = await binService.editBin(binId, data);
    } catch (err: any) {
      toast.error(err.message);
      return;
    }

    toast.success("update saved");
    router.replace("/bins");
  }

  return (
    user &&
    user.role === USER_ROLES.DISPOSER && (
      <Container className=" ">
        <div className=" mb-4 text-center text-4xl font-bold uppercase leading-relaxed text-white ">
          <h2 className="  ">Edit Bin</h2>
        </div>

        {binLoading && (
          <div className=" grid w-full place-items-center py-12 ">
            <Spinner className=" h-8 w-8 text-white " />
          </div>
        )}

        {!binLoading && error && (
          <div className=" flex h-[10rem] w-full flex-col items-center justify-center rounded-lg bg-white py-12 text-red-500 ">
            <span className=" text-sm font-semibold uppercase ">
              An Error Occured
            </span>

            <span className=" text-xl font-medium ">{error.message}</span>
          </div>
        )}

        {!binLoading && !error && data && (
          <div className=" mx-auto mt-12 w-full max-w-lg rounded-lg bg-white px-6 pb-20 pt-12 sm:px-12 ">
            <Formik
              initialValues={
                (() => ({
                  name: data.name,
                  location: data.location,
                }))() as NewBin
              }
              validateOnChange={false}
              validateOnBlur={true}
              onSubmit={async (values, { setSubmitting }) => {
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
                      Save
                    </Button>
                  </form>
                </>
              )}
            </Formik>
          </div>
        )}

        <div className=" my-12 ">
          <Link
            href={"/bins"}
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
  WithPrimaryLayout(EditBinPage, {
    className:
      " bg-gradient-to-br from-fuchsia-800 via-purple-800 to-violet-800 ",
  })
);
