# Ethos: A Full-Stack Vacation Rental App

<p align="center">
  <img src="/public/icons/Ethos homepage.png" alt="Ethos Project Screenshot" width="600"/>
</p>

**Ethos** is a feature-rich web application inspired by Airbnb, designed to allow users to discover, list, and review unique places to stay. This project is a full-stack MERN application (using EJS for the frontend) that demonstrates a wide range of web development skills, including user authentication, third-party API integration, and cloud-based file management.

**Live Demo:** **[https://ethos-5y11.onrender.com/](https://ethos-5y11.onrender.com/)**

---

## 🚀 Core Features

* **Full CRUD Functionality:** Users can create, read, update, and delete their own listings.
* **User Authentication:** Secure user sign-up, login, and logout functionality using Passport.js.
* **Interactive Maps:** Utilizes the **Mapbox API** to:
    * Display a cluster map of all listings on the index page.
    * Show a dynamic, interactive map for each listing's location on the show page.
* **Cloud Image Uploads:** Integrates with **Cloudinary** for seamless image uploads. All listing images are stored in the cloud, not on the server.
* **Reviews & Ratings:** Authenticated users can post and delete reviews (with star ratings) for listings.
* **Flash Messages:** Provides pop-up "flash" messages for user feedback (e.g., "Listing created successfully!", "Please log in first.").
* **Responsive Design:** Built with Bootstrap and custom CSS for a mobile-first, responsive user experience.
* **Schema & Data Validation:** Uses Joi and Mongoose for robust server-side and database-level data validation.

---

## 💻 Tech Stack

This project combines a robust set of modern web technologies:

| Category | Technology |
| :--- | :--- |
| **Frontend** | EJS (Embedded JavaScript), HTML5, CSS3, Bootstrap 5 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | Passport.js (Local Strategy), Express-Session |
| **File Management** | Multer, Cloudinary API |
| **Mapping** | Mapbox API, Mapbox SDK (Geocoding) |
| **Utilities** | EJS-Mate (Layouts), Method-Override, Joi (Validation), `dotenv` |
| **Deployment** | Render |

---

## 🏁 Getting Started

To run this project on your local machine, follow these steps:

### 1. Prerequisites
* Node.js (v18.x or higher)
* MongoDB (A local instance or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account)
* API keys for:
    * [Cloudinary](https://cloudinary.com/)
    * [Mapbox](https://www.mapbox.com/)

### 2. Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[Harshit8bit]/ethos.git
    cd ethos
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create your `.env` file:**
    Create a file named `.env` in the root of the project and add your secret keys:

    ```env
    MONGO_URL=your_mongodb_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    MAP_TOKEN=your_mapbox_access_token
    SESSION_SECRET=a_very_strong_random_secret
    ```

4.  **Initialize the Database (Optional):**
    If you want to seed the database with the initial data, run:
    ```bash
    node init/index.js
    ```

5.  **Start the server:**
    ```bash
    nodemon app.js
    ```

6.  **Open the app:**
    Visit `http://localhost:8080` in your browser.

---

## 📸 Project Gallery

*(This is a great place to add 2-3 screenshots of your app)*

| Index Page  | Listing Show Page (with Map) | New Listing Form |
| <img width="1912" height="1028" alt="Image" src="https://github.com/user-attachments/assets/3a9fa9c8-1488-4222-86e1-780ef0837b5f" /> | <img width="1897" height="1024" alt="Image" src="https://github.com/user-attachments/assets/851b7a83-6e89-42f5-a4f8-c92aba51fded" /> | <img width="1889" height="1014" alt="Image" src="https://github.com/user-attachments/assets/adb0cd81-8a74-48f9-a9ce-0824cd519c77" /> |
|  | 



---

## 👨‍💻 Author

* **Harshit [Your Last Name]**
* GitHub: [Harshit8bit]
* LinkedIn: [www.linkedin.com/in/harshit-agarwal-bbb474326]