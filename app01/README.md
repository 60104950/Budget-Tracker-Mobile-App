# Personal Finance Tracker

A React Native mobile application for tracking personal expenses, managing budgets, and monitoring financial health.

## Overview

This is a comprehensive personal finance management application built with React Native and Expo. The app helps users track their income, expenses, savings, and budget through an intuitive interface with visual data representations.

## Features

### 🔐 Authentication
- User registration and login system
- Secure password authentication
- Firebase Firestore integration for user data storage

### 💰 Financial Management
- **Income Tracking**: Set and update monthly income
- **Expense Categories**: 
  - Essentials (necessary expenses)
  - Additional expenses (discretionary spending)
  - Custom categories (food, rent, utilities, transportation, health, insurance, personal, entertainment)
- **Budget Management**: 
  - Auto-budget calculation (20% buffer over expenses)
  - Manual budget setting option
- **Savings Calculation**: Automatic calculation of savings based on income and expenses

### 📊 Data Visualization
- **Pie Chart**: Visual representation of Income vs Budget
- **Bar Chart**: Savings vs Spent comparison
- **Status Indicator**: Financial health status (Good/Bad) based on savings ratio

### 🎨 User Interface
- Bottom Tab Navigation (Home, Settings, Add Expenses)
- Beautiful gradient backgrounds
- Responsive design for different screen sizes
- Card-based layout for data display
- Icon integration using Ionicons

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: 
  - React Navigation v6
  - Bottom Tab Navigator
  - Stack Navigator
- **Backend**: Firebase Firestore
- **Charts**: react-native-chart-kit
- **UI Components**: 
  - React Native core components
  - React Native Vector Icons
  - React Native Picker
  - Expo Linear Gradient
- **State Management**: React Hooks (useState, useEffect, useRef)

## Project Structure

```
app01/
├── App.js                 # Main app entry point
├── FinalProject.js        # Authentication and main navigation
├── Home.js                # Home screen with tabs (Home, Settings, Add Expenses)
├── config.js              # Firebase configuration
├── package.json           # Dependencies
└── assets/                # App icons and images
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd app01
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Required packages**
   ```bash
   npm install @react-navigation/native
   npm install @react-navigation/native-stack
   npm install @react-navigation/bottom-tabs
   npm install react-native-screens react-native-safe-area-context
   npm install firebase
   npm install react-native-chart-kit
   npm install react-native-svg
   npm install react-native-vector-icons
   npm install @react-native-picker/picker
   npm install expo-linear-gradient
   ```

4. **Configure Firebase**
   - Update `config.js` with your Firebase project credentials
   - Enable Firestore in your Firebase console

5. **Run the app**
   ```bash
   npx expo start
   ```

## Firebase Setup

### Firestore Data Structure

Each user document is stored under the collection `FinalProject` with the following schema:

```javascript
{
  userName: string,
  password: string,
  email: string,
  income: number,
  saving: number,
  budget: number,
  essentials: number,
  additions: number,
  categories: array,
  Settings: {
    autoBudget: boolean
  },
  time: timestamp,
  status: string
}
```

## Usage

### Registration
1. Launch the app
2. Click on "Register" link
3. Enter username, email, and password
4. Submit to create account

### Login
1. Enter your username and password
2. Click "Login" button
3. Access your financial dashboard

### Home Screen
- View income vs budget pie chart
- Monitor savings with bar chart
- Check expense breakdown (Essentials vs Additions)
- View financial status indicator
- Tap on cards to refresh data

### Settings Screen
- Set or update monthly income
- Set custom budget (optional)
- Auto-budget enabled by default
- Logout option

### Add Expenses Screen
- Select expense category from dropdown
- Enter amount
- Choose expense type (Essential or Additional)
- Add custom expense categories
- Submit to record expense

## Key Features Explained

### Auto-Budget Calculation
When enabled, the budget is automatically calculated as:
```
Budget = (Essentials + Additions) × 1.2
```
This provides a 20% buffer over actual expenses.

### Financial Status
- **Good**: Savings > 50% of income
- **Bad**: Savings ≤ 50% of income

### Default Categories
The app comes with 8 pre-configured expense categories:
- Food
- Rent
- Utilities
- Transportation
- Health
- Insurance
- Personal
- Entertainment

## Screen Components

### LoginPage
- Handles user authentication
- Toggle between login and registration
- Beautiful gradient background

### MyTabs
- Bottom tab navigator container
- Manages navigation between main screens

### Home
- Displays financial overview
- Shows income, budget, savings, and expenses
- Interactive charts
- Real-time data refresh

### SettingsPage
- Income management
- Budget configuration
- Logout functionality

### Add
- Expense recording
- Category selection
- Custom category creation

## Dependencies

```json
{
  "@react-navigation/native": "^6.x.x",
  "@react-navigation/native-stack": "^6.x.x",
  "@react-navigation/bottom-tabs": "^6.x.x",
  "@react-native-picker/picker": "^2.x.x",
  "expo-linear-gradient": "^12.x.x",
  "firebase": "^10.x.x",
  "react-native-chart-kit": "^6.x.x",
  "react-native-vector-icons": "^10.x.x",
  "react-native-svg": "^13.x.x"
}
```

## Known Issues & Future Improvements

### Current Limitations
- Password stored in plain text (should implement proper hashing)
- No password recovery mechanism
- Limited expense history tracking
- No date-based expense filtering

### Planned Features
- [ ] Expense history with date filters
- [ ] Monthly/yearly reports
- [ ] Export data functionality
- [ ] Category-wise spending analysis
- [ ] Budget alerts and notifications
- [ ] Multi-currency support
- [ ] Dark mode theme

## Security Considerations

⚠️ **Important**: This is a learning/demonstration project. For production use, implement:
- Password hashing (bcrypt, etc.)
- Secure authentication (Firebase Auth)
- Input validation and sanitization
- Environment variables for sensitive data
- Error handling improvements

## Development

### File Descriptions

- **App.js**: Main application component, renders FinalProject
- **FinalProject.js**: Authentication flow and navigation setup
- **Home.js**: Main application logic with tabs, charts, and data management
- **config.js**: Firebase initialization and configuration

### Code Style
- Functional components with hooks
- Async/await for Firebase operations
- StyleSheet for styling
- Responsive design using Dimensions API

## Contributing

This is a university project. For educational purposes, feel free to fork and modify.

## License

This project is created for educational purposes as part of a Mobile App Development course.

## Author

Created as a Final Project for Mobile App Development course at university.

## Support

For issues or questions, please refer to the course materials or contact the instructor.

---

**Note**: Remember to update your Firebase configuration in `config.js` with your own project credentials before running the application.
