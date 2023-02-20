const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
    type Employee{
        firstname: String!
        lastname: String!
        email: String!
        gender: String!
        salary: Float!
    }

    type User{
        username: String!
        email: String!
        password: String!
    }

    input UserInput{
        username: String!
        email: String!
        password: String!
    }

    input EmployeeInput{
        firstname: String!
        lastname: String!
        email: String!
        gender: String!
        salary: Float!
    }

    input EmployeeUpdate{
        firstname: String
        lastname: String
        email: String
        gender: String
        salary: Float
    }

    type Query{
        login(email: String!, password: String!) : User!
        searchEmployeeByID(ID: ID!) : Employee!
        getEmployees: [Employee]
    }

    type Mutation {
        createUser(userInput: UserInput) : User!
        createEmployee(employeeInput: EmployeeInput): Employee!
        deleteEmployee(ID: ID!): Boolean
        updateEmployee(ID: ID!, employeeUpdate: EmployeeUpdate) : Boolean
    }

    
    
`