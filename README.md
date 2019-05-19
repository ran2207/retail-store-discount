# retail-store-discount

A simple api allows a user to redeem discounts based on the role of the user.The backend is built with NodeJS (ES6+) using Fastify framework. The users are stored temporarily using Redis. For backend have written six tests covering scenarios as per the scope of the assessment. The api is dockerized and thereby bringing all the advantages of docker along with it.

##### What would you do differently if you had more time?

- Use MongoDB instead of redis for registration
- Use JWT for authorization
- Better handling of errors

## Installation Guide

- Software Requirements

  - Visual Studio Code
  - Docker

- Running the App
  ```sh
  $ cd retail-store-discount
  $ yarn start
  ```
- Running api tests
  ```sh
  $ cd retail-store-discount/api
  $ yarn test
  ```
- Stopping the App
  ```sh
  $ cd retail-store-discount
  $ docker-compose down
  ```

## UML Class Diagram

![alt text](./uml.jpg?raw=true "UML Class Diagram")
