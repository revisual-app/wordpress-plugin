/**
 * Untitled UI line icons used by the connected admin screens.
 * 24x24 box, 2px stroke, round caps/joins, painted with currentColor.
 * Inline rather than SVG imports so they carry no fill/colour of their own —
 * the repo's existing src/icons/*.svg blobs are off-style and can be deleted.
 */

import React from "react";

const Svg = ({ size = 20, children, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={true}
    focusable={false}
    {...rest}
  >
    {children}
  </svg>
);

export const SearchLg = (props) => (
  <Svg {...props}>
    <path d="M21 21l-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
  </Svg>
);

export const ChevronDown = (props) => (
  <Svg {...props}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const ChevronLeft = (props) => (
  <Svg {...props}>
    <path d="m15 18-6-6 6-6" />
  </Svg>
);

export const ChevronRight = (props) => (
  <Svg {...props}>
    <path d="m9 18 6-6-6-6" />
  </Svg>
);

export const Copy01 = (props) => (
  <Svg {...props}>
    <path d="M5 15c-.93 0-1.395 0-1.776-.102a3 3 0 0 1-2.122-2.122C1 12.395 1 11.93 1 11V5.2c0-1.48 0-2.22.288-2.786a2.64 2.64 0 0 1 1.153-1.153C2.98 1 3.72 1 5.2 1H11c.93 0 1.395 0 1.776.102a3 3 0 0 1 2.122 2.122C15 3.605 15 4.07 15 5M13.2 23h5.6c1.48 0 2.22 0 2.786-.288a2.64 2.64 0 0 0 1.153-1.153C23 20.993 23 20.253 23 18.8v-5.6c0-1.48 0-2.22-.288-2.786a2.64 2.64 0 0 0-1.153-1.153C20.993 9 20.253 9 18.8 9h-5.6c-1.48 0-2.22 0-2.786.288a2.64 2.64 0 0 0-1.153 1.153C9 10.98 9 11.72 9 13.2v5.6c0 1.48 0 2.22.288 2.786a2.64 2.64 0 0 0 1.153 1.153C11.007 23 11.747 23 13.2 23Z" />
  </Svg>
);

export const RefreshCcw01 = (props) => (
  <Svg {...props}>
    <path d="M2 9.5S4.006 6.767 5.636 5.136A9 9 0 1 1 3.51 14.5M2 9.5V3.5m0 6h6" />
  </Svg>
);

export const DotsHorizontal = (props) => (
  <Svg {...props} strokeWidth={0}>
    <g fill="currentColor">
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
      <circle cx="5" cy="12" r="1.6" />
    </g>
  </Svg>
);

export const AlertCircle = (props) => (
  <Svg {...props}>
    <path d="M12 8v4m0 4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
  </Svg>
);

export const Check = (props) => (
  <Svg {...props}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
);

export const Key01 = (props) => (
  <Svg {...props}>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777Zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </Svg>
);

export const ArrowUpRight = (props) => (
  <Svg {...props}>
    <path d="M7 17 17 7M7 7h10v10" />
  </Svg>
);

export const CalendarCheck01 = (props) => (
  <Svg {...props}>
    <path d="M21 10H3m14-8v4M7 2v4m2.5 11L11 18.5l3.5-3.5M6.8 22h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 19.72 22 18.88 22 17.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 4 18.88 4 17.2 4H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 6.28 2 7.12 2 8.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 22 5.12 22 6.8 22Z" />
  </Svg>
);

export const Edit01 = (props) => (
  <Svg {...props}>
    <path d="M2.5 17.5 17 3a2.828 2.828 0 1 1 4 4L6.5 21.5 2 22l.5-4.5Z" />
  </Svg>
);

export const LogOut01 = (props) => (
  <Svg {...props}>
    <path d="m16 17 5-5m0 0-5-5m5 5H9m3 9H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 19.72 3 18.88 3 17.2V6.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 2 6.12 2 7.8 2H12" />
  </Svg>
);

export const XClose = (props) => (
  <Svg {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Svg>
);
