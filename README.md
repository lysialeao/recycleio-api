# Recycleio API

Recycleio API is a RESTful web service that allows users to create and manage waste collection requests. It was developed using Node.js, Express, and MySQL.

## Getting Started

To get started with the Recycleio API, follow these steps:

1.  Clone this repository to your local machine.
2.  Run `npm install` to install the project dependencies.
3.  Copy the `.env.example` file to `.env` and update the database credentials.
4.  Run the database migrations using `npx sequelize-cli db:migrate`.
5.  Start the application using `npm start`.

## Endpoints

The Recycleio API provides the following endpoints:

| HTTP Method | Endpoint | Description
| ----------------- | ----------- | -----------
| GET  |  /users | Returns a list of all users.
| POST |  /users | Creates a new user.
| DELETE |  /users/:id | Deletes the user with the specified ID.

## Contributing

Contributions to the Recycleio API are welcome! To contribute:

1.  Fork this repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes with clear commit messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## License

The Recycleio API is open source software licensed under the [MIT license](https://opensource.org/licenses/MIT).# Recycleio API
