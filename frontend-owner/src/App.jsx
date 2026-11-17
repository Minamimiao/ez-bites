import React, { useEffect, useMemo, useState } from 'react';
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
  return <div className="brand"><span className="brand-symbol">✳</span><div className="brand-copy"><strong>ez-bites<span className="brand-period">.</span></strong><small>RESTAURANT STUDIO</small></div></div>;
}

function Sidebar({ active, onChange }) {
  const links = [
    { id: 'preview', label: 'Restaurant Preview', icon: 'eye' },
    { id: 'menu', label: 'Menu Management', icon: 'list' },
    { id: 'orders', label: 'Orders', icon: 'receipt' },
  ];
  return <aside className="sidebar">
    <Brand />
    <div className="sidebar-nav-label">WORKSPACE</div>
    <nav className="sidebar-nav" aria-label="Dashboard pages">
      {links.map((link) => <button type="button" key={link.id} className={`nav-link ${active === link.id ? 'active' : ''}`} onClick={() => onChange(link.id)} aria-current={active === link.id ? 'page' : undefined}>
        <Icon name={link.icon} size={19} /><span>{link.label}</span>{active === link.id && <span className="nav-dot" />}
      </button>)}
    </nav>
    <div className="sidebar-spacer" />
    <div className="sidebar-note"><div className="sidebar-note-top"><span className="note-status"/> FRONTEND DEMO</div><p>Make changes, explore the layout and get ready for backend integration.</p></div>
    <div className="sidebar-footer"><div className="avatar">EB</div><div><strong>EZ-Bites Team</strong><span>Owner workspace</span></div></div>
  </aside>;
}

function Header({ active, onReset }) {
  const page = { preview: ['Restaurant Preview', 'See your storefront through your customers’ eyes.'], menu: ['Menu Management', 'Everything on your menu, in one place.'], orders: ['Orders', 'A clear view of customer orders.'] }[active];
  return <header className="page-header">
    <div><div className="breadcrumbs">Workspace <Icon name="chevron" size={13} /> {page[0]}</div><h1>{page[0]}</h1><p>{page[1]}</p></div>
    <div className="header-actions"><span className="demo-pill"><span className="demo-pulse"/> Demo Mode</span><button type="button" className="icon-text-button reset-button" onClick={onReset} title="Restore demo products and theme"><Icon name="refresh" size={16}/> Reset demo</button></div>
  </header>;
}

function StorefrontPreview({ products, theme, size }) {
  const [language, setLanguage] = useState('en');
  const cfg = THEMES[theme];
  const variables = { '--store-bg': cfg.bg, '--store-text': cfg.ink, '--store-accent': cfg.accent, '--store-soft': cfg.accentSoft };
  return <div className={`storefront ${size === 'mobile' ? 'storefront-mobile' : ''}`} style={variables}>
    <div className="storefront-top"><span><Icon name="pin" size={12}/> 123 Harbour Street, Nanaimo, BC</span><span><Icon name="phone" size={12}/> (250) 555-0100</span></div>
    <div className="storefront-inner">
      <div className="storefront-brand"><span>EZ-Bites<span>.</span></span><div className="lang-switch" aria-label="Menu language"><button type="button" className={language==='en'?'selected':''} onClick={()=>setLanguage('en')}>EN</button><button type="button" className={language==='fr'?'selected':''} onClick={()=>setLanguage('fr')}>FR</button></div></div>
      <div className="storefront-columns">
        <div className="store-menu-col"><div className="store-eyebrow">FRESHLY PREPARED · PICKUP ONLY</div><h2>Good food.<br/><em>Good mood.</em></h2><p className="store-intro">Made with care, ready for you.</p><div className="store-menu-title">Our menu <span>{products.length} items</span></div>
          <div className="store-menu-list">{products.length ? products.map(p => <div className={`store-menu-item ${!p.available ? 'unavailable' : ''}`} key={p.id}><div><strong>{language==='en'?p.nameEn:p.nameFr}</strong><small>{p.available ? 'Available' : 'Unavailable'}</small></div><span>{money(p.price)}</span><button disabled={!p.available} aria-label={`Add ${p.nameEn} (preview only)`} type="button" title="Read-only owner preview">+</button></div>) : <p className="empty-menu">No menu items yet. Add one in Menu Management.</p>}</div>
        </div>
        <div className="store-photo-col"><div className="photo-frame"><FoodPhoto theme={theme} className="store-food-photo"/><div className="photo-overlay"><span>{cfg.label.toUpperCase()} SPECIAL</span><strong>{cfg.meal}</strong></div></div><div className="photo-caption">Made for whatever the weather brings <span>✳</span></div></div>
      </div>
    </div>
    <div className="store-cart"><span><Icon name="cart" size={17}/> Your cart <b>0 items</b></span><span>View cart <Icon name="arrow" size={16}/></span></div>
  </div>;
}

