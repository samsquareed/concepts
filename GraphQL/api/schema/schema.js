const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema} = graphql
const _ = require('lodash')

const books = [
    {name : "Mahabharata secret", id : "18"},
    {name : "Domain of death", id : "19"},
    {name : "9 unknowns", id : "20"},
]

const authors = [
    {name : "Austen",age : 56, id : "1"},
    {name : "Bronte",age : 65, id : "2"},
    {name : "Lewis", age : 44,id : "3"},
]

const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields : ()=>({
        id : {type : GraphQLString},
        name : {type : GraphQLString},
        age : {type : GraphQLInt}
    })
})

const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : ()=>({
        id : {type : GraphQLString},
        name : {type : GraphQLString},
        genre : {type : GraphQLString}
    })
})


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType,
            args : {id : {type : GraphQLString}},
            resolve(parent, args){
                return _.find(books,{id : args.id})
            }
        },
        author : {
            type : AuthorType,
            args : {id : {type : GraphQLString}},
            resolve(parent, args){ 
                return _.find(authors, {id : args.id})
             }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery
})