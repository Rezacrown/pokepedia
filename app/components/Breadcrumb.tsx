import Link from "next/link";
import React from "react";

export default function Breadcrumb({ secondBreadcrumb }: BreadcrumbProps) {
  return (
    <div className="text-sm text-[#F2684A] breadcrumbs my-6">
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        {secondBreadcrumb?.title && secondBreadcrumb.href && (
          <li className="text-gray-600">
            {/* <Link href={secondBreadcrumb.href}> */}
            Detail {secondBreadcrumb.title} {/* </Link> */}
          </li>
        )}
      </ul>
    </div>
  );
}

interface BreadcrumbProps {
  secondBreadcrumb?: {
    title: string;
    href: string;
  };
}