function ThemeSelector({ draftTheme, onDraftChange, savedTheme, onSave }) {
  return <section className="panel theme-panel"><div className="panel-heading"><div><h3>Weather-based themes</h3><p>Choose a look, then save to update your storefront preview.</p></div><span className="section-tag">3 presets</span></div>
    <div className="theme-grid">
      {Object.entries(THEMES).map(([key, cfg]) => <button type="button" className={`theme-option ${draftTheme===key?'chosen':''}`} onClick={()=>onDraftChange(key)} key={key} aria-pressed={draftTheme===key}>
        <div className="theme-color" style={{background:`linear-gradient(120deg,${cfg.bg},${cfg.accentSoft})`}}><span style={{color:cfg.accent}}><Icon name={cfg.icon} size={28}/></span><div className="theme-circles"><i style={{background:cfg.accent}}/><i style={{background:cfg.color}}/><i style={{background:cfg.ink}}/></div></div>
        <div className="theme-bottom"><div><strong>{cfg.label}</strong><small>{cfg.meal}</small></div><span className={`pick-indicator ${draftTheme===key?'on':''}`}><Icon name="check" size={13}/></span></div>
      </button>)}
    </div>
    <div className="theme-actions"><div><span className="muted-dot"/> Currently live: <strong>{THEMES[savedTheme].label}</strong></div><button type="button" className="btn btn-primary" onClick={onSave} disabled={draftTheme===savedTheme}><Icon name="check" size={17}/> Save theme</button></div>
  </section>;
}

function PreviewPage({ products, theme, onSaveTheme, toast }) {
  const [draftTheme, setDraftTheme] = useState(theme);
  const [device, setDevice] = useState('desktop');
  useEffect(()=>setDraftTheme(theme),[theme]);
  function save() { onSaveTheme(draftTheme); toast(`${THEMES[draftTheme].label} theme saved to this browser`); }
  return <div className="page-content">
    <div className="welcome-banner"><div><div className="welcome-kicker"><Icon name="sparkle" size={15}/> YOUR DIGITAL STOREFRONT</div><h2>A little sunshine for your restaurant.</h2><p>Preview your menu exactly as customers would see it. Customize the look below.</p></div><div className="banner-ornament">✳</div></div>
    <section className="panel preview-panel"><div className="panel-heading"><div><h3>Storefront preview</h3><p>Saved theme and menu changes appear here.</p></div><div className="device-switch"><button type="button" aria-label="Desktop preview" aria-pressed={device==='desktop'} className={device==='desktop'?'selected':''} onClick={()=>setDevice('desktop')}><Icon name="device" size={17}/><span>Desktop</span></button><button type="button" aria-label="Mobile preview" aria-pressed={device==='mobile'} className={device==='mobile'?'selected':''} onClick={()=>setDevice('mobile')}><Icon name="mobile" size={17}/><span>Mobile</span></button></div></div>
      <div className={`preview-stage ${device==='mobile'?'is-mobile':''}`}><div className="browser-chrome"><div className="browser-dots"><i/><i/><i/></div><div className="browser-url">ez-bites · customer storefront preview</div><span className="browser-live"><span/> Preview</span></div><StorefrontPreview products={products} theme={theme} size={device}/></div>
      <p className="preview-hint"><Icon name="eye" size={16}/> This is a read-only preview. Order placement will be connected in a later phase.</p>
    </section>
    <ThemeSelector draftTheme={draftTheme} onDraftChange={setDraftTheme} savedTheme={theme} onSave={save}/>
  </div>;
}

