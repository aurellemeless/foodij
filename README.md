# Meal Planner Application - README

## Project Overview

The Meal Planner application helps users organize their meals and grocery shopping efficiently. Users can store their favorite dishes, generate an automatic meal plan, and create a shopping list based on their meal preferences.

## Features

### 1. Dish Management

- Add, modify, and delete favorite dishes.
- Associate each dish with a list of ingredients.

### 2. Meal Planning

- Automatically generate a weekly/monthly meal plan.
- Manually adjust planned meals.

### 3. Shopping List

- Generate a shopping list based on the meal plan.
- Mark ingredients as purchased.

### 4. Stock Management (Optional)

- Track available ingredients at home.
- Adjust meal plans based on available stock.

### 5. Authentication & User Management

- Register and log in with email/password.
- Google/Facebook authentication (optional).
- Secure data using JWT authentication.

## Tech Stack

- **Frontend Web**: React.js + Ant Design
- **Frontend Mobile**: React Native (Expo)
- **Backend**: NestJS
- **Database**: PostgreSQL or Firebase
- **Hosting**: Vercel (Frontend) + Railway/Render (Backend)

## Installation & Setup

### Prerequisites

- Node.js (Latest LTS version)
- PostgreSQL database (if using SQL-based storage)
- Firebase account (if using Firebase)

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/your-repo/meal-planner.git
cd meal-planner/backend

# Install dependencies
npm install

# Create a .env file and configure database credentials
cp .env.example .env

# Start the backend server
npm run start
```

### Frontend Setup (Web)

```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm start
```

### Mobile App Setup (React Native)

```bash
cd ../mobile

# Install dependencies
npm install

# Start the Expo development server
npm run start
```

## Development Roadmap (1 Week Plan)

- **Day 1-2**: Backend development (API + Database setup)
- **Day 3-4**: Frontend development (UI design & components)
- **Day 5**: API integration & functional testing
- **Day 6**: Optimization & bug fixes
- **Day 7**: Deployment & final testing

## Contribution Guidelines

- Fork the repository
- Create a feature branch (`feature/your-feature`)
- Commit your changes (`git commit -m 'Added new feature'`)
- Push to the branch (`git push origin feature/your-feature`)
- Create a Pull Request for review

---

This README provides a guide to setting up and contributing to the Meal Planner project. 🚀
