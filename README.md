# Note App - React + TypeScript

A simple note-taking application built with React. This app allows users to create, edit, and delete notes. It uses UUIDs for unique routing of each note and stores the data in the browser's local storage for persistence.

## Features

- **Create, Edit, and Delete Notes**: Users can create new notes, edit existing ones, and delete notes.
- **UUID Routing**: Each note is assigned a unique identifier (UUID) that is used in the URL to handle different routes for each note.
- **Local Storage**: Notes are saved in the browser's local storage, so the data persists even after the page is refreshed or reopened.
- **Scalability**: The app is designed with scalability in mind, allowing for easy implementation of new features such as:
  - Markdown Support: Add Markdown formatting to notes for rich text capabilities.
  - Custom Styling: Update and enhance the app's design with ease.
  - Additional Configurations: Add settings for themes, font size, or other user preferences.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **UUID**: A library to generate unique identifiers for notes.
- **Local Storage**: Browser's built-in storage for saving note data locally.

## Installation

To run this app locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/note-app-react.git
   ```

2. Navigate into the project directory:
   ```bash
   cd note-app-react
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the app in your browser at [http://localhost:5173/](http://localhost:5173/) by default.