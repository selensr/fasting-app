import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M5 11.5a.5.5 0 0 1-.5.5H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h3.5a.5.5 0 1 1 0 1H1v10h3.5a.5.5 0 0 1 .5.5Zm6.854-5.854-2.5-2.5A.5.5 0 0 0 8.5 3.5v2h-4a.5.5 0 1 0 0 1h4v2a.5.5 0 0 0 .854.354l2.5-2.5a.502.502 0 0 0 0-.708Z"
    />
  </svg>
);
export default SvgComponent;
