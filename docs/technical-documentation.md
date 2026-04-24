# Technical Documentation

## Overview
This project is a front-end portfolio website built using HTML, CSS, and JavaScript. It includes interactive features, API integration, and state management.

## Core Functionalities

### 1. Project System
The project section includes:
- Search functionality using input filtering
- Category filtering (Web, Java, API, Basic)
- Sorting (A–Z and Z–A)
- Show/Hide details toggle for each project

### 2. Favorite Projects (Innovation)
Users can mark projects as favorites using a star button.
- Stored in localStorage
- Filter option “Favorites” added
- State persists after page reload

### 3. GitHub API Integration
- Fetches repositories using GitHub REST API
- Displays repository name, description, stars, and language
- Includes loading state and error handling
- Automatically loads on page load

### 4. State Management
localStorage is used to store:
- Theme (dark/light)
- Visitor name
- Project filter selection
- Sorting preference
- Search input
- Favorite projects

### 5. Contact Form Validation
Validation logic includes:
- Name required
- Email required + format validation
- Message required (minimum length)
- Displays error messages dynamically
- Prevents submission if invalid

### 6. UI & Interaction Features
- Dark/Light mode toggle
- Mobile navigation menu
- Smooth scrolling behavior
- Time-based greeting
- Time-on-site counter

### 7. Responsive Design
- CSS Grid and Flexbox used
- Media queries for mobile/tablet
- Layout adapts to different screen sizes

## File Description
- index.html → structure of the website
- styles.css → layout, design, responsiveness
- script.js → all logic and interactivity

## Performance Considerations
- No external frameworks used
- Minimal dependencies
- Lazy loading images
- API called only once

## Testing
Tested manually for:
- All interactions
- Form validation
- API loading
- Responsive behavior
- LocalStorage persistence

## User Experience
The website focuses on:
- Clean layout
- Simple navigation
- Immediate feedback
- Consistent design