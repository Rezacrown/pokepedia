"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function Pagination({ totalPage, currentPage }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pages = Array.from({ length: totalPage }, (item, index) => index + 1);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="my-20 px-5">
      <div className="join flex flex-wrap justify-center gap-y-3">
        {/* prev btn */}
        {currentPage > 1 && (
          <button
            className="join-item btn"
            onClick={() => {
              router.push(
                pathname +
                  "?" +
                  createQueryString("page", String(currentPage - 1))
              );
            }}
          >
            Previous
          </button>
        )}

        {/* mapping btn */}
        {pages.map((item, idx) => {
          return (
            <>
              <button
                key={idx}
                className={`join-item btn ${
                  currentPage === idx + 1 && "btn-active"
                } `}
                onClick={() => {
                  router.push(
                    pathname + "?" + createQueryString("page", String(item))
                  );
                }}
              >
                {idx + 1}
              </button>
            </>
          );
        })}

        {/* next btn */}
        {currentPage < pages.length && (
          <button
            className="join-item btn"
            onClick={() => {
              router.push(
                pathname +
                  "?" +
                  createQueryString("page", String(currentPage + 1))
              );
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

interface Props {
  currentPage: number;
  totalPage: number;
}
