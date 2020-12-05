// For queries that require Ids please insert ones given by database.
// Here is some sample queries

-----------------**USERS**---------------------
//Create User
mutation {
  create_user(user: {email: "mm@gmail.com", password: "pass"}){
    id
    email
  }
}

//get all users
{
  get_users {
    id
    email
  }
}

//get a user by email and list items
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

{
  get_user_by_Id(id:"019b2553-cea3-4380-ba84-c4a163d6c1e6") {
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

// Edit/Update user
mutation {
  update_user (
    userId:"14a73d3b-9cd4-4401-a54c-4db0a98e29c7",
    user:{email: "haha@gmail.com", password: "pass"})
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
//Delete user -> Doesn't work at the moment, need to resolve a relationship issue

mutation {
  delete_user(userId: "14a73d3b-9cd4-4401-a54c-4db0a98e29c7")
}

--------------------------**ITEMS**-----------------------------------
//Create an item
mutation {
  create_item(
    userId: "41954578-486e-438e-9285-ea456eb819a4"
    item: { name: "monkey", minPrice: 30 }
  ) {
    name
    minPrice
    user {
      email
      id
    }
  }
}

// List all items
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

//Update/Edit Item
mutation {
  update_item (itemId:"25f69313-7860-47b3-b850-54f9e7e000de",item: {
      name: "car"
      minPrice: 30
  }) {
    id
    name
    minPrice
    description
    picUrl1
    picUrl2
    picUrl3
    user{
      id
      email
      password
    }
  }
}

//Delete an item
mutation {
  delete_item_by_id(id:"13e6a396-7b98-4fb5-bcde-1a0d7d916781")
}

-------------------------**CATEGORIES**------------------------------

//Create Category
mutation{
  create_category(name: "clothes"){
    name
  }
}

//List all categories
query {
  get_categories{
    id
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

-----------------------**ADDRESSES**--------------------------

//Create Address
mutation {
  create_address(
    userId: "41954578-486e-438e-9285-ea456eb819a4"
    address: {
      firstLineAddress: "Big house"
      secondLineAddress: "China road"
      city: "Beijing"
      postcode: "N15 6ED"
      country: "China"
    }
  ) {
    firstLineAddress
    secondLineAddress
    city
    postcode
    country
  }
}

// edit-update address
mutation {
  update_address(
    addressId: "1b2502a2-3ae6-42b6-81ee-ef93d814c8d6"
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

