# Blog Management

## How to run/test this project
* ensure you have git installed properly on your machine
* ensure you have node.js installed on your machine
* open your terminal and run `git@github.com:debeemedia/talentsync_test.git`
* run "npm install"
* run "npm start" to start the server, "npm run dev" to start the server with nodemon
* see .example.env file for necessary environment variables

## Documentation

### Overview
This API allows authorized users to create, update, and delete blog posts and any user to read a blog post.

### Base URL
The base URL for this API is https://talentsync-debee.onrender.com/api

### Encryption
User passwords are securely salted and hashed before being stored in the database.

### Authentication
Authentication is managed with JSON Web Tokens (JWTs).

### Error Handling
In case of errors, the API responds with appropriate HTTP status codes and informative error messages.

### Endpoints

#### USERS:

##### Register a User

* Endpoint: /users/register
* Method: POST
* Description: Allows a user to register.
* Parameters:
 Request body: a JSON object with the keys username and password (both mandatory).
* Example of request body:
```
{
  "username": "example_user",
  "password": "password123"
}
```

* Response:
Status Code: 201 (Created); a JSON Object
```
{
  "success": true,
  "message": "Registration successful"
}
```

Status Code: 400 (Bad Request)
```
{
  "success": false,
  "message": "Please provide username"
}
```

Status Code: 400 (Bad Request)
```
{
  "success": false,
  "message": "Please provide password"
}
```

Status Code: 400 (Bad Request)
```
{
  "success": false,
  "message": "Username already exists"
}
```

##### Log In
* Endpoint: /users/login
* Method: POST
* Description: Allows a registered user to log in
* Parameters:
 Request body: a JSON object with keys username and password (both mandatory).
* Example of request body:
```
{
 "username": "example_user",
 "password": "password123"
}
```

* Response:
Status Code: 200 (OK)
A token is sent in the response.message; this token expires in 1 hour and must be provided in the headers as Authorization for protected routes
```
{
  "success": true,
  "message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjFkOTdiMjJkZmY3OGU4ZGRmYjg0MSIsInVzZXJuYW1lIjoiZGViZWUiLCJpYXQiOjE3MDA5MTMwMjcsImV4cCI6MTcwMDkxNjYyN30.hWaUuR7VuvWmFwgvtzI7qyA7emYvaDUIz8S80UpQMuQ"
}
```
NB: The token above is just a sample

Status Code: 400 (Bad Request)
```
{
  "success": false,
  "message": "Please provide credentials"
}
```

Status Code: 401 (Unauthorized)
```
{
 "success": false,
 "message": "Incorrect credentials"
}
```

Status Code: 404 (Not Found)
```
{
  "success": false,
  "message": "User not found"
}
```

##### Authentication
* Authentication is handled with JWT. The token expires in 1 hour and must be provided in the headers as Authorization for protected routes
* Response: Below are returned responses when accessing protected routes
- When no token is provided:
Status Code: 401 (Unauthorized)
```
{
  "success": false,
  "message": "Unauthorized. Please login"
}
```
- When the token is invalid:
Status Code: 401 (Unauthorized)
```
{
  "success": false,
  "message": "invalid signature"
}
```
Status Code: 401 (Unauthorized)
```
{
  "success": false,
  "message": "invalid token"
}
```
- When the token has expired:
Status Code: 401 (Unauthorized)
```
{
  "success": false,
  "message": "jwt expired"
}
```

#### POSTS:

##### Create a Post

* Endpoint: /posts/create
* Method: POST
* Description: Allows a logged-in user to create a post.
* Parameters:
 Request body: a JSON object with the keys title, content and author (all mandatory).
* Example of request body:
```
{
  "title": "My First Post",
  "content": "hello there... debee here",
  "author": "User"
}
```
* Response:
Status Code: 201 (Created); a JSON Object
```
{
  "success": true,
  "message": "Post created successfully"
}
```

Status Code: 400 (Bad Request)
```
{
  "success": false,
  "message": "Please provide required fields"
}
```

##### Get all Posts

