# Sawghat - E-commerce Platform

A modern, full-featured e-commerce platform built with React and Vite, offering a seamless shopping experience for fashion products.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse products by category (Men, Women, Kids)
- **Product Search**: Fast search functionality with real-time results
- **Shopping Cart**: 
  - Add/remove items
  - Persistent cart using localStorage
  - Real-time cart total calculation
- **Checkout Process**: Complete order form with validation
- **Product Filtering & Sorting**: 
  - Sort by price (low to high, high to low)
  - Sort by name (A-Z, Z-A)
  - Filter by category

### User Experience
- **Toast Notifications**: Real-time feedback for user actions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **404 Error Page**: Helpful error page for missing routes
- **Search Results Page**: Dedicated page for search results
- **Navigation**: Intuitive navigation with active route highlighting

### Information Pages
- **Home Page**: Featured products and collections
- **About Page**: Company information and values
- **Contact Page**: Contact form and FAQs
- **Product Detail Page**: Detailed product information with images

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Routing**: React Router DOM 7.8.2
- **Styling**: Tailwind CSS 4.1.12 + Custom CSS
- **State Management**: React Context API
- **Code Quality**: ESLint

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Hussain-Royesh/sawghat.git
cd sawghat
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The build files will be generated in the `dist` directory.

## 🧪 Linting

```bash
npm run lint
```

## 📁 Project Structure

```
sawghat/
├── src/
│   ├── Components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── SearchBar/
│   │   ├── Toast/
│   │   ├── CartItems/
│   │   ├── Items/
│   │   └── ... (other components)
│   ├── Pages/
│   │   ├── Shop.jsx
│   │   ├── ShopCategory.jsx
│   │   ├── Product.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── SearchResults.jsx
│   │   ├── Contact.jsx
│   │   ├── About.jsx
│   │   ├── NotFound.jsx
│   │   └── CSS/
│   ├── Context/
│   │   └── ShopContext.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
└── package.json
```

## 🎯 Key Features Implementation

### Shopping Cart Persistence
The shopping cart uses localStorage to persist cart items across browser sessions, ensuring users don't lose their selections.

### Toast Notifications
Custom toast notification system provides instant feedback for user actions like adding items to cart.

### Product Sorting & Filtering
Advanced sorting options allow users to organize products by:
- Price: Low to High / High to Low
- Name: A-Z / Z-A

### Responsive Design
All pages are fully responsive with breakpoints for:
- Desktop (1024px+)
- Tablet (768px-1024px)
- Mobile (<768px)

## 🔒 Security

- No security vulnerabilities detected (CodeQL checked)
- All form inputs are validated
- Safe handling of user data
- No console.log statements in production code

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Hussain Royesh - [@Hussain-Royesh](https://github.com/Hussain-Royesh)

## 📞 Support

For support, email support@sawghat.com or visit our [Contact Page](http://localhost:5173/contact).

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing fast build tool
- All contributors who helped with this project

---

Built with ❤️ by the Sawghat Team
