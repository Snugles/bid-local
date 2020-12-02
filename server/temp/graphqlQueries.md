// For queries that require Ids please insert ones given by database.
// Here is some sample queries


//Create User
mutation {
  createUser (email:"tomum@gmail.com",password:"pass"){
    id
    email
  }
}
//get all users
{
  users {
    id
    email
  }
}

//get a user by email and list items
{
  user(email:"toms@gmail.com") {
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
  createItem(name: "wardrobe",minPrice:30,userId:"00041ef6-51d2-4db3-b939-bcda0b108b27"){
    name
    minPrice
    user{
      email
      id
    }
  }
}

// List all items
query {
  items{
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
  item(id:"1cb38768-682d-484e-af4d-dd2f9d0e482e"){
    name
    minPrice
    description
  }
}

//Delete an item
mutation {
  deleteItem(id:"13e6a396-7b98-4fb5-bcde-1a0d7d916781")
}

