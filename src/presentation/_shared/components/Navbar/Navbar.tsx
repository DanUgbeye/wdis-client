import { Container } from "@/presentation/_shared/components/Container";
import React from "react";
import { HiTrash } from "react-icons/hi2";
import NavLink from "./NavLink";
import Button from "@/presentation/_shared/components/Button";
import useAuth from "../../../features/user/hooks/useAuth.hook";
import useUser from "../../../features/user/hooks/useUser.hook";
import { USER_ROLES } from "@/modules/user/user.type";

export default function Navbar() {
  const { logout, auth } = useAuth();
  const { user } = useUser();

  function handleLogout() {
    logout(null, false);
  }

  return (
    <nav className=" flex h-20 items-center text-white sm:h-[6rem] ">
      <div className=" flex w-full flex-row justify-between gap-x-12 gap-y-4 ">
        <div className=" flex items-center gap-x-2 ">
          <HiTrash className=" h-8 w-8 " />
          <h4 className=" text-4xl font-bold ">WDIS</h4>
        </div>

        {user && (
          <div className=" mx-auto flex w-fit items-center gap-x-5 sm:mx-0 ">
            <NavLink href={"/dashboard"} className=" ">
              Dashboard
            </NavLink>

            {user.role === USER_ROLES.DISPOSER && (
              <>
                <NavLink href={"/bins"} className=" ">
                  Bins
                </NavLink>

                <NavLink href={"/disposals"} className=" ">
                  Disposals
                </NavLink>
              </>
            )}

            {user.role === USER_ROLES.USER && (
              <>
                <NavLink href={"/bins"} className=" ">
                  Bins
                </NavLink>
              </>
            )}

            <Button
              onClick={() => handleLogout()}
              className=" w-fit bg-transparent hover:bg-transparent hover:underline hover:underline-offset-4 "
            >
              Log out
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
