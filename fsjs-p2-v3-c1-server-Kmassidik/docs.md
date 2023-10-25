# Welcome to API Restaurant Application!

**This is a bunch of list endpoint you can use on your project, happy coding.**

## Install

> npm i

## Config

Don't forget to config your database connection

```js
"development": {
	"username": "postgres",
	"password": "#yourpassword",
	"database": "dbRestaurant_challenge_1",
	"host": "localhost",
	"dialect": "postgres"
},
```

## Endpoints

**list of available endpoints**

- **POST** /login
- **POST** /register
- **GET** /users
- **GET** /users/:id
- **DELETE** /users/:id
- **GET** /cuisines
- **GET** /cuisines/:id
- **PUT** /cuisines/:id
- **PATCH** /cuisines/:id
- **POST** /cuisines
- **DELETE** /cuisines/:id
- **GET** /categories
- **GET** /categories/:id
- **POST** /categories
- **DELETE** /categories/:id
- **POST** /google-login
- **GET** /histories

**Public**
- **POST** /pub/register
- **POST** /pub/login
- **GET** /pub/cuisines
- **GET** /pub/cuisines/:id
- **GET** /pub/favorites/
- **POST** /pub/favorites/
- **POST** /pub/google-login


## POST /login

**Description**

> This endpoint allows users to log in by providing their credentials (username and password).

**Request Body**

```json
{
  "username": string,
  "password": string
}
```

**Response**

200 - OK

```json
{
  "token": string,
  "message": string,
  "username": string
}
```

401 - Unauthentication

```json
{
  "msg": "email is required!",
  "msg": "password is required!",
  "msg": "Invalid credentials"
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## POST /register

**Description**

> This endpoint allows users to create a new account by providing their registration details.

**Request**

- Body

```json
{
  "username" : string,
  "email" : string,
  "password": string
}
```

**Response**

201 - OK

- Body

```json
	{
		"email":  string
	}
