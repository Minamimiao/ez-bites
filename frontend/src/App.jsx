import { useEffect, useState } from "react";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

function formatPrice(value) {
  const price = Number(value);
  return value !== null && value !== "" && Number.isFinite(price)
    ? `$${price.toFixed(2)}`
    : "Price unavailable";
}

function App() {
  const [menu, setMenu] = useState([]);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);
    let active = true;

    async function loadMenu() {
      setStatus("loading");
      try {
        const response = await fetch(`${API_URL}/api/menu`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Menu request failed");
        const data = await response.json();
        if (!Array.isArray(data) || data.some((item) => !item || typeof item.name !== "string")) {
          throw new Error("Invalid menu response");
        }
        if (active) {
          setMenu(data);
          setStatus("ready");
        }
      } catch {
        if (active) setStatus("error");
      } finally {
        clearTimeout(timeout);
      }
    }

    loadMenu();
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#menu">Skip to menu</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="EZ Bites home">
          ez<span>bites</span><span className="wordmark-period">.</span>
        </a>
        <a className="menu-link" href="#menu" aria-current="page">The menu</a>
      </header>

      <main id="top" className="menu-layout">
        <section id="menu" className="menu-panel" aria-labelledby="menu-title">
          <div className="menu-intro">
            <p className="eyebrow">Take your pick</p>
            <h1 id="menu-title">The <em>menu</em><span>.</span></h1>
          </div>

          <div className="menu-section-heading">
            <h2>On the menu</h2>
            {status === "ready" && <span>{menu.length} {menu.length === 1 ? "item" : "items"}</span>}
          </div>

          <div className="menu-content" aria-busy={status === "loading"}>
            {status === "loading" && (
              <div className="loading-state" role="status">
                <p className="loading-label">Getting the menu ready…</p>
                <div className="menu-list skeleton-list" aria-hidden="true">
                  {[0, 1, 2, 3].map((item) => (
                    <div className="menu-item skeleton-item" key={item}>
                      <span className="skeleton skeleton-number" />
                      <span className="skeleton skeleton-name" />
                      <span className="skeleton skeleton-price" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="message-state" role="alert">
                <h3>The menu is taking a little longer.</h3>
                <p>We couldn’t load it just now. Please try again.</p>
                <button className="retry-button" onClick={() => setAttempt((value) => value + 1)}>Try again</button>
              </div>
            )}

            {status === "ready" && menu.length === 0 && (
              <div className="message-state" role="status">
                <h3>Something good is on its way.</h3>
                <p>Our menu will be here soon. Check back later.</p>
              </div>
            )}

            {status === "ready" && menu.length > 0 && (
              <ul className="menu-list">
                {menu.map((item, index) => (
                  <li className="menu-item" key={item.id ?? index}>
                    <span className="item-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.name}</h3>
                    <span className="item-price">{formatPrice(item.price)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="menu-signoff" aria-hidden="true">
            <span>EZ BITES</span>
            <span className="signoff-line" />
            <span>Enjoy.</span>
          </div>
        </section>

        <figure className="table-photo">
          <img
            src="/images/table-editorial.webp"
            alt="A sunlit restaurant table with a toasted sandwich, greens, and an orange linen napkin."
            width="1024"
            height="1536"
            fetchPriority="high"
          />
          <figcaption className="photo-caption">
            <span>A seat at the table.</span>
            <span>EZ Bites</span>
          </figcaption>
        </figure>
      </main>

      <footer className="site-footer">
        <span>EZ Bites</span>
        <span>Good company. Good bites.</span>
      </footer>
    </div>
  );
}

export default App;
