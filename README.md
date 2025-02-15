# Invoice Form with Login

## Overview
This project is a React-based application that replicates the provided design. It includes a login system, a functional invoice form, and data persistence using local storage. The form functionality is implemented using Formik, ensuring validation and data integrity. The application also supports PDF uploads and displays them using `react-pdf`.

## Live Demo
[Provide the live demo link here]

## Repository
https://github.com/sonendraelon/invoice-form-edstruments.git
## Features
### 1. Login System
- Users can log in using a username and password.
- Form validation is handled using Formik.
- User sessions are stored in localStorage.
- If a session exists, users are auto-logged in.
- Logout functionality clears the session and redirects to the login page.

### 2. UI and Design Replication
- The application accurately replicates the given design.
- Responsive and visually aligned with the design specifications.

### 3. Functional Invoice Form
- Built using Formik with input validation.
- Ensures data integrity and user-friendly error messages.
- Dynamic styling highlights validation errors.

### 4. Data Persistence with LocalStorage
- Stores form data upon submission.
- Ensures form data persists across page reloads.
- Pre-populates form fields with saved data when revisited.

### 5. PDF Upload and Display
- Users can upload a PDF file from their local system.
- The uploaded PDF is displayed within the application using `react-pdf`.

### 6. Populate Form Fields with Dummy Data
- A button is included to auto-fill form fields with predefined dummy data.
- The uploaded PDF section is also populated with sample data.

## Bonus Features
- Comprehensive form validation.
- Dynamic styling to indicate validation errors.
- User-friendly error messages.

## Technology Stack
- React for building the user interface.
- Formik for form management and validation.
- LocalStorage for data persistence.
- `react-pdf` for PDF rendering.

## Project Structure & Flow
1. **Login Page**
   - Users enter credentials and log in.
   - Credentials are validated using Formik.
   - Session is stored in localStorage upon success.
   - If a session exists, users are auto-logged in.
   - Logout clears the session and redirects users to the login page.

2. **Main Application Interface**
   - Displays the invoice form.
   - Users can fill in the form with necessary details.
   - Form data is stored in localStorage upon submission.
   - Users can upload and view a PDF file.
   - A dummy data button fills form fields and loads a sample PDF.

3. **Data Persistence**
   - Form data is saved in localStorage.
   - When the user revisits, saved data is auto-loaded.
   
4. **PDF Upload & Display**
   - Users can upload a PDF file.
   - The file is displayed using `react-pdf`.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone [repository-url]
   cd invoice-form-login
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```


