# CSCI 265 Requirements and specifications

## Team name: 4 Tiny Stars

## Project/product name: EZ Bites

## Contact person and email

- Jiamiao Zhao, jiamiao.zhao@my.viu.ca *main contact*
- Mira Milat, mira.milat@my.viu.ca
- Chengan Tian, chengan.tian@my.viu.ca
- Brahmi Duklan, brahmi.duklan@my.viu.ca

## Table of Contents

1. [ Introduction and overview ](#section1)

2. [ Product features and behaviour ](#section2)

3. [ User interface and navigation ](#section3)

4. [ Use cases/scenarios ](#section4)

5. [ Non-functional requirements ](#section5)

6. [ Feature prioritization ](#section6)

7. [ Glossary ](#section7)

8. [ Appendices ](#section8)

## List of Figures

A. [Navigation guide and architecture map](#fig-a)

B. [Main customer page (desktop layout)](#fig-b)

C. [Main customer page (mobile layout)](#fig-c)

D. [Cart review and pay-at-pickup checkout panel](#fig-d)

E. [Order confirmation view](#fig-e)

F. [Owner dashboard: Restaurant preview page](#fig-f)

G. [Owner dashboard: Menu management and theme controls page](#fig-g)

H. [Add / edit menu item pop-up modal](#fig-h)

I. [Owner dashboard: Read-only orders page](#fig-i)

## Introduction and overview <a name="section1"></a>

EZ Bites is a lightweight restaurant ordering prototype designed for a single restaurant. It provides two core interfaces connected to a backend and database: a public single-page website for customers to browse the menu and place pickup orders, and a private three-page dashboard for the restaurant owner to manage menu items, preview themes, and view incoming orders.

### Core Features & How It Works

EZ Bites separates customer actions from administrative controls through two distinct interfaces:

**For Customers:**
- **Single-Page Customer Website:** A vertically scrollable page featuring the restaurant address and contact phone number clearly visible at the top.
- **Responsive Layout:** On desktop, the menu appears in the left region and one large food image appears in the right region. On mobile, the food image appears above the menu, and menu items are displayed in a vertical sequence.
- **Bilingual Item-Name Switch:** A visible English/French control switches only the displayed menu item names (prices, buttons, labels, and other page text remain untranslated).
- **Flat Menu Display:** The menu displays all active items in a flat list without category groupings, item descriptions, or individual product images. Each item shows its bilingual name, price, availability status, and an "Add" button (unavailable items remain visible with disabled add buttons).
- **Persistent Bottom Cart Bar & Panel:** A fixed bottom cart bar stays visible during scrolling. Tapping it opens a cart panel allowing quantity increases/decreases and item removal. Unsubmitted carts are not persisted and will be cleared upon a page refresh or browser closure.
- **Pay-at-Pickup Checkout:** Checkout requires only the customer's name and phone number. Orders use pay-at-pickup exclusively, and the total does not include any tax.
- **Order Confirmation:** Successful order submission displays a confirmation screen showing the order number, item names, quantities, and total amount.

**For Restaurant Owners:**
- **Three-Page Navigation Dashboard:** The dashboard provides three navigable pages: Restaurant Preview, Menu Management, and Orders.
- **Saved-State Restaurant Preview:** The Preview page displays the customer-facing page using saved menu and theme data, reflecting changes instantly upon saving.
- **Manual Weather-Themed Appearance:** The owner can manually choose and save one of three weather themes (Sunny-Hamburger, Cloudy-Shepherd's Pie, Rainy-Clam Chowder). This updates both page colors and the single large food image on the preview and customer pages.
- **Menu Item Management:** The owner can add, edit, delete, and toggle the availability of menu items. Each new item requires an English name, a French name, and a price. Deleted items disappear from the customer menu while preserving historical order integrity.
- **Read-Only Orders Page:** The owner can view order details (order ID, submission time, customer name, phone, item names, quantities, and total amount). The page includes a "Refresh Orders" control to fetch newly submitted orders. No order status modification controls are provided.

### Targeted Platforms

EZ Bites runs in standard web browsers on both desktop computers and mobile devices, adapting its layout responsibilities cleanly between screen sizes.

### Expected System Limitations & Course Boundaries

To complete development, testing, and deployment within the academic term, EZ Bites operates under specific project boundaries:

- **Single Restaurant Scope:** The system stores information for one restaurant.
- **Pickup Orders and Pay-at-Pickup Only:** The order workflow supports in-store pickup with cash/counter payment. Online payments, credit card processing, and taxes are excluded.
- **No Owner Authentication / Login:** By design, owner login and user account management are excluded; the dashboard is treated as a class demonstration prototype with controlled access rather than a publicly secure production system.
- **No Cart Persistence:** Unsubmitted cart data is transient and clears upon page refresh.
- **Manual Weather Controls:** The weather theme is manually selected by the owner. There is no automatic weather detection API.
- **No Real-Time Push or Status Editing:** Orders are loaded on entry or via manual refresh, and order statuses cannot be edited by the owner.

## Product features and behaviour <a name="section2"></a>

EZ Bites is divided into two separate interfaces: the Customer Website (a single publicly accessible page) and the Owner Dashboard (a three-page administrative interface). Both interfaces share the same backend API and PostgreSQL database.

### Part 1: Customer Website Features

#### 1.1 Single-Page Structure and Responsive Layout
- **How it works:** The customer website is a single vertically scrollable page that adapts automatically to desktop and mobile viewports.
- **Header & Contact Details:** The restaurant's street address and contact phone number are visibly displayed at the top of the page.
- **Responsive Layout Rules:**
  - **Desktop:** The menu list is positioned in the left region, while one large themed food image is displayed in the right region.
  - **Mobile:** The single large food image appears at the top above the menu, and menu items are arranged in a vertical sequence below it.

#### 1.2 Weather-Based Visual Theme Display
- **How it works:** When a customer loads or refreshes the website, the frontend fetches the currently saved theme setting from the backend and applies the matching color palette and single large food image.
- **Supported Themes & Associated Images:**
  - **Sunny:** Warm yellow/orange color accents paired with a large Hamburger image.
  - **Cloudy:** Neutral grey/soft blue color accents paired with a large Shepherd's Pie image.
  - **Rainy:** Cool blue/slate color accents paired with a large Clam Chowder image.
- **System Behaviour:**
  - Customers cannot manually change the theme; it is controlled exclusively by the owner.
  - Updating the theme in the dashboard appears on the customer website after the page is refreshed.

#### 1.3 Menu Browsing and Bilingual Item-Name Switch
- **How it works:** Customers browse a single flat list of all active menu items without category groupings, dish descriptions, allergen tags, or individual product photos.
- **Displayed Item Details:** Each menu item row/card shows only:
  - Item name (in the currently selected language)
  - Price (formatted to two decimal places, for example, $12.50)
  - Availability status (Available / Unavailable)
  - An Add button
- **English / French Language Switch:**
  - A visible language control allows customers to toggle menu item names between English and French.
  - **Strict Scope:** This switch translates only the menu item names. Prices, buttons, labels, headers, and all other page text remain untranslated.
- **System Behaviour:**
  - **Unavailable Items:** Items marked unavailable by the owner remain visible on the menu, but their Add buttons are disabled (greyed out and unclickable).

#### 1.4 Persistent Bottom Cart Bar and Cart Panel
- **How it works:**
  - **Adding an item:** Click the Add button on any available menu item.
  - **Persistent Cart Bar:** A fixed cart bar remains anchored at the bottom of the visible screen while the customer scrolls, without obscuring menu content or checkout controls.
  - **Opening the Cart Panel:** Tapping or clicking the bottom cart bar opens the cart panel.
  - **Modifying Items:** Inside the cart panel, customers can increase item quantities, decrease item quantities, or remove items completely.
- **System Behaviour:**
  - Adding an item already in the cart increments its quantity.
  - The displayed cart subtotal recalculates immediately in the browser as items are added, updated, or removed (calculated strictly as price times quantity with no tax).
  - **No Persistence Before Checkout:** Cart contents are stored in transient memory only. An unsubmitted cart is not saved to localStorage and will be completely cleared if the customer refreshes the page or closes the browser.

#### 1.5 Pay-at-Pickup Checkout and Order Confirmation
- **How it works:**
  1. Open the cart panel and proceed to checkout.
  2. Enter Customer Name and Phone Number into the checkout form.
  3. Submit the order.
- **Input Rules and Limits:**
  - **Customer Name:** Required text field (cannot be empty or whitespace only).
  - **Phone Number:** Required field (validated for proper numeric/phone format).
  - **Payment & Tax:** No online payment or credit card fields are presented; all orders are pay-at-pickup only, and the total amount excludes tax.
- **Validation and Error Handling:**
  - **Invalid/Missing Input:** Submitting blank fields or invalid data blocks submission and highlights the validation errors.
  - **Unavailable Items at Checkout:** The backend validates item availability upon submission. If an item was marked unavailable or deleted while the customer was checking out, the backend rejects the order and prevents a confirmation screen from appearing.
- **What happens on valid submission:**
  - The backend saves the order in PostgreSQL with a snapshot of the item names, quantities, and unit prices at the time of submission.
  - The active cart is cleared.
  - An Order Confirmation screen is displayed showing the unique Order Number, item names, quantities, and total amount. (If submission fails, no confirmation is shown.)

### Part 2: Owner Dashboard Features

#### 2.1 Dashboard Navigation and Access
- **How it works:** The Owner Dashboard consists of three navigable pages:
  1. Restaurant Preview
  2. Menu Management
  3. Orders
- **Access Boundary:** Owner login and user account management are excluded from this course prototype; the dashboard is accessed directly for demonstration purposes without authentication prompts.

#### 2.2 Saved-State Restaurant Preview
- **How it works:** The Restaurant Preview page renders the exact customer-facing restaurant page inside the dashboard using the currently saved menu items and saved weather theme from the database.
- **System Behaviour:**
  - The preview reflects changes only after they have been saved in Menu Management or Theme Settings; unsaved edits do not appear.

#### 2.3 Manual Weather-Themed Appearance Control
- **How it works:** Within the dashboard, the owner can select one of three predefined weather themes (Sunny, Cloudy, or Rainy) and click Save.
- **Input Limits:**
  - Theme selection is strictly manual; no external weather API or automatic location detection is used.
- **System Behaviour:**
  - Saving a theme updates PostgreSQL with the active theme and its paired food image (Sunny-Hamburger, Cloudy-Shepherd's Pie, Rainy-Clam Chowder).
  - Once saved, the updated theme immediately reflects in the Restaurant Preview tab and appears on the public Customer Website upon page refresh.

#### 2.4 Menu Item Management
- **How it works:** On the Menu Management page, the owner can view all menu items and perform full CRUD operations (Create, Read, Update, Delete) as well as toggle availability.
- **Input Rules and Limits for Menu Items:**
  - **English Name:** Required text field.
  - **French Name:** Required text field.
  - **Price:** Required positive numeric value (validated to prevent negative numbers, zero, or non-numeric strings).
  - **Availability:** Configurable toggle/checkbox (Available vs. Unavailable).
  - *Note:* Category fields, item descriptions, and individual dish image uploads are excluded.
- **System Behaviour:**
  - **Adding / Editing:** Validates inputs and saves the bilingual names, price, and availability to PostgreSQL.
  - **Toggling Availability:** Updates whether customers can add the item to their cart (unavailable items remain visible on the menu with a disabled Add button).
  - **Deleting Items & Historical Integrity:** Deleting an item immediately removes it from the customer menu and menu management list. However, previously submitted orders retain a permanent snapshot of the item's historical name, unit price, and quantity so past order records remain accurate and intact.

#### 2.5 Read-Only Orders Page
- **How it works:**
  1. Navigate to the Orders page in the Owner Dashboard.
  2. The page automatically fetches and displays existing orders upon entry.
  3. Click the Refresh Orders button to manually fetch any newly submitted customer orders from the database.
- **Displayed Order Information:** Each order record displays:
  - Order ID
  - Submission Time
  - Customer Name
  - Customer Phone Number
  - Ordered Item Names & Quantities
  - Total Amount (no tax)
- **System Behaviour:**
  - **Strictly Read-Only:** The owner cannot edit order details, cancel orders, or change order statuses (there are no status dropdowns or fulfillment buttons).
  - **No Real-Time Push:** Automatic WebSocket/push notifications are not used; new orders appear upon page entry or by clicking Refresh Orders.

## User interface and navigation <a name="section3"></a>

This section outlines the visual layout, interactive components, pop-up panels, and screen-to-screen navigation flows for both the Customer Website and the Owner Dashboard.

### 1. Navigation Guide & Architecture Map

EZ Bites consists of two separate entry points with straightforward navigation and no login gates:

**Figure A: Navigation guide and architecture map** <a name="fig-a"></a>

```text
                       [ EZ Bites Web Application ]
                                    │
             ┌────────────────────────────────────────────────┐
             ▼                                                ▼
    [ Customer Website ]                              [ Owner Dashboard ]
(Single Vertically Scrollable Page)              (Top Navigation Bar - 3 Pages)
             │                                                │
             ├─ Tap Bottom Cart Bar                           ├─ 1. Restaurant Preview
             │  └─ Cart & Checkout Panel                      │     └─ Renders saved customer view
             │     └─ Submit Valid Order                      │
             │        └─ Order Confirmation                   ├─ 2. Menu Management
             │           └─ Done                              │     ├─ Weather Theme Selector
             │                                                │     └─ Add / Edit Item Form Modal
             │                                                │
             └─ Page Refresh / Reload                         └─ 3. Orders (Read-Only)
                └─ Clears unsubmitted cart                          └─ "Refresh Orders" button
```

#### Navigation Flow Description

**Customer Navigation**:
- The customer experience operates entirely within a single page without multi-page route transitions.
- Tapping the persistent Bottom Cart Bar opens the Cart & Checkout Panel (drawer/modal).
- Submitting a valid pay-at-pickup order transitions the panel view to the Order Confirmation view. Closing the confirmation returns the customer to the main menu with an empty cart.
- Refreshing the browser reloads the saved theme and menu from the backend and resets any unsubmitted cart.

**Owner Navigation**:
- Navigating directly to the Owner Dashboard opens a persistent top navigation bar allowing one-click switching between three pages: Restaurant Preview, Menu Management, and Orders.
- **Restaurant Preview** acts as the default landing view (or selectable tab) showing the saved state of the Customer Website.
- **Menu Management** provides inline controls and an Add/Edit Item Modal alongside the Weather Theme Selector.
- **Orders** displays a read-only list of orders with a manual Refresh Orders button.

### 2. Customer Website Wireframes & Element Descriptions

#### 2.1 Main Customer Page - Desktop vs. Mobile Layout

The customer interface adapts its layout depending on viewport width while retaining identical functionality and theme styling.

**Figure B: Main customer page (desktop layout)** <a name="fig-b"></a>

```text
+-----------------------------------------------------------------------------------+
|  EZ BITES                                           [ EN | FR ] (Language Switch) |
|  123 Harbourfront St, Nanaimo, BC   Tel: (250) 555-5555                           |
+-----------------------------------------+-----------------------------------------+
|  MENU                                   |                                         |
|  +-----------------------------------+  |                                         |
|  | Classic Burger            $12.50  |  |                                         |
|  | Available               [ + Add ] |  |                                         |
|  +-----------------------------------+  |        [ LARGE THEMED FOOD IMAGE ]      |
|  | Clam Chowder               $9.00  |  |                                         |
|  | Available               [ + Add ] |  |        • Sunny:   Hamburger             |
|  +-----------------------------------+  |        • Cloudy:  Shepherd's Pie        |
|  | Garden Salad               $8.50  |  |        • Rainy:   Clam Chowder          |
|  | Unavailable          [ Disabled ] |  |                                         |
|  +-----------------------------------+  |                                         |
|  | Iced Tea                   $3.00  |  |                                         |
|  | Available               [ + Add ] |  |                                         |
|  +-----------------------------------+  |                                         |
+-----------------------------------------+-----------------------------------------+
|  [ 2 Items  |  Subtotal: $21.50                           View Cart / Checkout ]  |
+-----------------------------------------------------------------------------------+
```

**Figure C: Main customer page (mobile layout)** <a name="fig-c"></a>

```text
+---------------------------------------+
|  EZ BITES                 [ EN | FR ] |
|  123 Harbourfront St | (250) 555-5555 |
+---------------------------------------+
|                                       |
|      [ LARGE THEMED FOOD IMAGE ]      |
|                                       |
+---------------------------------------+
|  MENU                                 |
|  +---------------------------------+  |
|  | Classic Burger          $12.50  |  |
|  | Available             [ + Add ] |  |
|  +---------------------------------+  |
|  | Clam Chowder             $9.00  |  |
|  | Available             [ + Add ] |  |
|  +---------------------------------+  |
|  | Garden Salad             $8.50  |  |
|  | Unavailable        [ Disabled ] |  |
|  +---------------------------------+  |
|  | (Scrolls vertically...)         |  |
+---------------------------------------+
|  [ 2 Items | $21.50      View Cart ]  |
+---------------------------------------+
```

**Visible Elements & Options:**
- **Top Header Bar:** Displays the restaurant name, street address, and contact phone number (always visible at the top of the page).
- **English/French Toggle ( EN | FR ):** Switches only the displayed menu item names between English and French. All prices, buttons, labels, and header text remain in English.
- **Themed Food Image:** Displays a single large photo determined by the owner's saved weather theme (Right column on desktop; positioned above the menu on mobile). Individual dishes do not have thumbnails.
- **Flat Menu List:** Displays all active items in a single ungrouped list without categories or descriptions. Each card shows the item name, price, availability status (Available / Unavailable), and an Add button (greyed out and unclickable when Unavailable).
- **Persistent Bottom Cart Bar:** Fixed to the bottom edge of the screen during vertical scrolling. Displays current item count, tax-free subtotal, and triggers the Cart Panel when clicked/tapped.

#### 2.2 Cart Panel, Pay-at-Pickup Checkout & Order Confirmation (Pop-up / Drawer)

Tapping the bottom cart bar opens an overlay drawer/modal containing the cart items and checkout form. Upon successful submission, the panel updates to display the confirmation receipt.

**Figure D: Cart review and pay-at-pickup checkout panel** <a name="fig-d"></a>

```text
+-------------------------------------------------------+
|  YOUR CART                                     [ X ]  |
+-------------------------------------------------------+
|  Classic Burger ($12.50)       [ - ]  1  [ + ]  [rm]  |
|  Clam Chowder   ($9.00)        [ - ]  1  [ + ]  [rm]  |
+-------------------------------------------------------+
|  Total (No Tax / Pay at Pickup):              $21.50  |
+-------------------------------------------------------+
|  PICKUP DETAILS                                       |
|  Customer Name *                                      |
|  [ Alice Smith ]                                      |
|                                                       |
|  Phone Number *                                       |
|  [ 250-111-1111 ]                                     |
|                                                       |
|  [            Place Pay-at-Pickup Order            ]  |
+-------------------------------------------------------+
```

**Figure E: Order confirmation view** <a name="fig-e"></a>

```text
+-------------------------------------------------------+
|  ORDER CONFIRMED!                              [ X ]  |
+-------------------------------------------------------+
|  Order Number:  #1042                                 |
|  Payment:       Pay at Pickup                         |
+-------------------------------------------------------+
|  ITEMS ORDERED                                        |
|  • 1x Classic Burger                          $12.50  |
|  • 1x Clam Chowder                             $9.00  |
+-------------------------------------------------------+
|  Total Amount:                                $21.50  |
+-------------------------------------------------------+
|  [                 Back to Menu                    ]  |
+-------------------------------------------------------+
```

**Visible Elements & Options:**
- **Close Button [ X ]:** Dismisses the panel and returns to scrolling the menu (retaining unsubmitted items until page refresh).
- **Quantity Controls [ - ] / [ + ] & Remove:** Adjusts item counts or removes items, recalculating the tax-free total immediately.
- **Checkout Inputs:** Two mandatory fields (Customer Name and Phone Number). No credit card or payment fields exist.
- **Place Pay-at-Pickup Order Button:** Submits the order to the backend. If validation fails or an item became unavailable, an inline error message appears and the Order Confirmation view is not shown.
- **Order Confirmation View:** Displays the generated Order Number, itemized names, quantities, and total amount.

### 3. Owner Dashboard Wireframes & Element Descriptions

The Owner Dashboard requires no login and features a unified top navigation bar with three pages: Restaurant Preview, Menu Management, and Orders.

#### 3.1 Page 1: Restaurant Preview

**Figure F: Owner dashboard: Restaurant preview page** <a name="fig-f"></a>

```text
+-----------------------------------------------------------------------------------+
|  EZ BITES - OWNER DASHBOARD [ Restaurant Preview ] [ Menu Management ] [ Orders ] |
+-----------------------------------------------------------------------------------+
|  Previewing Saved State (Active Theme: Sunny)                                     |
|  +-----------------------------------------------------------------------------+  |
|  |  EZ BITES                                                   [ EN | FR ]     |  |
|  |  123 Harbourfront St, Nanaimo, BC   Tel: (250) 555-5555                     |  |
|  +--------------------------------------+--------------------------------------+  |
|  |  MENU                                |                                      |  |
|  |  • Classic Burger          $12.50    |      [ HAMBURGER IMAGE (SUNNY) ]     |  |
|  |  • Clam Chowder             $9.00    |                                      |  |
|  +--------------------------------------+--------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

**Visible Elements & Options:**
- **Dashboard Navigation Tabs:** Switches directly between the three dashboard pages.
- **Saved-State Preview Frame:** Displays the live customer-facing layout using the latest saved menu items and saved weather theme from PostgreSQL. Unsaved changes in other tabs do not appear until saved.

#### 3.2 Page 2: Menu Management & Theme Controls

**Figure G: Owner dashboard: Menu management and theme controls page** <a name="fig-g"></a>

```text
+-----------------------------------------------------------------------------------+
|  EZ BITES - OWNER DASHBOARD [ Restaurant Preview ] [ Menu Management ] [ Orders ] |
+-----------------------------------------------------------------------------------+
|  WEATHER THEME APPEARANCE (Manual Selection)                                      |
|  (•) Sunny (Hamburger)   ( ) Cloudy (Shepherd's Pie)   ( ) Rainy (Clam Chowder)   |
|  [ Save Theme ]                                                                   |
+-----------------------------------------------------------------------------------+
|  MENU ITEMS                                                    [ + Add New Item ] |
|  +------------------------+------------------------+---------+-----------+--------+
|  | English Name           | French Name            | Price   | Available | Actions|
|  +------------------------+------------------------+---------+-----------+--------+
|  | Classic Burger         | Hamburger Classique    | $12.50  | [v] Yes   |Edit/Del|
|  | Clam Chowder           | Chaudrée de Palourdes  |  $9.00  | [v] Yes   |Edit/Del|
|  | Garden Salad           | Salade du Jardin       |  $8.50  | [ ] No    |Edit/Del|
|  +------------------------+------------------------+---------+-----------+--------+
```

**Figure H: Add / edit menu item pop-up modal** <a name="fig-h"></a>

```text
+-------------------------------------------------------+
|  ADD / EDIT MENU ITEM                           [ X ] |
+-------------------------------------------------------+
|  English Name *                                       |
|  [ Classic Poutine ]                                  |
|                                                       |
|  French Name *                                        |
|  [ Poutine Classique ]                                |
|                                                       |
|  Price ($) *                                          |
|  [ 11.00 ]                                            |
|                                                       |
|  Availability                                         |
|  [•] Available for customer ordering                  |
|                                                       |
|  [ Cancel ]                             [ Save Item ] |
+-------------------------------------------------------+
```

**Visible Elements & Options:**
- **Weather Theme Radio Selector & Save Theme Button:** Allows manual selection of Sunny, Cloudy, or Rainy. Clicking Save Theme persists the theme to the database and updates the Restaurant Preview tab and refreshed customer pages.
- **Add New Item Button & Edit Links:** Opens the Add / Edit Menu Item Modal requiring mandatory English Name, mandatory French Name, numeric Price, and Availability toggle.
- **Availability Checkbox/Toggle:** Directly toggles whether customers can add the item to their cart.
- **Delete Button:** Deletes the item from the active menu while keeping historical order records intact.

#### 3.3 Page 3: Orders (Read-Only)

**Figure I: Owner dashboard: Read-only orders page** <a name="fig-i"></a>

```text
+-----------------------------------------------------------------------------------+
|  EZ BITES - OWNER DASHBOARD [ Restaurant Preview ] [ Menu Management ] [ Orders ] |
+-----------------------------------------------------------------------------------+
|  CUSTOMER ORDERS (Read-Only)                                   [ Refresh Orders ] |
|  +-----------------------------------------------------------------------------+  |
|  | Order #1042  |  Submitted: Nov 17, 2026 12:15 PM            Total: $21.50   |  |
|  | Customer: Alice Smith  |  Phone: 250-111-1111                               |  |
|  | Items: 1x Classic Burger ($12.50), 1x Clam Chowder ($9.00)                  |  |
|  +-----------------------------------------------------------------------------+  |
|  | Order #1041  |  Submitted: Nov 17, 2026 11:48 AM            Total: $12.50   |  |
|  | Customer: Bob Lee      |  Phone: 250-222-2222                               |  |
|  | Items: 1x Classic Burger ($12.50)                                           |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

**Visible Elements & Options:**
- **Refresh Orders Button:** Manually fetches newly placed customer orders from the backend database (no automatic real-time push).
- **Read-Only Order Cards:** Displays Order ID, Submission Time, Customer Name, Customer Phone Number, Item Names & Quantities (preserved as historical snapshots), and Total Amount. No status dropdowns, edit buttons, or cancellation controls exist on this page.

## Use cases/scenarios <a name="section4"></a>

### 1. Primary Use Cases

#### Use Case 1: Browse Menu and Switch Item Language

**Primary Actor:** Customer

**Preconditions:** Customer opens the Customer Website. Active menu items and the saved weather theme are loaded from the backend.

**Main Success Scenario:**
1. Customer views the single-page website, including the restaurant address and phone number at the top, the large weather-themed food image, and the flat menu list.
2. Customer views each item's name, price, availability status, and Add button.
3. Customer clicks the English/French language toggle control.
4. The displayed menu item names immediately switch between English and French, while prices, buttons, labels, and other page text remain unchanged.

**Alternative Flows:**
- **2a. Item unavailable:** If an item is marked unavailable by the owner, it remains visible on the menu, but its Add button is disabled.

#### Use Case 2: Manage Shopping Cart and Place a Pay-at-Pickup Order

**Primary Actor:** Customer

**Preconditions:** Customer is on the Customer Website and at least one menu item is marked available.

**Main Success Scenario:**
1. Customer clicks the Add button on available menu items to add them to the cart.
2. Customer taps or clicks the persistent bottom cart bar to open the cart panel.
3. Customer adjusts item quantities (increase/decrease) or removes an item, observing the tax-free subtotal update immediately.
4. Customer proceeds to checkout and enters required contact details (Customer Name and Phone Number).
5. Customer submits the order.
6. The backend validates the inputs and item availability, saves a snapshot of the order in PostgreSQL, clears the cart, and displays an Order Confirmation showing the order number, item names, quantities, and total amount.

**Alternative Flows:**
- **3a. Page refresh before checkout:** If the customer refreshes the page or closes the browser before submitting the order, the unsubmitted cart is cleared and not restored.
- **4a. Missing or invalid fields:** If the customer submits the checkout form with blank fields or invalid numeric formats, submission is blocked and validation errors are displayed; no confirmation is shown.
- **6a. Item becomes unavailable during checkout:** If an item was marked unavailable or deleted before submission completes, the backend rejects the order and does not display a confirmation screen.

#### Use Case 3: Preview Saved Restaurant Appearance

**Primary Actor:** Restaurant Owner

**Preconditions:** Owner navigates to the Owner Dashboard (no login required for this course prototype).

**Main Success Scenario:**
1. Owner opens the Restaurant Preview page in the dashboard.
2. The system renders the customer-facing page using the currently saved menu items and saved weather theme data.
3. Owner verifies how the layout, bilingual menu items, page colors, and themed food image appear to customers.

**Alternative Flows:**
- **2a. Unsaved edits exist:** Any unsaved edits made elsewhere do not appear in the preview until saved.

#### Use Case 4: Change Weather-Themed Appearance

**Primary Actor:** Restaurant Owner

**Preconditions:** Owner is on the Owner Dashboard.

**Main Success Scenario:**
1. Owner selects one of the three weather theme options: Sunny, Cloudy, or Rainy.
2. Owner saves the theme selection.
3. The system updates the active theme in PostgreSQL along with its paired food image (Sunny-Hamburger, Cloudy-Shepherd's Pie, Rainy-Clam Chowder).
4. Owner checks the Restaurant Preview page and sees the updated colors and food image immediately; customers see the updated theme after refreshing the Customer Website.

#### Use Case 5: Manage Menu Items

**Primary Actor:** Restaurant Owner

**Preconditions:** Owner navigates to the Menu Management page in the Owner Dashboard.

**Main Success Scenario:**
1. Owner clicks to add a new menu item.
2. Owner enters the mandatory English name, mandatory French name, valid price, and configures availability.
3. Owner saves the new item.
4. System validates the inputs, stores the item in PostgreSQL, and updates the menu list on both the dashboard and Customer Website.

**Alternative Flows:**
- **1a. Edit existing item:** Owner edits an item's English name, French name, or price and saves the changes.
- **1b. Toggle availability:** Owner switches an item between available and unavailable; unavailable items remain visible on the customer menu with a disabled Add button.
- **1c. Delete item:** Owner deletes an item from the menu. The item disappears from the customer menu, while previously submitted historical orders retain their original item names, prices, and quantities intact.
- **3a. Invalid input:** If required names are blank or the price is invalid/non-numeric, the system blocks saving and highlights the error.

#### Use Case 6: View Customer Orders (Read-Only)

**Primary Actor:** Restaurant Owner

**Preconditions:** Owner navigates to the Orders page in the Owner Dashboard.

**Main Success Scenario:**
1. Upon entering the Orders page, the system loads and displays all submitted orders.
2. Owner reviews each order's Order ID, submission time, customer name, customer phone number, item names, quantities, and total amount.
3. Owner clicks the Refresh Orders button to fetch any newly submitted customer orders from the backend.

**Alternative Flows:**
- **2a. Attempting to modify an order:** No controls exist to edit order details or change order statuses; the view is strictly read-only.

### 2. Practical Scenarios

#### Scenario A: Customer Ordering Experience (Alice)

Alice wants to order dinner from EZ Bites on her phone.

1. **Browsing & Theme:** Alice opens the EZ Bites customer website. She sees the restaurant's address and phone number at the top, followed by a large image of Clam Chowder and cool blue/slate styling (indicating the owner has saved the Rainy theme).
2. **Bilingual Toggle:** Curious about the French menu names, Alice taps the English/French switch. The dish names toggle between English and French, while prices and buttons remain unchanged.
3. **Cart Management:** Alice taps Add on Clam Chowder ($10.00) and Garlic Bread ($4.50). She sees Soda listed as unavailable with its Add button disabled. She taps the fixed bottom cart bar to open the cart panel, increases the Garlic Bread quantity to 2, and verifies the tax-free subtotal ($19.00).
4. **Checkout & Confirmation:** Alice proceeds to checkout, enters her name (Alice) and phone number (250-123-4567), and submits the pay-at-pickup order. The screen displays an Order Confirmation with Order Number #1042, her itemized list, quantities, and the $19.00 total.

#### Scenario B: Owner Dashboard Management Experience (Bob)

Bob is managing the restaurant's menu, theme, and incoming orders via the Owner Dashboard.

1. **Updating Weather Theme:** The afternoon weather clears up, so Bob opens the dashboard, switches the theme from Rainy to Sunny, and saves it. He opens the Restaurant Preview tab and confirms the page colors are now warm yellow/orange and the featured food image has updated to a Hamburger.
2. **Managing Menu Items:** Bob navigates to Menu Management, marks Soda as unavailable so customers cannot add it, and adds a new dish with both its English name (Classic Poutine) and French name (Poutine Classique) priced at $11.00. He also deletes an older seasonal item, knowing that past orders containing that item remain intact in the order records.
3. **Checking Incoming Orders:** Bob opens the Orders page and clicks Refresh Orders. Alice's order (#1042) appears in the read-only list showing her submission time, name, phone number, items, quantities, and $19.00 total so Bob can prepare the food for counter pickup.

## Non-functional requirements <a name="section5"></a>

### 1. Responsive and Usable Interface
- All controls, buttons, and menu text must remain clearly readable and usable at both mobile and desktop viewport widths without horizontal scrolling or overlapping elements.
- On desktop, the menu must render cleanly in the left region alongside the single large food image on the right; on mobile, the food image must stack cleanly above the vertical menu sequence.
- The persistent bottom cart bar must remain fixed during scrolling without obscuring menu items, buttons, or essential checkout controls.
- Across all three weather themes (Sunny, Cloudy, and Rainy), text and interactive controls must maintain clear visual contrast against background colors.
- All customer and owner interfaces must function reliably on modern versions of Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari.

### 2. Data Validation and Order Correctness
- All required form fields (such as English/French item names, prices, customer name, and customer phone number) and numeric values must be validated on both the frontend and backend.
- The backend must reject orders containing invalid item IDs, unavailable items, or invalid quantities; only completely valid orders may be saved to PostgreSQL.
- Order totals must be calculated accurately as the sum of item unit prices multiplied by quantities with zero tax applied.
- If order submission or validation fails, the system must prevent a false order confirmation screen from being displayed to the customer.

### 3. Historical Data Integrity
- Each saved order in PostgreSQL must retain a permanent snapshot of the ordered item name(s), quantity, and unit price as submitted at the time of checkout.
- Subsequent edits to menu item names or prices, or the deletion of menu items by the owner, must not alter or corrupt historical order records.

### 4. Course-Demo Privacy Boundary & Security
- By design, the Owner Dashboard excludes authentication and user account management; it is scoped strictly as a classroom demonstration prototype rather than a publicly secured production ordering system.
- All demonstrations and testing must use fictional customer names and phone numbers alongside controlled access to the dashboard URL.
- All data transmitted between the client browser, frontend host, and backend server must use HTTPS encryption.

### 5. Performance and Transient State Reliability
- The customer menu page must load and render completely within 3 seconds under standard broadband conditions.
- Adding, removing, or modifying item quantities in the cart panel must update the displayed tax-free subtotal within 300 milliseconds.
- In accordance with system specifications, unsubmitted cart contents must remain transient in memory and must not be persisted across page refreshes or browser closures.
- Saved menu items, weather theme configurations, and submitted orders must persist reliably in PostgreSQL across server restarts and page reloads.

### 6. Minimal Implementation Scope
- The system excludes online payment processing, taxes, delivery workflows, menu categories, dish descriptions, per-item images, real-time order push notifications, order status editing, and external automatic weather APIs.

## Feature prioritization <a name="section6"></a>

To ensure full alignment with the course project specifications within the academic term, features are categorized into three levels: Essential (Core Prototype), Secondary (Polish & Enhanced UX), and Out of Scope (Excluded by Specification).

### 1. Essential Features (High Priority / Must-Have)

These features represent the core functional and non-functional requirements required to pass all minimum acceptance scenarios.

#### Customer Website
- **Single-Page Responsive Layout:** Vertically scrollable page displaying restaurant address and phone number at the top, with desktop (left menu / right food image) and mobile (top food image / bottom menu) layouts.
- **Flat Bilingual Menu:** Display all active menu items without category groupings, descriptions, or per-item photos, paired with a visible English/French toggle that translates only menu item names.
- **Availability Controls:** Keep unavailable items visible on the menu while disabling their Add buttons.
- **Transient Shopping Cart:** Persistent bottom cart bar opening a cart panel to add items, adjust quantities, remove items, and calculate a tax-free subtotal, clearing automatically on page refresh or browser closure.
- **Pay-at-Pickup Checkout & Confirmation:** Form requiring only customer name and phone number, validating item availability on the backend, and displaying an order confirmation with order number, items, quantities, and total amount.

#### Owner Dashboard
- **Three-Page Dashboard Navigation:** Direct access (no login required) to Restaurant Preview, Menu Management, and Orders.
- **Menu Item CRUD & Availability:** Add, edit, delete, and toggle availability for items requiring English name, French name, and price, while preserving historical order snapshots upon deletion.
- **Manual Weather-Themed Appearance:** Select and save Sunny (Hamburger), Cloudy (Shepherd's Pie), or Rainy (Clam Chowder) themes to update page colors and the featured food image across Preview and the Customer Website.
- **Saved-State Restaurant Preview:** Render the customer-facing page inside the dashboard reflecting saved menu and theme changes.
- **Read-Only Orders Page:** Load orders on entry and provide a Refresh Orders button to display order ID, submission time, customer contact info, items, quantities, and total amount without status modification controls.

#### Backend & Database
- **PostgreSQL Persistence & Validation:** Reliable storage for menu items, active theme settings, and immutable order snapshots, enforcing strict server-side input and availability validation.

### 2. Secondary Features (Medium Priority / Should-Have)

These enhancements improve visual polish and user experience once all essential acceptance criteria are satisfied.

- **Enhanced Validation & Feedback Messages:** Clear inline form validation messages (for example, highlighting invalid phone numbers or negative prices) and non-intrusive visual feedback when items are added to the cart or settings are saved.
- **UI Accessibility & Contrast Refinement:** Fine-tuning typography, button tap targets on mobile viewports, and color contrast across the Sunny, Cloudy, and Rainy themes.

### 3. Out of Scope (Excluded by Project Specification)

The following features are explicitly excluded from this prototype:

- **Owner Authentication & User Accounts:** No login screens, password management, or customer account registration.
- **Menu Categories, Descriptions & Per-Item Photos:** No category tabs, dish descriptions, allergen tags, or individual product images.
- **Order Status Updates & Real-Time Push:** No status workflows (Pending/Preparing/Ready/Completed), status editing controls, or WebSocket/real-time order push notifications.
- **Online Payments, Taxes & Delivery:** No credit card processing, tax calculations, or delivery/GPS tracking features.
- **Persistent Carts & Automatic Weather APIs:** No localStorage cart restoration across refreshes and no external weather API integration.

## Glossary <a name="section7"></a>

This glossary defines product-specific concepts and technical web development terminology used throughout this document, written for a reader with basic computer science knowledge.

### 1. Product-Specific Terms

- **Customer Website:** The single, publicly accessible, vertically scrollable web page of EZ Bites where visitors can browse the flat menu, toggle item names between English and French, manage a transient cart, and submit pay-at-pickup orders.
- **Owner Dashboard:** A three-page administrative web interface (Restaurant Preview, Menu Management, and Orders) used by the restaurant owner to manage menu items, update the manual weather theme, preview saved changes, and view read-only customer orders. By course prototype design, it operates without a login system.
- **Bilingual Item-Name Switch:** A visible language toggle on the Customer Website that switches only menu item names between English and French while leaving prices, buttons, labels, and all other UI text untranslated.
- **Item Availability (Available / Unavailable):** A status controlled by the owner for each menu item. Unavailable items remain visible on the customer menu, but their Add buttons are disabled so they cannot be ordered.
- **Transient Shopping Cart:** An in-memory shopping list managed via a persistent bottom cart bar and expandable cart panel. It calculates a tax-free subtotal and clears automatically upon page refresh or browser closure (no persistence before checkout).
- **Pay-at-Pickup Order:** A food order placed online requiring only the customer's name and phone number, with payment handled in person at the restaurant counter. Online payments, credit cards, taxes, and delivery are excluded.
- **Order Snapshot / Historical Data Integrity:** The practice of storing the exact item name(s), unit price, and quantity inside each order record at the moment of submission so that future menu edits or deletions do not alter past order records.
- **Weather-Themed Appearance:** A visual setting manually selected and saved by the owner in the dashboard (Sunny, Cloudy, or Rainy) that updates page colors and displays a single paired food image (Sunny-Hamburger, Cloudy-Shepherd's Pie, Rainy-Clam Chowder) without using an external weather API.
- **Restaurant Preview:** A dashboard page that renders the customer-facing website using saved menu and theme data so the owner can inspect saved updates.
- **Read-Only Orders Page:** The dashboard view that displays submitted orders (Order ID, submission time, customer name, phone number, items, quantities, and total amount) upon entry or via a Refresh Orders button, without any controls to modify order statuses or details.

### 2. Web Architecture & Technical Terms

- **Frontend:** The client-side user interface running inside the user's web browser (buttons, forms, responsive layouts, and cart state), built with React and Vite.
- **Backend:** The server-side application built with Node.js and Express that enforces input/availability validation, processes orders, and communicates with the database.
- **Database:** A relational data store (PostgreSQL) used to persistently store menu items, saved weather theme settings, and immutable historical order snapshots.
- **API (Application Programming Interface):** A set of HTTP endpoints connecting the React frontend to the Express backend for fetching menus, saving themes, managing items, and submitting or retrieving orders.
- **Responsive Layout:** A web design approach ensuring the interface adapts cleanly between mobile and desktop screens (for example, displaying the food image on the right on desktop and above the menu on mobile).
- **Input Validation:** Verifying user-submitted data on both the frontend and backend (such as ensuring mandatory English/French item names, positive numeric prices, valid customer contact fields, and item availability) before saving to the database.
- **HTTPS:** The encrypted communication protocol securing data transmitted between the user's browser, frontend host, and backend server.

### 3. Development & Hosting Terms

- **Cloud Hosting (Vercel, Render, Aiven):** Remote cloud platforms used to deploy and run the EZ Bites prototype:
  - Vercel: Hosts the static React frontend application.
  - Render: Runs the Node.js/Express backend server.
  - Aiven: Hosts and manages the cloud PostgreSQL database.

## Appendices <a name="section8"></a>

There are no additional supporting documents at this moment.


