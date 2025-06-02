
const crypto = require("crypto");

const hashGenerator = (data)=>{
const stringData = JSON.stringify(data);
const  hash = crypto.createHash("sha256").update(stringData).digest("hex");

return hash;
}

module.exports = hashGenerator;