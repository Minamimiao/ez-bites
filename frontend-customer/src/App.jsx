import React, { useEffect, useState } from 'react';
import Icon from './Icons.jsx';
import { INITIAL_PRODUCTS, SAMPLE_ORDERS, THEMES, money, orderTotal } from './data.js';

const STORAGE_KEY = 'ez-bites-owner-dashboard-v1';
const EMPTY_PRODUCT = { nameEn: '', nameFr: '', price: '', available: true };

function initialState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.products) && THEMES[saved.theme]) {
      return { products: saved.products, theme: saved.theme };
    }
  } catch { /* Use sample data when local storage is unavailable. */ }
  return { products: INITIAL_PRODUCTS, theme: 'sunny' };
}

function FoodPhoto({ theme, className = '' }) {
  const cfg = THEMES[theme];
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [theme]);
  return (
    <img
      className={className}
      src={failed ? cfg.fallback : cfg.photo}
      alt={`${cfg.meal} — ${cfg.label.toLowerCase()} theme`}
      onError={() => setFailed(true)}
    />
  );
}

function Brand() {
  return (
    <div className="brand">
      <div className="brand-copy">
        <strong>ezbites<span className="brand-period">.</span></strong>
        <small>OWNER WORKSPACE</small>
      </div>
    </div>
  );
}

function Sidebar({ active, onChange }) {
  const links = [
    { id: 'preview', label: 'Restaurant Preview', icon: 'eye' },
    { id: 'menu', label: 'Menu Management', icon: 'list' },
    { id: 'orders', label: 'Orders', icon: 'receipt' },
  ];

  return (
    <aside className="sidebar">
      <Brand />
      <div className="sidebar-nav-label">THE WORKSPACE</div>
      <nav className="sidebar-nav" aria-label="Dashboard pages">
        {links.map(link => (
          <button
            type="button"
            key={link.id}
            className={`nav-link ${active === link.id ? 'active' : ''}`}
            onClick={() => onChange(link.id)}
            aria-current={active === link.id ? 'page' : undefined}
          >
            <span>{link.label}</span>
            <Icon name="arrow" size={15} />
          </button>
        ))}
      </nav>
      <div className="sidebar-spacer" />
      <div className="sidebar-footer">
        <span className="sidebar-footer-kicker">EZ-BITES STUDIO</span>
        <span>Frontend demo<br />Built for a better bite.</span>
      </div>
    </aside>
  );
}

function Header({ active, onReset }) {
  const page = {
    preview: { eyebrow: 'RESTAURANT PREVIEW', title: 'preview', caption: 'See your storefront through your customers’ eyes.' },
    menu: { eyebrow: 'MENU MANAGEMENT', title: 'menu', caption: 'Everything on your menu, in one place.' },
    orders: { eyebrow: 'ORDER HISTORY', title: 'orders', caption: 'A clear view of your customer orders.' },
  }[active];

  return (
    <header className="page-header">
      <div className="header-copy">
        <div className="breadcrumbs">OWNER WORKSPACE <span>/</span> {page.eyebrow}</div>
        <h1>The <em>{page.title}</em><span className="heading-period">.</span></h1>
        <p>{page.caption}</p>
      </div>
      <div className="header-actions">
        <span className="demo-pill"><span className="demo-pulse" /> Demo mode</span>
        <button type="button" className="icon-text-button reset-button" onClick={onReset} title="Restore demo products and theme">
          <Icon name="refresh" size={15} /> Reset demo
        </button>
      </div>
