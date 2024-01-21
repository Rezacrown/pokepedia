"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 justify-center">
      <div className="flex">
        <Link href={"/"} className="btn btn-ghost text-xl">
          <h3 className="text-[#FAAA6D]">
            Poke<span className="text-[#F2684A]">Pedia</span>
          </h3>
        </Link>
      </div>
      <div className="flex-none ml-8 gap-2">
        <div className="form-control">
          <input
            name="searching"
            type="text"
            placeholder="Pikachu, Charizard, etc.."
            className="input input-bordered w-44 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          ></div>
        </div>
      </div>
      <div className="ml-auto hidden md:block">
        <input
          type="checkbox"
          value="dark"
          className="toggle theme-controller"
        />
      </div>
    </div>
  );
}
