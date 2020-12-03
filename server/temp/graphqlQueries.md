// For queries that require Ids please insert ones given by database.
// Here is some sample queries


//Create User
mutation {
  create_user (email:"tok@gmail.com",password:"pass"){
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

//Create an item
mutation {
  create_item(
    name: "wardrobe",
    minPrice:30,
    userId:"14a73d3b-9cd4-4401-a54c-4db0a98e29c7",
  ){
    name
    minPrice
    user{
      email
      id
    }
  }

// List all items
query {
  get_items{
    id
    name
    minPrice
    description
    user {
      email
    }
  }
}

// Get item by Id (Insert the correct id given from database)
query{
  get_item_by_Id(id:"bb222ce4-57ab-4bea-bbca-27326fc077fe"){
    id
    name
    minPrice
    description
  }
}

//Delete an item
mutation {
  delete_item_by_id(id:"13e6a396-7b98-4fb5-bcde-1a0d7d916781")
}

//Create Category
mutation{
  create_category(name: "clothes"){
    name
  }
}

//List all categories
query {
  categories{
    id
    name
  }
}

//Create Address
mutation {
  create_address(
    firstLineAddress:"Bickleigh house",
    secondLineAddress:"Tiverton road",
    city: "London",
    postcode:"N15 6ED",
    country:"UK",
    userId:"41954578-486e-438e-9285-ea456eb819a4")
    {
      city
      postcode
      country
    }
}

// edit-update address
mutation {
  update_address(
    addressId:"5684e2a0-c447-4f91-9359-fefe694c832a",
    address:{
      firstLineAddress:"Manor house",
    	secondLineAddress:"Riverun road",
    	city: "Paris",
    	postcode:"N15 6ED",
    	country:"France",
    }
    ){
    id
    firstLineAddress
    secondLineAddress
    city
    postcode
    country
  }
}

