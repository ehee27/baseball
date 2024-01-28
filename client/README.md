1. Server and Data Layer
   import our tools - express, dotenv, mongoose, asyncHandler, bcrypt etc.
   create our express server and test that's it's live
   once server is created with think about 'data' path
   routes, controllers, Model
   \*\*\* STANDARD CRUD OPS (create, update, delete, login, logout)

\*\*\* optional middleware (errors and logs)

2. Connect to MongoDB and configure the DB Connection
   create our DB in Mongo - cluster, collection, connection
   configure the connection in our project

3. CORS
   install cors and allow app to use it
   set an allowedOrigins array and corsOptions file. (allows access to our data)

4. CRUD OPERATIONS
   now we'll revisit our controllers to write all CRUD logic and test in postman
   a. destructure elements from request body
   b. check for exisisting or 'find by ID'
   c. if exists let us know or...
   d. generateToken (I prefer in separate file)

\*\*\* test in Postman

5. Frontend
   start think about the frontend layout - Home, Layout, Dash, Login etc.
   create a layout and flow (optional dash)
   import react-router-dom and create route tree

6. State Management with RTK
   'Build from base' - apiSlice (baseUrl), feature slices, injectEndpoints, builder
   generate custom hooks
   write custom selectors to use memoized data (access to ids)
