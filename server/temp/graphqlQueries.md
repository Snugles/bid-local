// Example queries: Make sure to use correct numbers given by your database.

----------------**TOKEN**---------------------
HTTP HEADERS (copy in here the token string you get from sign in to run queries that require it)
{
  "x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzYTNlN2IxLTQ2OGYtNDU4Ny05ZTFiLTM3MjkyMzRkNTQ5MSIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsImlhdCI6MTYwNzUyOTE4OSwiZXhwIjoxNjA3NTY1MTg5fQ.0SISGoVBkxS0Yio2znlPHkaZaoL5VJvjtgU3olx7LK8"
}

-----------------**USERS**---------------------
//Create User

mutation {
  sign_up(email: "mooming91266@gmail.com", password: "pass") {
    token
  }
}

mutation {
  sign_in(email: "user@user.com", password: "pass") {
    token
  }
}

// Edit/Update user (user to update determined by token)
mutation {
  update_user (
    user:{email: "mooming6@gmail.com", password: "pass",firstName: "Papa", phoneNumber: "00032658447"})
  {
    id
    firstName
    lastName
    password
    email
    phoneNumber
    item {
      name
    }
    address{
      city
    }
  }
}
//GET USER INFO REQUIRES A TOKEN
{
  get_user_info {
    id
    firstName
    lastName
    password
    email
    phoneNumber
    item {
      id
      name
    }
    address {
      id
      firstLineAddress
      secondLineAddress
      city
      postcode
      country
    }
  }
}

--------------------------**ITEMS**-----------------------------------
//Create an item (INCLUDE TOKEN)
mutation {
  create_item(
    item: { name: "Little Elephants", minPrice: 30, auctionEnd:"07 Dec 2020 00:12:00 GMT" }
  ) {
    id
    name
    minPrice
    user {
      email
      id
    }
  }
}

// List all items (NO TOKEN NECESSARY)
query {
  get_items{
    id
    name
    minPrice
    description
    picUrl1
    picUrl2
    picUrl3
    category{
      name
    }
    user {
      email
    }
  }
}

// Get item by Id (Insert the correct id given from database)
// No token necessary, but will info obtainable probably to be
//limited
query{
  get_item_by_Id(id:"109bf017-ec5b-4b0a-abaf-4dd596a2c552"){
    id
    name
    minPrice
    picUrl1
    picUrl2
    picUrl3
    description
    category {
      name
    }
  }
}

//Update/Edit Item  TOKEN NEEDED (ALSO HAS TO BE OWNER OF ITEM)
mutation {
  update_item (itemId:"33290e0e-aa0a-4ccd-945c-a145b90b9367",item: {
      name: "Elephant ELEPHANT elephants!"
      minPrice: 30
  }) {
    id
    name
    minPrice
    description
    picUrl1
    picUrl2
    picUrl3
    bidder
    auctionEnd
    user{
      id
      email
      password
    }
  }
}

//Delete an item TOKEN NEEDED (ALSO HAS TO BE OWNER OF ITEM)
mutation {
  delete_item_by_id(itemId:"503455e5-0008-49ae-b6ed-00c8a7ade28b")
}

-------------------------**CATEGORIES**------------------------------



//List all categories (and items within them) NO TOKEN NEEDED
query {
  get_categories{
    id
    name
    item {
      name
    }
  }
}

-----------------------**ADDRESSES**--------------------------

//Create Address TOKEN NEEDED (ALSO HAS TO BE OWNER OF ADDRESS)
mutation {
  create_address(
    address: {
      firstLineAddress: "Big house"
      secondLineAddress: "China road"
      city: "Beijing"
      postcode: "N15 6ED"
      country: "China"
    }
  ) {
    id
    firstLineAddress
    secondLineAddress
    city
    postcode
    country
  }
}

// edit-update address TOKEN NEEDED (ALSO HAS TO BE OWNER OF ADDRESS)
mutation {
  update_address(
    addressId: "a6585bad-d13b-443b-9f05-d8e033465585"
    address: {
      firstLineAddress: "Little House"
      secondLineAddress: "China Road"
      city: "Hong Kong"
      postcode: "N15 6ED"
      country: "China"
    }
  ) {
    id
    firstLineAddress
    secondLineAddress
    city
    postcode
    country
  }
}


-----------**TO BE DEPRECATED/MOVED TO ADMIN/BLOCKED**------------
**mutation {
  create_user(user: {email: "mm@gmail.com", password: "pass"}){
    id
    email
  }
}

**//get all users
{
  get_users {
    id
    email
  }
}

**//get a user by email and list items
{
  get_user_by_email(email:"tok@gmail.com") {
    id
    email
    item {
      id
      name
    }
  }
}

//Delete user -> Doesn't work at the moment, need to resolve a relationship issue

mutation {
  delete_user(userId: "14a73d3b-9cd4-4401-a54c-4db0a98e29c7")
}

//Create Category
mutation{
  create_category(name: "clothes"){
    name
  }
}

//Edit/Update Categories
mutation {
  update_category(id: "00272850-c43c-425a-91ad-48159f8ef000", name: "Man") {
    id
    name
  }
}

//Delete Category
mutation {
  delete_category(id: "00272850-c43c-425a-91ad-48159f8ef000")
}