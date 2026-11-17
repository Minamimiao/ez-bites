// All data in this first version is local demo data.
// No API endpoints, database, payment processing, or owner authentication are used.
export const INITIAL_PRODUCTS = [
  { id: 1, nameEn: 'Classic Cheeseburger', nameFr: 'Cheeseburger classique', price: 12.5, available: true },
  { id: 2, nameEn: "Shepherd's Pie", nameFr: 'Hachis parmentier', price: 17, available: true },
  { id: 3, nameEn: 'Clam Chowder', nameFr: 'Chaudrée de palourdes', price: 11.5, available: true },
  { id: 4, nameEn: 'Crispy French Fries', nameFr: 'Frites croustillantes', price: 5.5, available: true },
  { id: 5, nameEn: 'House Lemonade', nameFr: 'Limonade maison', price: 4.5, available: false },
  { id: 6, nameEn: 'Garden Salad', nameFr: 'Salade du jardin', price: 9.5, available: true },
];

// Demonstration-only data. No real customers or phone numbers.
export const SAMPLE_ORDERS = [
  { id: '1042', time: '2026-11-16T11:45:00', customer: 'Alex Morgan', phone: '555-0101', items: [{ name: 'Classic Cheeseburger', qty: 2, price: 12.5 }, { name: 'Crispy French Fries', qty: 1, price: 5.5 }] },
  { id: '1041', time: '2026-11-16T11:28:00', customer: 'Sam Taylor', phone: '555-0114', items: [{ name: "Shepherd's Pie", qty: 1, price: 17 }, { name: 'House Lemonade', qty: 1, price: 4.5 }] },
  { id: '1040', time: '2026-11-16T10:56:00', customer: 'Jamie Lee', phone: '555-0120', items: [{ name: 'Clam Chowder', qty: 2, price: 11.5 }] },
  { id: '1039', time: '2026-11-16T10:12:00', customer: 'Casey Brown', phone: '555-0139', items: [{ name: 'Classic Cheeseburger', qty: 1, price: 12.5 }, { name: 'Garden Salad', qty: 1, price: 9.5 }] },
];

export const THEMES = {
  sunny: {
    label: 'Sunny', meal: 'Classic Cheeseburger', icon: 'sun', color: '#eab56d',
    photo: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Cheeseburger_%282%29.jpg/960px-Cheeseburger_%282%29.jpg',
    fallback: '/images/sunny.svg',
    bg: '#fff4de', ink: '#46351f', accent: '#aa692e', accentSoft: '#f8e4c5',
  },
  cloudy: {
    label: 'Cloudy', meal: "Shepherd's Pie", icon: 'cloud', color: '#9baaad',
    photo: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/ShepherdsPieAndPeas.JPG/500px-ShepherdsPieAndPeas.JPG',
    fallback: '/images/cloudy.svg',
    bg: '#edf1ee', ink: '#364744', accent: '#50706a', accentSoft: '#dce6e1',
  },
  rainy: {
    label: 'Rainy', meal: 'Clam Chowder', icon: 'rain', color: '#8aafcd',
    photo: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Clam_chowder.jpg/960px-Clam_chowder.jpg',
    fallback: '/images/rainy.svg',
    bg: '#e8f0f7', ink: '#293c51', accent: '#547896', accentSoft: '#d5e6f1',
  },
};

export const money = (n) => `$${Number(n).toFixed(2)}`;
export const orderTotal = (order) => order.items.reduce((sum, item) => sum + item.qty * item.price, 0);
