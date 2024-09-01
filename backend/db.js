const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://mehtatanay04:tanaymehta15@synapse.wwdu1cz.mongodb.net/passkey"


const connectToMongo = () => {
    mongoose.connect(mongoURI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});
}

module.exports = connectToMongo;