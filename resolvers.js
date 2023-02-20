const bcrypt = require('bcrypt');

const User = require('./models/User');
const Employee = require('./models/Employee')

exports.resolvers = {
    Query: {

      async searchEmployeeByID(_, {ID}){
        return await Employee.findById(ID)
      },
      async getEmployees(){
        return await Employee.find({})
      },

      async login(_, {email, password}){
        const user = await User.findOne({email: email});
      //   if(!user || user.password !== password) {
      //       throw new Error("Invalid email or password");
      //   }
      //   return user; // return the authenticated user
      // }

      if(!user){
        throw new Error("User does not exist")
      }
      const validPassowrd = await bcrypt.compare(password, user.password)
      if(!validPassowrd){
        throw new Error("Invalid Password");
      }
      return user
    }
    },

    Mutation: {

        async createUser(_, {userInput: {username, email, password}}){
          const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username: username,
                email: email,
                password: hashedPassword
            });
            const res = await newUser.save()
            return {
                id: res.id,
                ...res._doc
            }
        },


      async createEmployee(_, {employeeInput: {firstname, lastname, email, gender, salary}}){
        const newEmployee = new Employee({
            firstname: firstname,
            lastname: lastname,
            email: email,
            gender: gender,
            salary: salary
        });

        const res = await newEmployee.save() // saves employee

        return {
            id: res.id,
            ...res._doc
        }
      },

      async deleteEmployee(_, {ID}){
        const deleted = (await Employee.deleteOne({_id: ID})).deletedCount // return 1 if deleted, 0 if not
        return  deleted;
      },

      async updateEmployee(_, {ID, employeeUpdate: {email, gender, salary} }){
        const edited = (await Employee.updateOne({_id: ID}, {email:email, gender: gender, salary: salary})).modifiedCount;
        return edited; // return 1 if edited, 0 if not
      }

        
    }
}