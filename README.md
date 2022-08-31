# ouija-board-enigma

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
