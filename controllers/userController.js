const { User } = require('../models')
const { comparePassword } = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")

class UserController {

    static async register(req, res) {
        try {
            const {
                username,
                email,
                password
            } = req.body

            const data = await User.create({
                username,
                email,
                password
            })

            const response = {
                id: data.id,
                username: data.username,
                email: data.email
            }
            res.status(200).send(response)
        } catch (error) {
            res.status(error?.code || 500).json(error)
            // console.log(error)
        }
    }
    static async login(req, res) {
        try {
          const {
            email,
            password
          } = req.body
    
          const user = await User.findOne({
            where: {
              email: email
            }
          })
    
          if (!user) {
            throw {
              code: 404,
              message: "User not found"
            }
          }

          const isCorrect = comparePassword(password, user.password)
    
          if (!isCorrect) {
            throw {
              code: 401,
              message: "Incorrect password"
            }
          }
    
          const response = {
            id: user.id,
            email: user.email,
            username: user.username
          }
    
            const token = generateToken(response)
            console.log(token,'<< token')
    
          res.status(200).json(response)
    
        } catch (error) {
            res.status(error?.code || 500).json(error)
            console.log(error)
          
        }
      }
}
module.exports = UserController