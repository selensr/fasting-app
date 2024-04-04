import { SVGProps } from "react";
const More = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M14.625 12a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0ZM12 7.125a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25Zm0 9.75a2.625 2.625 0 1 0 0 5.25 2.625 2.625 0 0 0 0-5.25Z"
    />
  </svg>
);
export default More;
