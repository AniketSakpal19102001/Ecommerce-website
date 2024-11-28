import jwt from "jsonwebtoken";
import config from "../config/config.js";

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token)
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const user = await new Promise((resolve, reject) => {
            jwt.verify(token, config.jwtSecret, (err, user) => {
                if (err) {
                    return reject(err);
                }
                resolve(user);
            });
        });

        req.user = user;
        next();
    } catch (err) {
        res.sendStatus(403);
    }
};

export default verifyToken;


// import jwt from "jsonwebtoken";
// import config from "../config/config.js";
// const  verifyToken = (req, res, next)=>{
//     const token = req.cookies.token;
    
//     if (!token) {
//         res.status(401)
//     }else{
//         jwt.verify(token, config.jwtSecret, (err, user)=>{
//             if (err) {
//                 res.sendStatus(403);
//             }else{
//                 req.user = user;
                
//                 next();
//             }
//         })
//     }
// }
// export default verifyToken;