* Endpoint: /posts/
* Method: GET
* Description: Allows getting of all posts.
* Parameters: None
* Response:
Status Code: 200 (OK); a JSON Object with a message array of posts
```
{
  "success": true,
  "message": [
    {
      "_id": "65ae69f3d1cf538b69050948",
      "title": "First Post from debeemedia",
      "content": "didididd",
      "author": "Deborah",
      "user_id": "65ae6864025a0060ca7e68b5",
      "createdAt": "2024-01-22T13:13:23.727Z",
      "updatedAt": "2024-01-22T13:13:23.727Z",
      "__v": 0
    },
    {
      "_id": "65ae6afb39d02e5eafba0660",
      "title": "Okeke's first post",
      "content": "idididd",
      "author": "Okeke",
      "user_id": "65ae686e025a0060ca7e68b8",
      "createdAt": "2024-01-22T13:17:47.617Z",
      "updatedAt": "2024-01-22T13:17:47.617Z",
      "__v": 0
    }
  ]
}
```
Status Code: 404 (Not Found)
```
{
  "success": false,
  "message": "No posts found"
}
```

##### Get all Posts by a User

* Endpoint: /posts/user/:user_id
* Method: GET
* Description: Allows getting of all posts by a user.
* Parameters:
    Path Parameter: ID of the user
* Response:
Status Code: 200 (OK); a JSON Object with a message array of posts
```
{
  "success": true,
  "message": {
    "_id": "65ae59f7dfdf61a8eefbb934",
    "title": "Second Post from debeemedia",
    "content": "didididd",
    "author": "Deborah",
    "user_id": "65ae58282b19c33aff82f093",
    "createdAt": "2024-01-22T12:05:11.118Z",
    "updatedAt": "2024-01-22T12:05:11.118Z",
    "__v": 0
  }
}
```
Status Code: 404 (Not Found)
```
{
  "success": false,
  "message": "No posts found"
}
```
Status Code: 400 (Bad Request)
```
{
  "success": false,
  "message": "Please provide user_id"
}
```

##### Get a Post by Id

* Endpoint: /posts/:post_id
* Method: GET
* Description: Allows getting of a post by id.
* Parameters:
    Path Parameter: ID of the post
* Response:
Status Code: 200 (OK); a JSON Object with a message object of post
```
{
  "success": true,
  "message": {
    "_id": "65ae69f3d1cf538b69050948",
    "title": "Fifth Post from debeemedia",
    "content": "didididd",
    "author": "Deborah",
    "user_id": "65ae6864025a0060ca7e68b5",
    "createdAt": "2024-01-22T13:13:23.727Z",
    "updatedAt": "2024-01-22T13:13:23.727Z",
    "__v": 0
  }
}
```
Status Code: 404 (Not Found)
```
{
  "success": false,
  "message": "Post not found"
}
```
Status Code: 400 (Bad Request)
```
{
  "success": false,
  "message": "Please provide post_id"
}
```

##### Update a Post

* Endpoint: /posts/edit/:post_id
* Method: PUT
* Description: Allows a logged-in and authorized user to edit a post.
* Parameters:
    Path Parameter: ID of the post
* Response:
Status Code: 200 (OK); a JSON Object
```
{
  "success": true,
  "message": "Post updated successfully"
}
```

##### Delete a Post

* Endpoint: /posts/delete/:post_id
* Method: DELETE
* Description: Allows a logged-in and authorized user to delete a post.
* Parameters:
    Path Parameter: ID of the post
* Response:
Status Code: 200 (OK); a JSON Object
```
{
  "success": true,
  "message": "Post deleted successfully"
}
```

##### Authorization
* Only the creator of a post can update or delete the post
* Response: Below are returned responses for an unauthorized user:
Status Code: 403 (Forbidden)
```
{
  "success": false,
  "message": "Access Denied. You are not the creator of this post"
}
```

- Other responses during post updation or deletion:
Status Code: 400 (Bad Request)
```
{
  "success": false,
  "message": "Please provide user_id"
}
```
Status Code: 400 (Bad Request)
```
{
  "success": false,
  "message": "Please provide post_id"
}
```
Status Code: 404 (Not Found)
```
{
  "success": false,
  "message": "Post not found"
}
```