function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(product ? { ...product, price: String(product.price) } : {...EMPTY_PRODUCT});
  const [error, setError] = useState('');
  const editing = Boolean(product);
  useEffect(()=>{const onKey=(e)=>{if(e.key==='Escape')onClose()}; window.addEventListener('keydown',onKey);return ()=>window.removeEventListener('keydown',onKey)},[onClose]);
  function submit(e) {
    e.preventDefault();
    const nameEn=form.nameEn.trim(), nameFr=form.nameFr.trim(), p=Number(form.price);
    if(!nameEn||!nameFr){ setError('Both English and French names are required.'); return; }
    if(form.price===''||!Number.isFinite(p)||p<0||Math.round(p*100)!==p*100){ setError('Enter a valid price with no more than two decimal places.'); return; }
    onSave({...form,nameEn,nameFr,price:p});
  }
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section role="dialog" aria-modal="true" aria-labelledby="product-modal-title" className="modal-card"><div className="modal-head"><div><div className="form-eyebrow">MENU ITEM</div><h2 id="product-modal-title">{editing?'Edit menu item':'Add a menu item'}</h2></div><button className="close-button" type="button" onClick={onClose} aria-label="Close dialog"><Icon name="x"/></button></div>
    <form onSubmit={submit}><div className="form-grid"><label className="field">English name <span>*</span><input autoFocus maxLength={90} value={form.nameEn} onChange={e=>setForm(f=>({...f,nameEn:e.target.value}))} placeholder="e.g. Classic Cheeseburger" /></label><label className="field">French name <span>*</span><input maxLength={90} value={form.nameFr} onChange={e=>setForm(f=>({...f,nameFr:e.target.value}))} placeholder="e.g. Cheeseburger classique" /></label></div>
    <label className="field">Price (CAD) <span>*</span><div className="price-input"><span>$</span><input type="number" step="0.01" min="0" max="100000" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} placeholder="0.00" /></div></label>
    <label className="availability-control"><input type="checkbox" checked={form.available} onChange={e=>setForm(f=>({...f,available:e.target.checked}))}/><div><strong>Available for customers</strong><span>Unavailable items remain visible but cannot be added to cart.</span></div></label>
    {error&&<p role="alert" className="form-error">{error}</p>}
    <div className="modal-actions"><button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary"><Icon name="check" size={17}/> {editing?'Save changes':'Add item'}</button></div>
    </form></section></div>;
}

