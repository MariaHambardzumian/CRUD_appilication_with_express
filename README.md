### RUN THE PROJECT

To run the application, please enter the command 
    - **npm start**
the application is accessible at `http://localhost:3000` after running the npm start command.    


### API Endpoints

- **POST** `/users`: Use this endpoint with the request body to create a new user using the provided object.
- **GET** `/users/:id`: Use this endpoint to retrieve the user information for the specified ID.
- **POST** `users/activate/:id`: Use this endpoint to activate the user with the specified ID.
- **PUT** `/users/:id`: Use this endpoint to update the user information for the specified ID using the provided object.
- **DELETE** `/delete/:id`: Use this endpoint to delete the user with the specified ID.
