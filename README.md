# ouija-board-enigma

## Setup

Create `.env` file in the root of the project. Add values for the following variables.

```text
MYSQL_DB_ROOT_USER=<string>
MYSQL_DB_ROOT_PASSWORD=<string>
MYSQL_DB_DATABASE=<string>
MYSQL_DB_LOCAL_PORT=<number>
MYSQL_DB_DOCKER_PORT=<number>
NODE_LOCAL_PORT=<number>
NODE_DOCKER_PORT=<number>
```

Run `npm run start` to build the docker containers and start the service.

## Tests

Run all test suites using `npm run test`. You can separately run unit or integration with their corresponding commands.

## Routes

`GET     /comments`  
`POST    /comments`  
`GET     /users`
`GET     /users/{id}`  
`POST    /users`  
`GET     /votes`  
`DELETE  /votes/users/{userId}/comments/{commentId}`  
`PUT     /votes/users/{userId}/comments/{commentId}`  

## ER Diagram

```mermaid
erDiagram
    COMMENT {
        int comment_id PK
        int user_id FK
        string comment_text
        string created_timestamp
        int parent_comment_id
    }
    USER {
        int user_id PK
        string name
        string picture
    }
    VOTE {
        int vote_id PK
        int user_id FK
        int comment_id FK
    }
    USER ||--o{ COMMENT : makes
    COMMENT ||--o{ VOTE : has
    USER ||--o{ VOTE : gives
```

## Improvements

The following is a small non-exhaustive list of things that could be improved if this was an actual production application:

* UI tests
* E2E tests
* Snapshot tests
* More optimized mobile viewport (given mobile mock)
* Validation of more failure scenarios
* Security hardening
* Request authentication between FE and BE
* Logging and monitoring
