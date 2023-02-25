const mongoose = require("mongoose");

const connectDB = async ()=>{
    try {
        mongoose.set("strictQuery", false);
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected : ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;

//utiliser ce code pour la connexion a la base de donnée et au serveur dans le fichier server.js


// const startServer = async ()=>{
//     try {
//         await connectDB();
//         app.listen(PORT, ()=>{
//             console.log(`Server running on ${PORT}`);
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

// startServer();