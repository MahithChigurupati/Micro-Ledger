# Bank Statement Generator

This repository contains the code for a Bank Statement Generator backend application, designed using microservice architecture.

**Developer:**
[Mahith Chigurupati](https://github.com/MahithChigurupati)<br>
**Role:**
Backend Developer<br>
**Email:** mahithchigurupati@gmail.com

## Overview

The goal of this project is to create a set of services that generate a PDF bank statement for a user based on a specified date range. The main services include:

- API service to handle user requests with date range and email ID
- Database service to collect relevant transactions
- PDF generation service to create a PDF document of transactions
- Email service to send the generated PDF to the user's email address as an attachment

## Project Structure

The project adheres to the microservices architecture, with each service performing a specific function. The services are loosely coupled, ensuring minimal interference with each other's processes.

### Services

1. **API Service**

   - Exposes a basic API that accepts a date range and user email ID.
   - Language/Framework: Node.js

2. **Database Service**

   - Filters transaction data stored in a CSV file.
   - Columns in CSV: `user_email`, `date_of_transaction`, `amount`

3. **PDF Generation Service**

   - Creates a PDF document with transaction details.
   - Format: lines of text with each line representing a valid transaction.

4. **Email Service**
   - Sends the generated PDF as an attachment to the user's email address.

## Why did I chose Node.js for this project?

When selecting languages and frameworks for this project, my primary consideration was the efficiency and ease of development that Node.js and its associated libraries provide. Node.js is ideal for either full stack development to integrate our backend with frontend and for even data-intensive real-time applications that run across distributed network. Additionally, its vast ecosystem of libraries, such as `amqplib` for message queuing with `RabbitMQ`, `pdfkit` for PDF generation, and `nodemailer` for sending emails, allows for quick integration of complex functionalities. Cherry on top, Node.js has well built online community of developers to get help from when struck.

## Bonus question on adding authorization and authentication:

To enhance security, authentication and authorization can be implemented in the following ways:

- **Authentication:** I would implement `JWT` (JSON Web Tokens) for secure, token-based user authentication. This would involve users logging in through a secure endpoint that verifies their credentials and issues a token upon success.

- **Authorization:** I'd employ `OAuth 2.0` to allow users to authorize the application to perform operations on their behalf without sharing their credentials.

Both measures would ensure secure access to the user's data and the banking application's functionality. This would require an `HTTPS` setup to encrypt data in transit, providing an additional layer of security.

## Getting Started

To start the project, follow these steps:

1. Clone the repository to your local machine.
2. Set up the required environment variables and dependencies.

**Note:**
All servers need to have a .env with

```
PORT=XXXX
```

for email server, make sure to include following details along with PORT-

```
EMAIL="<email>"
PASSWORD="<password>"
EMAIL_SERVICE_PROVIDER="Gmail"

## or any other email service provider
## for security, use App password generated in google account -> security -> 2FA -> App Password

```

## Instructions to Run the Project

- Clone the git repo using SSH: `git@github.com:MahithChigurupati/Bank-Statement-Generator.git`
- Clone the git repo using HTTPS: `https://github.com/MahithChigurupati/Bank-Statement-Generator.git`

Run the following commands in all service directories to start all servers:

```bash
// Install dependencies
npm install

// Run the project
npm start
```

## Tools used:

- moment: For dealing with timestamps
- fs: for reading and writing to files for CSV reader and PDF generation
- amqplib: for pusblishing and consuming messages from RabbitMQ
- csv-parser: for reading and parsing CSV file
- nodemailer: for sending emails
- pdfkit: for generating PDF

## Endpoint URLs for API Service

```JavaScript
//Health check EndPoint
GET http://localhost:8000/healthz

//Generate a PDF request to api-service
POST http://localhost:8000/generatePDF
```

Make sure RabbitMQ is running in the background `localhost:15672`

**Note:** All other servers should be running on their respective ports but they don't need to be communicated with each other or individually because a request sent just to api-service will propagate to all the other servers to perform their job with the help of RabbitMQ message queue with each server listening on respective queues.

## Sample JSON Request for POST Method

```JSON
{
    "fromDate": "2022-04-22",
    "toDate": "2023-04-22",
    "userEmail": "mahithchigurupati@gmail.com"
}
```
