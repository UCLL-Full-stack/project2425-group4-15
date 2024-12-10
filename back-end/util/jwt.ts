import Jwt from 'jsonwebtoken';

const generateJwtToken = ({ email }: { email: string }): string => {
    const options = {
        expiresIn: `${process.env.JWT_EXPIRATION}h`,
        issuer: 'CineScope',
    };

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT SECRET is not found.');
        }
        return Jwt.sign({ email }, process.env.JWT_SECRET, options);
    } catch (error) {
        console.error(error);
        throw new Error('Error generating JWT token');
    }
};

export default generateJwtToken;