function MenuPage({ products, setProducts, toast }) {
  const [editing,setEditing]=useState(null);
  const [showCreate,setShowCreate]=useState(false);
  const [deleteTarget,setDeleteTarget]=useState(null);
  const [query,setQuery]=useState('');
  const filtered=products.filter(p=>`${p.nameEn} ${p.nameFr}`.toLowerCase().includes(query.toLowerCase()));
  function saveProduct(form) {
    if(editing) { setProducts(previous=>previous.map(p=>p.id===editing.id?{...p,...form}:p));toast('Menu item updated'); }
    else {setProducts(previous=>[...previous,{...form,id:Math.max(0,...previous.map(p=>Number(p.id)||0))+1}]);toast('Menu item added');}
    setEditing(null);setShowCreate(false);
  }
  function toggleAvailability(id) { setProducts(prev=>prev.map(p=>p.id===id?{...p,available:!p.available}:p)); }
  function removeProduct(){setProducts(prev=>prev.filter(p=>p.id!==deleteTarget.id));toast('Menu item deleted');setDeleteTarget(null);}
  return <div className="page-content">
    <div className="stats-grid two-stats"><div className="stat-card"><div><span>Total menu items</span><strong>{products.length}</strong><small>Shown in the storefront</small></div><div className="stat-icon"><Icon name="list"/></div></div><div className="stat-card"><div><span>Available to order</span><strong>{products.filter(p=>p.available).length}</strong><small>{products.filter(p=>!p.available).length} marked unavailable</small></div><div className="stat-icon"><Icon name="check"/></div></div></div>
    <section className="panel menu-panel"><div className="panel-heading menu-panel-heading"><div><h3>Your menu</h3><p>English and French names are required for every item.</p></div><button type="button" className="btn btn-primary" onClick={()=>setShowCreate(true)}><Icon name="plus" size={17}/> Add new item</button></div>
      <div className="table-toolbar"><label className="search-field"><span className="magnifier">⌕</span><input aria-label="Search menu" placeholder="Search menu items..." value={query} onChange={e=>setQuery(e.target.value)}/></label><span>{filtered.length} items</span></div>
      <div className="table-scroll"><table className="data-table"><thead><tr><th>ITEM</th><th>FRENCH NAME</th><th>PRICE</th><th>AVAILABILITY</th><th className="right-align">ACTIONS</th></tr></thead><tbody>
        {filtered.map(p=><tr key={p.id}><td><div className="product-first"><span className="product-icon">✳</span><strong>{p.nameEn}</strong></div></td><td className="subdued-cell">{p.nameFr}</td><td className="price-cell">{money(p.price)}</td><td><button type="button" aria-label={`Set ${p.nameEn} ${p.available?'unavailable':'available'}`} aria-pressed={p.available} className={`availability-pill ${p.available?'yes':'no'}`} onClick={()=>toggleAvailability(p.id)}><span/>{p.available?'Available':'Unavailable'}</button></td><td><div className="table-actions"><button type="button" title={`Edit ${p.nameEn}`} aria-label={`Edit ${p.nameEn}`} onClick={()=>setEditing(p)}><Icon name="edit" size={17}/></button><button type="button" title={`Delete ${p.nameEn}`} aria-label={`Delete ${p.nameEn}`} className="delete-icon" onClick={()=>setDeleteTarget(p)}><Icon name="trash" size={17}/></button></div></td></tr>)}
        {!filtered.length&&<tr><td colSpan={5}><div className="no-results">No items match this search.</div></td></tr>}
      </tbody></table></div>
      <div className="table-footnote"><Icon name="eye" size={16}/> Changes are saved locally and reflected in Restaurant Preview.</div>
    </section>
    {(showCreate||editing)&&<ProductModal product={editing} onClose={()=>{setEditing(null);setShowCreate(false)}} onSave={saveProduct}/>}
    {deleteTarget&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setDeleteTarget(null)}}><section className="confirm-card" role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><div className="confirm-icon"><Icon name="trash"/></div><h2 id="delete-title">Delete this menu item?</h2><p><strong>{deleteTarget.nameEn}</strong> will be removed from the customer menu. Demo orders are historical snapshots and will remain unchanged.</p><div className="modal-actions"><button type="button" className="btn btn-secondary" onClick={()=>setDeleteTarget(null)}>Cancel</button><button type="button" className="btn btn-danger" onClick={removeProduct}>Delete item</button></div></section></div>}
  </div>;
}

function OrderDetails({ order }) {
  return <div className="order-detail"><div className="detail-grid"><div><span>CUSTOMER</span><strong>{order.customer}</strong></div><div><span>PHONE</span><strong>{order.phone}</strong></div><div><span>PAYMENT</span><strong>Pay at pickup</strong></div></div><div className="order-items-title">ORDER ITEMS</div><div className="order-lines">{order.items.map((item,i)=><div key={i}><span>{item.name} <em>× {item.qty}</em></span><strong>{money(item.price*item.qty)}</strong></div>)}</div><div className="order-total-line"><span>Total · taxes not included</span><strong>{money(orderTotal(order))}</strong></div></div>;
}

