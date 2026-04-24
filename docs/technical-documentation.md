# Technical Documentation

## Overview
This project is a responsive portfolio website built with HTML, CSS, and JavaScript. It extends the earlier assignments by introducing advanced functionality such as API integration, improved state management, stronger validation logic, and a more polished user experience.

## Technologies Used
- HTML5
- CSS3
- JavaScript
- GitHub REST API

## Website Structure
The website is divided into the following main sections:
- Hero section
- About section
- Projects section
- GitHub repositories section
- Contact section
- Footer

## Advanced Features

### 1. API Integration
The website connects to the GitHub API and loads public repositories from my GitHub account. When the user clicks the "Load Repositories" button, the site sends a fetch request to GitHub and displays repository cards dynamically.

The API feature includes:
- a load button to start fetching repositories
- a loading state while the request is being processed
- a loaded state after repositories are displayed
- button disabling after a successful load
- user-friendly feedback if the request fails
- a message if no repositories are available

### 2. Complex Logic
The projects section includes multiple features working together:
- search projects by text
- filter projects by category
- sort projects alphabetically
- show or hide project details

This combines multiple conditions and steps, which makes the project logic more advanced than a simple click action.

The contact form also uses step-by-step logic:
- checks if the name field is empty
- checks if the email field is empty
- validates the email format using a regular expression
- checks if the message field is empty
- checks if the message has at least 10 characters
- prevents submission until all conditions are satisfied
- only shows a success message when all inputs are valid

### 3. State Management
The project uses localStorage to save and restore user-related information and preferences.

Saved state includes:
- theme mode (dark or light)
- visitor name
- selected project category
- selected project sorting option
- project search text

This allows the website to remember important settings even after refresh.

### 4. Buttons and User Interaction
The website includes multiple buttons and controls that support user interaction:

- Theme Toggle Button  
  Switches between dark mode and light mode and saves the preference using localStorage.

- Mobile Menu Button  
  Opens and closes the mobile navigation menu on small screens.

- Save Name Button  
  Saves the visitor name in localStorage and updates the welcome message.

- Clear Name Button  
  Removes the saved visitor name and clears the welcome message.

- Filter Buttons  
  Allow users to switch between all projects, web projects, and Java projects.

- Sort Dropdown  
  Lets users sort project cards alphabetically in ascending or descending order.

- Project Details Button  
  Each project card has a button that toggles extra details between hidden and visible states.

- Load Repositories Button  
  Fetches data from the GitHub API, changes to a loading state, and becomes disabled after successful loading.

- Submit Button  
  Runs form validation and only allows the success message to appear when all fields pass validation.

### 5. Timer
A time-on-site counter is displayed in the hero section. It updates every second using JavaScript and shows how long the visitor has stayed on the website.

### 6. Mobile Navigation
For smaller screens, the navigation menu switches to a hamburger button. Clicking it opens or closes the mobile navigation menu.

### 7. Responsive Design
The layout uses CSS Grid and Flexbox to adapt to different screen sizes. Media queries are used to improve usability on tablets and mobile devices.

## File Description
- `index.html`  
  Contains the full structure of the portfolio website, including all sections and elements used by the JavaScript features.

- `css/styles.css`  
  Contains the site styling, color theme system, layout rules, responsive design, transitions, and button states.

- `js/script.js`  
  Handles all interactive functionality including:
  - greeting
  - theme toggle
  - visitor name saving
  - timer
  - search, filter, and sort logic
  - show/hide project details
  - GitHub API fetching
  - contact form validation
  - mobile navigation
  - footer year update

## Performance Considerations
The site is designed to stay lightweight and efficient:
- no heavy libraries or frameworks are used
- only necessary files are included
- images are limited and reused efficiently
- CSS and JavaScript are organized in separate files
- API loading is done only when the user clicks the button

## Testing
The website was tested manually in the browser using desktop and mobile-sized views.

The following features were tested:
- theme switching and persistence after refresh
- saving and clearing visitor name
- timer updating correctly
- search, filter, and sort in the projects section
- show/hide project details button
- loading GitHub repositories
- API error handling
- contact form validation
- mobile navigation behavior

## User Experience
The website was designed to provide a simple but polished experience:
- clear section structure
- smooth scrolling
- consistent color palette
- readable typography
- responsive layout
- immediate feedback for user actions
- clean button and card styling