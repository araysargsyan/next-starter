import * as React from "react";
import {FC, SVGAttributes, SVGProps} from "react";

const SvgLogo: FC<SVGProps<any>> = ({fill, ...props}) => (
  <svg
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 413.62 144.78"
    {...props}
  >
    <path
      d="m462.81 183.61-302.6 128.86Q122.57 328.39 97 328.39q-29 0-42-20.27-8.2-13-4.83-33.06T68 232.35q12.1-18.35 39.61-48.26a105.53 105.53 0 0 0-13.51 31.85q-7.24 30.89 13 45.37 9.65 6.76 26.54 6.76a123.37 123.37 0 0 0 30.4-4.34Z"
      transform="translate(-49.19 -183.61)"
      style={{
        fill,
      }}
    />
  </svg>
);

export default SvgLogo;