```

400 - Bad Request

```json
{
  "msg": "Email has been registered, please use antoher email!"
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## GET /users

**Description**

> get all data users from database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
[
	{
		"id":  integer,
		"username":  string,
		"email":  string,
		"role":  string,
		"phoneNumber":  number,
		"address":  string,
		"createdAt":  DateString,
		"updatedAt":  DateString
	}
]
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## GET /users/:id

**Description**

> get spesific user from database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
{
   "id":  integer,
   "username":  string,
   "email":  string,
   "role":  string,
   "phoneNumber":  number,
   "address":  string,
   "createdAt":  DateString,
   "updatedAt":  DateString
}
```

404 - error not found

```json
{
  "msg": "error not found!"
}
```

## DELETE /users/:id

**Description**

> delete user by id from database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
{
   "user": {
       "id":  integer,
       "username":  string,
       "email":  string,
       "password":  string,
       "role":  string,
       "phoneNumber":  number,
       "address":  string,
       "createdAt":  DateString,
       "updatedAt":  DateString
   },
   "msg": "<username> success to delete"
}
```

403 - unauthorization

```json
{
  "msg": "you dont have perm"iss"ion to delete this!"
}
```

404 - error not found

```json
{
  "msg": "error not found!"
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## GET /cuisines

**Description**

> get all cuisines from database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
[
   {
       "id": integer,
       "name": string,
       "description": string,
       "price": number,
       "imgUrl": string,
       "authorId": number,
       "categoryId": number,
       "createdAt": DateString,
       "updatedAt": DateString,
       "User": {
          "id": number,
          "username":  string,
          "role": string,
          "createdAt": date,
          "updatedAt": date
       },
       "Category": {
          "id": number,
          "name": string,
          "createdAt": date,
          "updatedAt": date
       }
   },
]
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## GET /cuisines/:id

**Description**

> get spesific cuisine from database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
{
    "id": integer,
    "name": string,
    "description": string,
    "price": number,
    "imgUrl": string,
    "authorId": number,
    "categoryId": number,
    "createdAt": DateString,
    "updatedAt": DateString,
    "User": {
        "username":  string,
    },
    "Category": {
        "name": string,
    }
},
```

404 - error not found

```json
{
  "msg": "error not found!"
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## PUT /cuisines/:id

**Description**

> edit spesific cuisine from database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
{
    "data": {
        "id": number,
        "name": string,
        "description": string,
        "price": number,
        "imgUrl": string,
        "authorId": number,
        "categoryId": number,
        "status": string,
        "createdAt": date,
        "updatedAt": date
    },
    "message": "<data.name> data has been update!"
}
```

404 - error not found

```json
{
  "msg": "error not found!"
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## PATCH /cuisines/:id

**Description**

> get spesific cuisine from database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
{
    "data": {
        "id": number,
        "name": string,
        "description": string,
        "price": number,
        "imgUrl": string,
        "authorId": number,
        "categoryId": number,
        "status": string,
        "createdAt": date,
        "updatedAt": date
    },
    "message": "status change to <data.status>!"
}

```
400 - Invalid status value

```json
{
  "msg": "Invalid status value!"
}
```

404 - error not found

```json
{
  "msg": "error not found!"
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## POST /cuisines

**Description**

> add new user to database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

201 - OK

- Body

```json
{
    "data": {
        "name": string,
        "description": string,
        "price": number,
        "imgUrl": string,
        "categoryId": number
    },
    "msg": "success add data!"
}
```

400 - Bad Request

- Body

```json
[
  "name is required!",
  "description is required!",
  "price is required!",
  "imgUrl is required!",
  "authorId is required!",
  "authorId is required!"
]
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## DELETE /cuisines/:id

**Description**

> delete user by id from database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
{
    "data": {
        "name": string,
        "description": string,
        "price": number,
        "imgUrl": string,
        "authorId": number,
        "categoryId": number
    },
    "msg": "<name> success to delete!"
}
```

404 - error not found

```json
{
  "msg": "error not found!"
}
```

403 - unauthorization

```json
{
  "msg": "you dont have permission to delete this!"
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## GET /categories

**Description**

> get all categories from database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
[
    {
        "id": number,
        "name": string,
        "createdAt": DateString,
        "updatedAt": DateString
    }
]
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## GET /categories/:id

**Description**

> get spesific category from database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
{
    "id": number,
    "name": string,
    "createdAt": DateString,
    "updatedAt": DateString
}
```

404 - error not found

```json
{
  "msg": "error not found!"
}
```

## POST /categories

**Description**

> add new category to database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

201 - OK

- Body

```json
{
    "data": {
        "name": string
    },
    "msg": "success add data!"
}
```

400 - Bad Request

- Body

```json
  "name is required!"
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## DELETE /categories/:id

**Description**

> delete category by id from database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
{
    "category": {
        "id": number,
        "name": string,
        "createdAt": DateString,
        "updatedAt": DateString
    },
    "msg": "<name> deleted successfully"
}
```

403 - unauthorization

```json
{
  "msg": "you dont have permission to delete this!"
}
```

404 - error not found

```json
{
  "msg": "error not found!"
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## GET /cuisine-category/:id

**Description**

> get spesific category from database cuisine

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
{
    "cuisines": [
        {
            "id": number,
            "name": string,
            "description": string,
            "price": number,
            "imgUrl": string,
            "authorId": number,
            "categoryId": number,
            "createdAt": DateString,
            "updatedAt": DateString
        }
    ],
    "msg": "Data Found"
}
```

500 - Internal server error

```json
{
  "msg": "Internal server error!"
}
```

## POST /google-login

**Description**

> This endpoint allows users to login useng outh google

**Request Header**

> "google_token": "<your_access_token>"

**Response**

200 - OK

```json
{
  "token": string,
  "message": string,
  "name": string
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## GET /histories
**Description**

> get all data at table history

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
{
    "data": [
        {
            "id": number,
            "name": string,
            "description": string,
            "updatedBy": string,
            "createdAt": date,
            "updatedAt": date
        }
    ],
    "message": "data found!"
}

```
401 - Unauthorized

```json
{
  "msg": "Authentication failed"
}
```

500 - Internal server error

```json
{
  "msg": "Internal server error!"
}
```

## POST /pub/register
**Description**

> This endpoint allows users to create a new account by providing their registration details.

**Request**

- Body

```json
{
  "username" : string,
  "email" : string,
  "password": string
}
```

**Response**

201 - OK

- Body

```json
	{
		"email":  string,
     "data": {
        "id": number,
        "username": string,
        "email": string,
        "password": string,
        "role": string,
        "phoneNumber": string,
        "address": string,
        "updatedAt": string,
        "createdAt": string
    }
	}
```

400 - Bad Request

```json
{
  "msg": "Email has been registered, please use antoher email!"
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## POST /pub/login
**Description**

> This endpoint allows users to log in by providing their credentials (username and password).

**Request Body**

```json
{
  "username": string,
  "password": string
}
```

**Response**

200 - OK

```json
{
  "token": string,
  "message": string,
  "username": string
}
```

401 - Unauthentication

```json
{
  "msg": "email is required!",
  "msg": "password is required!",
  "msg": "Invalid credentials",
}
```

403 - Unauthorization

```json
{
  "msg": "Your not registed as customer!",
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## GET /pub/cuisines

**Description**

> get all cuisines from database

**Request**

- Query Parameters

```json
"filter" = string
"page" = number
```

**Response**

200 - OK

- Body

```json
[
   {
       "id": integer,
       "name": string,
       "description": string,
       "price": number,
       "imgUrl": string,
       "authorId": number,
       "categoryId": number,
       "status": string,
       "Category": {
          "id": number,
          "name": string,
       }
   },
]
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## GET /pub/cuisines/:id
**Description**

> get spesific cuisine from database

**Request**

- Params

```json
"id" = number
```

**Response**

200 - OK

- Body

```json
{
    "responses": {
        "id": number,
        "name": string,
        "description": string,
        "price": number,
        "imgUrl": string,
        "authorId": number,
        "categoryId": number,
        "status": string,
        "createdAt": string,
        "updatedAt": string,
        "Category": {
            "id": number,
            "name": string,
            "createdAt": string,
            "updatedAt": string
        }
    },
    "qiris": string
}
```

404 - error not found

```json
{
  "msg": "Data not found!"
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## GET /pub/favorites
**Description**

> get favorites cuisine from database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
[
  {
      "id": number,
      "UserId": number,
      "CuisineId": number,
      "Cuisine": {
          "id": number,
          "name": string,
          "description": string,
          "price": number,
          "imgUrl": string,
          "authorId": number,
          "categoryId": number,
          "status": string
      }
  },
]
```

401 - Unauthorized

```json
{
  "msg": "Authentication failed!"
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## POST /pub/favorites

**Description**

> Add favorites cuisine to database

**Request Header**

> "access_token": "<your_access_token>"

**Response**

200 - OK

- Body

```json
{
    "id": number,
    "UserId": number,
    "CuisineId": number,
    "updatedAt": string,
    "createdAt": string
}
```
404 - Not Found

```json
{
  "msg": "Data Cuisine is Invalid!"
}
```

401 - Unauthorized

```json
{
  "msg": "Authentication failed!"
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```

## POST /pub/google-login

**Description**

> This endpoint allows customers to login useng outh google

**Request Header**

> "google_token": "<your_access_token>"

**Response**

200 - OK

```json
{
  "token": string,
  "message": string,
  "name": string
}
```

500 - Internal Server Error

```json
{
  "msg": "Internal server error!"
}
```