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
   'Build from base' - apiSlice (baseUrl), feature slices, injectEndpoints, buil queries and mutations
   each feature will have custom slice, building endpoints and custom hooks
   write custom selectors to use memoized data (access to ids) for working with targeted data

7. Fontend components to text RTK
   lists - create a list for each feature and render the data (optional cards and details pages)
   register - form componenet that creates a user, account ec.
   update - form component that edits specific data
   delete - button attached to deleteMutation

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

8. Subscriptions and Prefetching - SUBSCRIBE, LISTEN, REFETCH
   \*\* when we load the application we're 'querying the data' or 'creating a subscription' but if we're on a component that's not actually QUERYING THE DATA, data could 'expire' in other places, thus leading to issues.

A. SUBSCRIBE TO THE STORE
create a PreFetch component in auth folder
utilize useEffect so it runs on mount

'dispatch' GET methods from store - call Slice, call endPoints, query, initiate
\*\*\* usersApiSlice.endpoints.getUsers.initiate()

utitlize 'cleanup function' to unsubscribe when leaving protected pages

WRAP OUR DASH with the PREFETCH
'Outlet' component will provide Prefetch to ALL CHILD comps wrapped in it
\*\* wrap the Routes we want to use Prefetch (dash)

B. LISTEN and refresh
import setupListeners in store
set this to dispatch from the store
we can now add options object to our list components

- pollingIntervals - how often do we want to query?
- refetch on Focus - focusing on another browser window
- refetch on Mount or 'clicking back and forth on components'

C. REFETCH
Our data will now refetch itself based on the conditions set in the options object.

Scott graduated Blue Valley North in 01' where he garnered All-EKL, All-JOCO, All-KCMetro, and played in the Kansas-Missouri game. He moved on to NCCC where he was an All-Conference selection 2 years. In 03' Lucas was voted to the All-Region XI team and led the Panthers to their first even JUCO World Series birth. After stints at the University of Arizona and Central Missouri State, Scott signed as an NDFA with the Minnesota Twins. He played one season in the GCL before being released. He signed with the Kansas City Royals pior to the the 06' campaign. Scott played a season in the AZL, then started the 07' season with the Burlington Bee's of the Midwest League before being released.

// UPLOADING IMAGES
// modal contains a form to upload image file

Multer
// 3 STEPS
// 1. formData uploaded via routes w multer - image uploaded to assets
// 2. updateProfile runs to update 'player.profilePic'
// 3. dispatch 'setCreds' to update auth/playerInfo with profilePic data

Firebase (ref, uploadBytes, listAll, getDownloadURL)

1. create an imageRef to the FB storage, name the path
2. upload that ref with uploadBytes
3. render with a useEffect listAll and getDownloadURL
