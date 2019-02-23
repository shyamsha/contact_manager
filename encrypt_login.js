const bcrypt = require('bcryptjs')
const encrypted = '$2a$10$sCAlZ1uifOzbjZwUhkfaK.j7V6Bc4/Q1lk0VyAFtpkoDp2t1XGe9i'
const salt = '$2a$10$sCAlZ1uifOzbjZwUhkfaK.'
const loginpassword = 'sHyaM1'
bcrypt.compare(loginpassword, encrypted).then((res) => {
    console.log(res)
})
