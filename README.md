# Live Users Dashboard

A JavaScript application that shows current online users.

## Tech stack

- **Frontend** - ES6 JavaScript, SCSS and HTML with a nodejs server
- **Backend** - PHP with a text file database
- **Unit tests** - jest

![Screenshot](./screenshots.png "Screenshot")

## User online status tracking

I use localStorage and sessionStorage to track the online status of users.
All online users are stored in the `localStorage` and on tab closure, they are removed from `localStorage`.
`sessionStorage` is used to track the current user.
