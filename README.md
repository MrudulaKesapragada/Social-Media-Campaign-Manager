# Social Media Campaign Dashboard 

A full-stack, single-page application (SPA) designed to help social media managers schedule, track, and manage their content campaigns efficiently.


## ✨ Features

-   **Interactive Dashboard:** An at-a-glance overview of key statistics like total, upcoming, and completed campaigns.
-   **Real-time Campaign Management:** Create and delete campaigns with the UI updating instantly without a page refresh.
-   **Single-Page Application (SPA):** Seamless navigation between different views (Dashboard, Calendar, Analytics) with no page reloads, creating a fast and smooth user experience.
-   **Multiple Views:** Professionally styled pages for:
    -   A main **Dashboard** for a quick overview.
    -   A detailed **Campaigns** page with filtering placeholders.
    -   A visual **Calendar** to see scheduled posts.
    -   An **Analytics** page with impressive chart mockups.
-   **Clean & Modern UI:** A responsive, light-themed interface built for clarity and ease of use.
-   **Modal Interface:** Campaigns are created through a sleek, non-intrusive pop-up modal form.

## 🛠️ Tech Stack

The project is built with a modern full-stack architecture, separating the front-end and back-end for maintainability.

#### **Front-End:**
-   **HTML5**
-   **CSS3** (Flexbox & Grid)
-   **Vanilla JavaScript (ES6+)**
-   **Fetch API** for communicating with the back-end.

#### **Back-End:**
-   **Node.js** as the JavaScript runtime.
-   **Express.js** as the server framework for building the API.
-   **MongoDB** as the NoSQL database for storing campaign data.
-   **Mongoose** as the Object Data Modeler (ODM) to interact with MongoDB.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
-   [Node.js](https://nodejs.org/en/) (which includes npm)
-   [MongoDB Community Server](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Installation & Setup

1.  **Clone the repository (or download the project files).**

2.  **Set up the Back-End Server:**
    -   Navigate to the backend directory in your terminal:
        ```sh
        cd backend
        ```
    -   Install the required NPM packages:
        ```sh
        npm install
        ```
    -   Open `backend/server.js` and update the `MONGO_URI` variable with your own MongoDB connection string (either local or from Atlas).
    -   Start the server:
        ```sh
        npm start
        ```
    -   Your server should now be running on `http://localhost:3000`.

3.  **Launch the Front-End Application:**
    -   The easiest way is to use the **Live Server** extension in Visual Studio Code.
    -   Right-click on the `frontend/index.html` file and select "Open with Live Server".
    -   Your browser will open the application, which is now fully connected to your running back-end.

## 📡 API Endpoints

The back-end server provides the following API endpoints:

-   `GET /api/campaigns`: Fetches a list of all scheduled campaigns.
-   `POST /api/campaigns`: Creates a new campaign.
-   `DELETE /api/campaigns/:id`: Deletes a specific campaign by its ID.
