# diary30server
Really short-time video of running project <a>https://youtu.be/75wfVbNT7XA</a>.

Summary: Client side of diary30 project and clouded in Firebase. Images are stored in Cloudinary.

Language use: React.js

# Running manual

Go to <a>https://diary30woo.web.app/</a> (Deployed client side version)

1. Login with sample user

ID: sample123

PWD: Sample123

2. Go to register and make your own ID

# Code explanation
- Recent completed and deployed version is in "main" branch 

# Timeline
2022.9 - 2022.12 : Start project as CSE316(Software Engineering) Final project with two other members

2022.12 - 2023.3 : Develop project with Deploy, Change logic, Catch bug, Collect user data, Componentize, add Calender on client side during winter break

# Deploy Setup Tutorial
Client side: repository "diary30"

1. Download zip file from 'main' branch

2. type 'npm install' command at 'diary30-main; folder

3. type 'npm run build' and 'firebase deploy' at 'diary30-main' folder sequentially

Backend side: repository "diary30server"

1. Download zip file from 'RecentDeploy' branch

2. type 'npm install' command at the 'functions' folder but not at original 'diary30server-RecentDeploy' folder

3. type 'firebase deploy --only functions' at original 'diary30server-RecentDeploy' folder

# Running on local server Tutorial
Client side: repository "diary30"

1. Change All: https://diary30woo.web.app > http://localhost:3000

2. type 'firebase emulators:start --only functions' command at backend 'diary30server-RecentDeploy' folder

3. Change All: https://diary30wooserver.web.app > http://127.0.0.1:5001/diary30wooserver/us-central1/app(number 5001 can be changed on given host number by firebase from number 2 step

4. type 'npm run start' command at client side 'diary30-main' folder









