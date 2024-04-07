# privateSocialApp
Secure and Authenticated Backend App with ability to Register, Login, Change Profile and View other public profiles.

User Stories:
* As a user, I can register a new account.
* As a user, I can log in.
* As a user, I can log in or register with at least one of the following services: Google, Facebook,
Twitter, or GitHub.
* As a user, I can sign out.
* As a user, I can see my profile details.
* As a user, I can edit my details including: photo, name, bio, phone, email, and password.
* As a user, I can upload a new photo or provide an image URL.
* As a user, I can choose to make my profile public or private.
* As an admin user, I can see both public and private user profiles.
* As a normal user, I can only see public user profiles.

# Security Features
* Secure Authentication and Authorization (Ex: JWT)
* Strong and detailed Validation and Sanitization (Ex: High Secure password generation)
* Encrypted and protected passwords storage
* Deatailed Error Handling and Logging (10 differnet types of Error Code and Messages)

# API Information
1. router.post("/users/register",userController.register ); => API to register new user => Take input in body in JSON form => Input Example : { "userName": "rishabh123", "email": "rishabh@gmail.com", "password": "Rishabh@123", // optional "username": "rishabh123" // optional "bio" : "programmer for life"}

2. router.post("/users/login",userController.login ); => API to login an already registered user => Take email and password in body => Input example : { "userName": "rishabh123", "email": "rishabh@gmail.com", "password": "Rishabh@123"}

3. router.post("/users/socialLogin",userController.socialLogin ); => API to login/register via Socials like ('google', 'facebook', 'github') => Take provider and token in body => Input example : { "provider": "google", "token": "asldkfha@shfSfgsDF#sdfg$dg34ASDFG4we"}

4. router.post("/users/",userController.getUser ); => Authorized API to get user Details and Profile => Take email in body, And Autorization token in the Headers => Input example : {"email": "rishabh@gmail.com"} and headers:{..., Authorization: "jwt-token"}

5. router.post("/users/uploadProfile",userController.uploadProfile ); => Authorized API to update Profile photo => Take email and photo(either imageUrl of the form imageurl.jpg/imageurl.png/... or file) in body, And Autorization token in the Headers => Input example : {"email": "rishabh@gmail.com", imageUrl: "abc46fg.jpg", file:\\buffer} and headers:{..., Authorization: "jwt-token"}

6. router.post("/users/getProfiles",userController.getProfiles ); => Authorized API to get user Public Profiles => Take email and userArr (pass empty array to get all profiles) in body, And Autorization token in the Headers => Input example : {"email": "rishabh@gmail.com", userArr: ["john@gmail.com", "ben@gmail.com"]} and headers:{..., Authorization: "jwt-token"}

7. router.post("/admin/getUsers",adminController.getUsers ); => Authorized API for admin users to get both Public and Private Profiles => Take email and userArr (pass empty array to get all profiles) in body, And Autorization token in the Headers => Input example : {"email": "rishabh@gmail.com", userArr: ["john@gmail.com", "ben@gmail.com"]} and headers:{..., Authorization: "jwt-token"}

6. router.post("/users/changeProfile",userController.changeProfile ); => Authorized API to get user Public Profiles => Take  phone, name, email, password, bio, isAdmin, isPublic in body, And Autorization token in the Headers => Input example : {"email": "rishabh@gmail.com", isPublic: 1, bio:"god programmer"} and headers:{..., Authorization: "jwt-token"}

7. router.post('/logout', (req,res,next)=> res.status(200).json({message: 'Logged out successfully'})); => Authorized API to Logout => Client should do localStorage.removeItem('accessToken'); 


#Future Improvements
* Use API,SECRET key Authentication for ultimate account security.
* Use Websockets for real-time updates.
* Use ICP protocol file storage.
* Improve controllers
* Extend the Low Level Design.
