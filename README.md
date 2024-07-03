# Ecommerce

This is an Ecommerce project built with a .NET Core API and a React client application.

## Project Status

Currently under development

## Features

*  Product Management: The application supports CRUD operations on products, as evidenced by the presence of a Product entity and corresponding endpoints in the ProductsController.
*  User Authentication and Authorization: Utilizes ASP.NET Core Identity for user management, with custom roles (Admin, User) defined, indicating a role-based access control system.
*  Shopping Cart: The existence of a Basket entity suggests functionality for a shopping cart, allowing users to add products to their basket. Users can put items into the basket without logging in. After logging in items in the basket will be transferred to logged-in user.
*  Order Processing: An Order entity indicates the application supports processing and tracking orders.
*  Address Management: Users have associated addresses, likely for shipping purposes, as indicated by the relationship defined in ApplicationDbContext.

## Project Structure

- `API/`: Contains the .NET Core API project.
- `Client/`: Contains the React client application.

## API

The API is a .NET Core project. It uses an SQL Server database, and the connection string can be found in the `appsettings.json` file.

### Running the API

To run the API, navigate to the `API/` directory and use the `dotnet run` command.

## Client

The client is a React application built with TypeScript and Vite.

### Running the Client

To run the client, navigate to the `Client/` directory and use the `npm run dev` command.

## License

This project is licensed under the MIT License. See the [`LICENSE.txt`](LICENSE.txt) file for details.
