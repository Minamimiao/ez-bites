import { useEffect, useState } from "react";

function App() {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/menu")
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
            <h1>My Restaurant</h1>

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