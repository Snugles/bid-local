module.exports = `extend type Query {
   get_info: String!
 }
 extend type Mutation {
   image_uploader(file: Upload!): String
 }`;