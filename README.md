# 💰 Finance Dashboard

A clean and interactive **Finance Dashboard** built using **React (Vite)** and **CSS**.
This project demonstrates frontend development skills including UI design, state management, data visualization, and user experience.

---

## 🌐 Live Demo

( https://zorvyn-brown.vercel.app/ )

---

## 📌 Overview

This application simulates a real-world finance dashboard where users can:

* View overall financial summary
* Explore and filter transactions
* Analyze spending patterns through charts
* Switch roles (Admin / Viewer) to interact with UI differently

The project uses **mock data** and focuses entirely on frontend architecture and usability.

---

## 🛠️ Tech Stack

* React (Vite)
* JavaScript (ES6)
* CSS (Flexbox & Grid)
* Recharts (for charts)
* Context API (for global state management)

---

## ✨ Features

### 📊 Dashboard

* Summary cards:

  * Total Balance
  * Total Income
  * Total Expenses
* 📈 Line chart showing balance trends over time
* 🥧 Pie chart showing spending distribution by category

---

### 📋 Transactions

* Display all transactions in a structured table
* Includes:

  * Date
  * Amount
  * Category
  * Type (Income / Expense)

#### 🔍 Functionalities:

* Search by category
* Filter by transaction type
* Sort by date or amount

---

### 👤 Role-Based UI

* **Viewer**

  * Can only view data

* **Admin**

  * Can add new transactions
  * Has access to additional controls

> Role switching is simulated on the frontend using a dropdown.

---

### 💡 Insights

* Displays useful financial insights such as:

  * Highest spending category
  * Monthly comparison
  * Basic spending observations

---

### 📤 Export CSV

* Export currently visible (filtered/searched) transactions as a CSV file
* Prevents export when no data is available

---

## 🧠 State Management

The application uses **React Context API** along with hooks (`useState`) to manage global state, including:

* Transactions data
* Selected user role (Admin / Viewer)
* Filters and search queries

This approach avoids prop drilling and improves scalability and maintainability.

---

## 🧠 Approach

* Followed a **component-based architecture** for reusability
* Centralized state using **Context API**
* Separated concerns into:

  * Components
  * Data
  * Styles
* Implemented responsive layouts using **CSS Grid and Flexbox**
* Focused on clean UI, readability, and intuitive interactions

---

## 📁 Project Structure

```
src/
  components/
  pages/
  context/
  data/
  styles/
  App.jsx
  main.jsx
```

---

## ⚙️ Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/ranjan-27/Zorvyn_assignment.git
```

2. Navigate to the project directory:

```bash
cd Zorvyn_assignment
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

---

## 📱 Responsiveness

* Fully responsive design
* Works seamlessly on mobile, tablet, and desktop devices

---

## ⚠️ Edge Case Handling

* Displays message when no transactions are available
* Handles empty search or filter results gracefully


---

## 🚀 Future Improvements

* Backend integration (Node.js + MongoDB)
* User authentication and authorization
* Advanced analytics and reports
* Improved data visualization and UI enhancements


---

## 📌 Conclusion

This project demonstrates the ability to build a clean, functional, and scalable frontend dashboard.
It focuses on user experience, structured code, and real-world application design..

---

## 👨‍💻 Author

**Ranjan Kumar Gupta**
GitHub: https://github.com/ranjan-27

