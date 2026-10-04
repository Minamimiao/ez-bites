import { useEffect, useState } from "react";

function App() {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/menu`)
            .then((response) => response.json())
            .then((data) => {
                setMenu(data);
            })
            .catch((error) => {
                console.error("Error fetching menu:", error);
            });
    }, []);

    return (
        <div>
            <h1>EZ Bites</h1>

            <h2>Menu</h2>

            {menu.map((item) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>${Number(item.price).toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
}

export default App;