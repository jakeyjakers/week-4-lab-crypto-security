const bcrypt = require('bcrypt')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username ) {
          const authenticated = bcrypt.compareSync(password, users[i].passwordHash)
          if(authenticated){
            let userToReturn = {...users[i]}
            delete userToReturn.passwordHash
            res.status(200).send(userToReturn)
          } else {
            res.status(200).send("User not found.")
          }
          
        }
    
      }
      
    },
    register: (req, res) => {
      const {email, password, username, firstName, lastName} = req.body
      saltRounds = 10
      const salt = bcrypt.genSaltSync(10)
      const passwordHash = bcrypt.hashSync(password, salt)
    

      let user = {
        username,
        email,
        firstName,
        lastName,
        passwordHash,
      }
      
      // bcrypt.hash(password, saltRounds, (err, passwordHash) =>{
      //   let newUserObj = {}
      //   newUserObj.username = username
      //   newUserObj.email = email
      //   newUserObj.passwordHash = passwordHash
      //   newUserObj.firstName = firstName
      //   newUserObj.lastName = lastName

        console.log('\nNew database entry')
      
        console.log('Registering User')
        console.log(user)
        users.push(user)
        let copyUser = {...user}
        delete copyUser.passwordHash
        res.status(200).send(copyUser) 
      
    }
}