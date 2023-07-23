# Backend Project: Node.js Express with TypeScript, JWT Authentication, MailTrap, MongoDB, and Amazon AWS

## Introduction

This project is a Backend Node.js application built using Express.js, incorporating the MailTrap service for email testing, and MongoDB for database storage. It follows SOLID principles for better code design and maintainability.

## Getting Started

To run the development server, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running the following command in the project root:

```bash
npm install
# or
yarn
# or
pnpm install
```
The backend server will be up and running on the specified port.

## SOLID Concepts
SOLID is a set of principles aimed at making software design more maintainable and scalable. This project follows SOLID principles to ensure better code quality and easier future modifications.

## Express.js

Express.js is a popular and minimalistic web framework for Node.js. It provides a set of tools and features to build web applications and APIs quickly and efficiently. Express simplifies routing, middleware management, request handling, and response creation, making it an excellent choice for building server-side applications.

## MongoDB
The project uses MongoDB as the database for storing application data. MongoDB is a NoSQL database, providing flexibility and scalability for handling various types of data.

## JWT Authentication
User authentication in this project is implemented using JWT (JSON Web Tokens). When users register or log in, they receive a JWT that they use for subsequent authenticated requests. JWT provides a secure way to verify the identity of users and manage sessions.

## MailTrap
The application utilizes MailTrap for testing email functionality in a development environment. MailTrap provides a sandboxed SMTP server, allowing you to view sent emails without actually sending them to real recipients.

## Amazon AWS for Image Storage
The project utilizes Amazon AWS to store and manage images. Amazon AWS provides secure and scalable cloud storage solutions, ensuring efficient handling of image uploads and retrieval.

## Deploy on Heroku
The project can be deployed on Heroku, a cloud platform that supports Node.js applications. To deploy your backend project on Heroku, follow these general steps:

1 . Sign up for a Heroku account if you don't have one.

2 . Install the Heroku CLI on your machine.

```bash
heroku login
```
1 . Create a new Heroku app:
```bash
heroku create your-app-name
```
2 . Set the necessary environment variables for MailTrap and MongoDB on Heroku:

```bash
heroku config:set JWT_SECRET_KEY=your_jwt_secret_key
heroku config:set DATABASE_USERNAME=your_database_user_name
heroku config:set DATABASE_PASSWORD=your_database_password
heroku config:set BUCKET_NAME=your_bucket_name
heroku config:set AWS_ACCESS_KEY_ID=your_aws_access_key_id
heroku config:set AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
heroku config:set AWS_DEFAULT_REGION=aws_region
heroku config:set STORAGE_TYPE=s3 or local
heroku config:set MAILTRAP_USER=your_mailtrap_username
heroku config:set MAILTRAP_PASS=your_mailtrap_password
```

3. Push the code to Heroku:
```bash
git push heroku master
```
## API Documentation

For more detailed information about the API endpoints and how to use them, check out the [API Documentation](https://app.swaggerhub.com/apis-docs/LUTEROELAVOCO90/SocialAPI/1.0.0#/).




