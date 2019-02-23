// const tokens = require('jsonwebtoken')
// const data = 'syam'
//const encodeddata = tokens.sign(data, 'sHyaM@143')
//console.log(encodeddata)
let token = [{
    _id: '5c4ff4be3f47c0165441532a',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YzRmZjQ5ZjNmNDdjMDE2NTQ0MTUzMjkiLCJpYXQiOjE1NDg3NDM4NzB9.yst_wnOnVQmAOExflAAFXvMgxHZ2BBdoeCJV0BLV64Q"
}, {}]
const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YzRmZjQ5ZjNmNDdjMDE2NTQ0MTUzMjkiLCJpYXQiOjE1NDg3NDM4NzB9.yst_wnOnVQmAOExflAAFXvMgxHZ2BBdoeCJV0BLV64Q"
for (let i = 0; i < token.length; i++) {
    const obj = token[i]
    if (token1 == token[i].token) {
        const remove = token.splice(token[i], 1)
        // console.log(remove)
        console.log(token);

    }
    //console.log(obj)
}
let arr = [1, 2, 3, 4]
arr.splice(0, 1)
