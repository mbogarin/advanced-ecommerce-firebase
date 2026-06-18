# Advanced React E-Commerce Web Application

---

## Project Overview

This project is a frontend e-commerce application built using React, TypeScript, Redux Toolkit, and React Query. It uses the FakeStore API to simulate a real online shopping experience.

Users can browse products, filter by category, manage a shopping cart, and simulate checkout functionality.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Future Improvements](#future-improvements)

## Features

- Product listing using React Query
- Dynamic category filtering from API
- Product details display (title, price, category, description, rating, image)
- Add to cart functionality using Redux Toolkit
- Shopping cart with quantity management
- Session storage persistence for cart state
- Checkout simulation (clears cart)

## Technologies Used

- React
- TypeScript
- Redux Toolkit
- React Query
- React Router
- FakeStore API

## Installation & Setup

```bash
npm install
npm run dev
```

## Project Structure

```bash
src/
├── api/
├── components/
├── pages/
├── store/
├── App.tsx
├── main.tsx
```

## How It Works

- Products are fetched using React Query from FakeStore API
- Cart state is managed using Redux Toolkit
- Cart data is synced with sessionStorage for persistence
- Users can add/remove items and simulate checkout

## Future Improvements

- Authentication system
- Order history
- Product search functionality
- Backend integration

## Notes

This project is for educational purposes.