function OrdersPage({ toast }) {
  const [expanded,setExpanded]=useState(null);
  const [refreshed,setRefreshed]=useState(false);
  const orders=SAMPLE_ORDERS;
  const revenue=orders.reduce((sum,o)=>sum+orderTotal(o),0);
  const count=orders.reduce((sum,o)=>sum+o.items.reduce((s,item)=>s+item.qty,0),0);
  function refresh(){setRefreshed(true);toast('Demo orders refreshed — no backend connected');}
  return <div className="page-content">
    <div className="stats-grid"><div className="stat-card"><div><span>Demo orders</span><strong>{orders.length}</strong><small>Sample records only</small></div><div className="stat-icon"><Icon name="receipt"/></div></div><div className="stat-card"><div><span>Items ordered</span><strong>{count}</strong><small>Across sample orders</small></div><div className="stat-icon"><Icon name="list"/></div></div><div className="stat-card"><div><span>Order value</span><strong>{money(revenue)}</strong><small>Before tax · demo only</small></div><div className="stat-icon"><Icon name="cart"/></div></div></div>
    <section className="panel orders-panel"><div className="panel-heading menu-panel-heading"><div><h3>Recent orders</h3><p>View order details. Order status editing is not part of this demo.</p></div><button type="button" className="btn btn-secondary" onClick={refresh}><Icon name="refresh" size={17}/> Refresh orders</button></div>
      <div className="demo-info"><Icon name="sparkle" size={18}/><div><strong>Demo data only</strong><span>This page uses fictional orders. Refresh does not retrieve new orders until a backend is connected.</span></div></div>
      <div className="table-scroll"><table className="data-table order-table"><thead><tr><th>ORDER ID</th><th>TIME</th><th>CUSTOMER</th><th>PHONE</th><th>ITEMS</th><th>TOTAL</th><th className="right-align">DETAILS</th></tr></thead><tbody>
        {orders.map(order=><React.Fragment key={order.id}><tr className={expanded===order.id?'expanded-order':''}><td><strong>#{order.id}</strong></td><td className="subdued-cell">{new Date(order.time).toLocaleString('en-CA',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'})}</td><td>{order.customer}</td><td className="subdued-cell">{order.phone}</td><td>{order.items.reduce((sum,item)=>sum+item.qty,0)} items</td><td className="price-cell">{money(orderTotal(order))}</td><td className="right-align"><button type="button" className="details-button" onClick={()=>setExpanded(current=>current===order.id?null:order.id)} aria-expanded={expanded===order.id}>{expanded===order.id?'Hide':'View'} <Icon name="chevron" size={14}/></button></td></tr>{expanded===order.id&&<tr className="detail-row"><td colSpan={7}><OrderDetails order={order}/></td></tr>}</React.Fragment>)}
      </tbody></table></div>
      <div className="orders-footer"><span><span className="demo-pulse"/> {refreshed?'Demo orders reloaded':'Showing example orders'}</span><span>{orders.length} total records</span></div>
    </section>
  </div>;
}

export default function App() {
  const [initial] = useState(initialState);
  const [products,setProducts] = useState(initial.products);
  const [theme,setTheme] = useState(initial.theme);
  const [active,setActive] = useState('preview');
  const [notice,setNotice] = useState('');
  useEffect(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify({products,theme}))}catch{}},[products,theme]);
  function toast(message){setNotice(message);}
  function reset(){if(!window.confirm('Restore the original sample menu and sunny theme?'))return;setProducts(INITIAL_PRODUCTS);setTheme('sunny');toast('Demo data reset');}
  useEffect(()=>{if(!notice)return;const t=setTimeout(()=>setNotice(''),3800);return ()=>clearTimeout(t)},[notice]);
  return <div className="app-shell"><Sidebar active={active} onChange={setActive}/><main className="main-area"><Header active={active} onReset={reset}/>{active==='preview'&&<PreviewPage products={products} theme={theme} onSaveTheme={setTheme} toast={toast}/>} {active==='menu'&&<MenuPage products={products} setProducts={setProducts} toast={toast}/>} {active==='orders'&&<OrdersPage toast={toast}/>}<footer className="main-footer"><span>EZ-Bites · Owner Dashboard</span><span>Frontend-only prototype · No backend connection</span></footer></main>{notice&&<div className="toast" role="status"><Icon name="check" size={17}/>{notice}<button type="button" aria-label="Dismiss" onClick={()=>setNotice('')}><Icon name="x" size={15}/></button></div>}</div>;
}
