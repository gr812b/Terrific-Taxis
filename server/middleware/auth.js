import jwt from 'jsonwebtoken'
//want to edit profile or something, must be signed to do so
//jwt secret is "test"

const auth = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        let decodedData;
        decodedData = jwt.verify(token, 'test');
        req.userId = decodedData?.id
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json("must be logged in");
    }
}

export default auth