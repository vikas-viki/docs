# 🚀 Detoxify  

## 📌 Overview
**Detoxify** is a Chrome extension that customizes a user's YouTube home feed by prioritizing videos based on selected keywords. Instead of relying on YouTube’s algorithm, users can specify topics or keywords they want to see. The extension dynamically updates the home feed, ensuring that recommended videos align with their interests.  

## 🛠 Tech Stack  
- **Frontend:** HTML, CSS, JavaScript  
- **Background Processing:** Chrome Service Workers (JS)  

## 🌟 Features  
- ✅ **Keyword-Based Feed Customization** – Users can enter keywords (e.g., "Web Development," "AI," "Gaming"), and the extension will prioritize videos related to these topics while hiding unrelated content.  
- ✅ **Real-Time Feed Modification** – As soon as the user visits YouTube or updates their keywords, the extension dynamically updates the home feed.  
- ✅ **User Authentication** – Google Login is used to generate a user-specific API key for fetching personalized recommendations.  

---

## 📛 Architecture  

### 🛠 System Overview  
This project is structured into three major components:  
- **Frontend (HTML, CSS, JS)** – Manages the UI and user interactions.  
- **Service Workers (JS)** – Handles keyword-based processing, YouTube API calls, and feed filtering.  
- **Storage** – Uses Chrome’s Local Storage API to store user preferences.  

### 📊 Frontend  
**Note:** This extension relies on the **Chrome Extensions Messaging API** for communication between components.  

#### 🔹 Authentication  
- A user-specific API key is generated via **Google Cloud Console** to provide filtering services after the user logs in with Google.  
- Credentials are stored securely using **Chrome's Local Storage API**.  

#### 🔹 Home Feed Updation  
- The UI is automatically updated if the user has logged in previously.  
- When the user updates their filter keywords:  
  1. The **YouTube Data API v3** is queried for each keyword.  
  2. Additional API calls fetch relevant details (thumbnails, metadata, channel info and metrics).  
  3. The received results are organized, structured and filtered.  
  4. The YouTube home feed UI is updated accordingly.  

---

## ⚙️ Installation & Setup  
```sh
# Clone the repository
git clone https://github.com/vikas-viki/detoxify_chrome.git

# Install dependencies
cd detoxify_chrome
npm install

# Start development server
npm run dev
```

## 🧪 Challenges & Solutions  

### 1️⃣ Surpassing Free API Limits  
- **Problem:** Exceeding YouTube API limits when using a single API key.  
- **Solution:** Instead of using a single developer key, a **unique API key is generated per user**.  

### 2️⃣ Efficient Data Handling & Filtering  
- **Problem:** Managing large amounts of video data efficiently.  
- **Solution:** Optimized API requests and structured filtering using the **YouTube Data API v3**.  

---

## 🏆 Key Learnings  
- Implementing **Google Login** for user-specific services.  
- Gaining hands-on experience in **Chrome Extension development**.  
- Understanding how Chrome’s **Service Workers & Messaging API** function.  

---

## 📝 Future Improvements  
- 🔹 Implementing feed filtering **without relying on the YouTube API**, using direct **DOM manipulation**.  
- 🔹 Adding **more customization options**, such as time-based filtering or content categorization.  
- 🔹 Enhancing **UI/UX** for a more seamless user experience.  

---

## 📩 Contact  
For any questions, feel free to reach out at [vikaskotary001@outlook.com](mailto:vikaskotary001@outlook.com).
