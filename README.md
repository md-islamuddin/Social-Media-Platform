#  PRODIGY_FS_05 — Social Media Platform
**PRODIGY_FS_05** is a clean, beginner-friendly full-stack social media web application that includes essential features like user authentication, media posting, likes, comments, and a trending feed — all built with simple, familiar technologies to help you understand and extend with ease.

🔐 Register and log in (with JWT auth)

📝 Create posts with text, images, or videos

❤️ Like and 💬 comment on posts

📈 View a trending feed (sorted by likes)

🔄 Stay logged in across sessions and securely log out

🎯 Built with vanilla HTML/CSS/JS + Node.js/Express + MongoDB

# 🧠 Features Overview
✅ JWT Auth – Secure login & registration  
🖼️ Image and Video Uploads – Easily post rich media  
💬 Likes & Comments – Users can engage with posts  
📈 Trending Feed – Sorts posts based on popularity  
🚪 Logout – Session ends securely  
🧪 Simple UI – Built with plain HTML/CSS/JS (easy to customize)  

# 📁 Folder Structure
PRODIGY_FS_05/  
│
├─ backend/  
│  ├─ models/  
│  │  ├─ User.js             
│  │  └─ Post.js         
│  ├─ routes/   
│  │  ├─ auth.js          
│  │  └─ posts.js         
│  ├─ middleware/    
│  │  └─ auth.js          
│  └─ server.js         
│
└─ public/  
   ├─ css/  
   │  └─ style.css          
   ├─ img/                
   ├─ signup.html        
   ├─ login.html          
   ├─ feed.html           
   └─ js/  
      └─ app.js            
# 🛠️ Getting Started  
## 1. Clone the Repo  

git clone [Click](https://github.com/md-islamuddin/PRODIGY_FS_05)  
cd PRODIGY_FS_05
## 2. Install Dependencies   
npm install  
## 3. Run the Server  
npm run dev  
## 4. Open in Browser  
http://localhost:5000  
# 🔐 Authentication Flow
JWT-based login with persistent localStorage  

Backend protects API routes with auth.js middleware  

Logout simply clears the JWT from client storage  


# 📸 Screenshots 
## 🔐 Signup Page  
![](https://github.com/md-islamuddin/PRODIGY_FS_05/blob/main/Screenshot%202025-07-01%20185047.png)  
## 🔐 Login Page  
<img width="933" height="570" alt="Image" src="https://github.com/user-attachments/assets/1bd7edc0-cc81-4bbf-80b8-ef0c20c9631b" /> 
## 💬 Home Page  
![](https://github.com/md-islamuddin/PRODIGY_FS_05/blob/main/Screenshot%202025-07-01%20185121.png)
![](https://github.com/md-islamuddin/PRODIGY_FS_05/blob/main/Screenshot%202025-07-01%20185146.png)

# 📸 Post Types
Users can post:  

📝 Text-only content  

🖼️ Images (JPEG, PNG)  

🎬 Videos (MP4 supported)  

All media is uploaded and served from /public/img/.  

## 📈 Trending Feed
Posts are sorted by like count  

Real-time UI update after like/comment  

Comments are visible directly under each post  

###  Logout
Logout button clears JWT from storage  

Redirects user to login page securely  

# 🧩 Tech Stack
Layer	Tech  
Frontend	HTML, CSS, Vanilla JS  
Backend	Node.js, Express, MongoDB (Mongoose)  
Auth	JWT (jsonwebtoken)  
Uploads	Multer  
Styling	Plain CSS  

# 🔧 Optional Improvements
Want to take it further? Try adding:  

🔒 Password hashing with bcrypt  

📲 Mobile responsive layout  

🌐 Real-time updates with WebSocket  

🔎 Search or hashtag support  

🧼 Input validation and image size limits  

🎨 Design upgrades with Tailwind or Bootstrap  

 # 🧑‍💻 Author 
Built By **md-islamuddin** with Prodigy infotech as part of PRODIGY_FS_05 Task — focused on clarity, function, and extensibility.
# 👨‍💻 About  
#### Linkdin
[md-islamuddin](https://www.linkedin.com/in/md-islamuddin)
#### Youtube 
[Click](https://www.youtube.com/channel/md-islamuddin)

# 📜 License  
This project is open-source and available under the [MIT License.](https://github.com/md-islamuddin/PRODIGY_FS_05?tab=MIT-1-ov-file)  

