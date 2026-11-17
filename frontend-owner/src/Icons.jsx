import React from 'react';

const paths = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
  eye: <><path d="M2 12s3.7-6.5 10-6.5S22 12 22 12s-3.7 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="2.8"/></>,
  list: <><path d="M9 6h12M9 12h12M9 18h12"/><path d="M3.6 6h.01M3.6 12h.01M3.6 18h.01" strokeWidth="3" strokeLinecap="round"/></>,
  receipt: <><path d="M5 3h14v18l-3.5-2-3.5 2-3.5-2L5 21V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></>,
  cloud: <path d="M20 17H6a4 4 0 0 1-.5-7.97A6.5 6.5 0 0 1 18 9a4 4 0 0 1 2 8Z"/>,
  rain: <><path d="M20 14H6a4 4 0 0 1-.5-7.97A6.5 6.5 0 0 1 18 6a4 4 0 0 1 2 8Z"/><path d="m8 18-1 3m6-3-1 3m6-3-1 3"/></>,
  edit: <><path d="M12 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="m14 5 5 5M10 17l4.5-1 6.5-6.5a2 2 0 0 0-5-5L9.5 11Z"/></>,
  trash: <><path d="M4 7h16M10 4h4M6 7l1 13h10l1-13M10 11v5M14 11v5"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  x: <path d="M18 6 6 18M6 6l12 12"/>,
  refresh: <><path d="M20 11a8 8 0 0 0-14-5L3 9"/><path d="M3 4v5h5M4 13a8 8 0 0 0 14 5l3-3"/><path d="M21 20v-5h-5"/></>,
  phone: <path d="M6.6 3 4 5.5c-1 1-1.1 2.7-.1 4.5 2.6 5 7.1 9.5 12 12.1 1.8 1 3.5.9 4.5-.1l2.5-2.6-5-4-2 2c-2.4-1.1-4.3-3-5.5-5.5l2-2-4-5Z"/>,
  pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6"/>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  device: <><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 22h8M12 18v4"/></>,
  mobile: <><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></>,
  cart: <><path d="M3 4h2l2.2 11h11.5l2-8H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  sparkle: <><path d="m12 2 2.1 7.9L22 12l-7.9 2.1L12 22l-2.1-7.9L2 12l7.9-2.1L12 2Z"/></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></>,
};
export default function Icon({ name, size = 20, className = '' }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.grid}</svg>;
}
