# Invoice Form with Login

## Overview

Welcome to the Invoice Form with Login application! This project is a React-based application that includes a secure login system, a functional invoice form, and data persistence using local storage. The form functionality is implemented using Formik, ensuring validation and data integrity. The application also supports PDF uploads and displays them seamlessly.

## Live Demo

[Check out the live demo here](https://invoice-form-sonendra.netlify.app/invoice)

## Repository

[Visit the GitHub repository](https://github.com/sonendraelon/invoice-form-edstruments.git)

## Features

### 1. Login System

- **Secure Authentication:** Users can log in using a username and password.
- **Formik Validation:** Form validation is handled using Formik.
- **Session Management:** User sessions are stored in localStorage.
- **Auto-login:** If a session exists, users are auto-logged in.
- **Logout:** Logout functionality clears the session and redirects to the login page.

### 2. UI and Design Replication

- **Accurate Design:** The application accurately replicates the given design.
- **Responsive:** Fully responsive and visually aligned with the design specifications.

### 3. Functional Invoice Form

- **Formik Integration:** Built using Formik with input validation.
- **Data Integrity:** Ensures data integrity and user-friendly error messages.
- **Dynamic Styling:** Highlights validation errors dynamically.

### 4. Data Persistence with LocalStorage

- **Form Data Storage:** Stores form data upon submission.
- **Persistence:** Ensures form data persists across page reloads.
- **Auto-fill:** Pre-populates form fields with saved data when revisited.

### 5. PDF Upload and Display

- **PDF Upload:** Users can upload a PDF file from their local system.
- **PDF Display:** The uploaded PDF is displayed within the application.

### 6. Populate Form Fields with Dummy Data

- **Auto-fill Button:** A button is included to auto-fill form fields with predefined dummy data.

## Bonus Features

- **Comprehensive Validation:** Extensive form validation for all fields.
- **Dynamic Error Indication:** Dynamic styling to indicate validation errors.
- **User-friendly Messages:** Clear and user-friendly error messages.

## Technology Stack

- **React:** For building the user interface.
- **Formik:** For form management and validation.
- **LocalStorage:** For data persistence.

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
   - A dummy data button fills form fields with sample data.

3. **Data Persistence**

   - Form data is saved in localStorage.
   - When the user revisits, saved data is auto-loaded.

4. **PDF Upload & Display**

   - Users can upload a PDF file.
   - The file is displayed within the application.

## Login Credentials

- **Username:** user
- **Password:** password

## Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone [repository-url]
   cd invoice-form
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm start
   ```

## Screenshots

### Login Page

![Login Page](#)

### Invoice Form

![Invoice Form](#)

### PDF Upload

![PDF Upload](#)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or feedback, please contact [your-email@example.com](mailto:your-email@example.com).
