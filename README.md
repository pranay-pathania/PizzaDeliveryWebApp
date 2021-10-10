# Pizza Delivery App (React Typescript, NodeJS, MongoDB)

This is one project that i plan to work on for a longer duration than a few weeks. More changes to the app will come soon.
This is something like version 1.0.0 (much less sophisticated though).


### Introduction

This is a web application made for an imaginary Pizza Delivery Service (because everyone loves pizza).
It has three major parts as of now:
1. The app a customer interacts with (served on a server completely dedicated to serving static files: temporary replacement to hosting)
2. The app the working staff interacts with (server on the same type of server as above)
3. A dedicated backend for handling requests from both the staff and the customer



### Technology Used
1. React Typescript for the UI
2. NodeJS + Express for the backends
3. MongoDB (run locally by running the "mongod" command in the terminal) for the database


### Shortcomings of the current project
1. Passwords recieved are not encrypted in any manner before storage.
2. Login implementation is probably a bit lousy and too insecure for the real world.
3. My CSS is terrible (and not responsive)


### Immediate goals   
1. Add better styling (and make it responsive, hopefully)
2. Encrypted passwords (very important)


### Future Goals
1. Add online payments to the payments option
2. Send the user an email telling them that the order has been placed succesfully


#### Personal Points
1. TS is a bit weird to work with, especially while using React Hooks, but that autocomplete makes up for everything (somewhat).
2. Learn to style your websites better.