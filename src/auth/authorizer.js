const jwt = require("jsonwebtoken");

exports.handler = async event => {
    try {
        const token = event.authorizationToken.split(" ")[1]
        if (!token) {
            console.log('could not find a token on the event');
            return generatePolicy({ allow: false });
        }

        if(!jwt.verify(token, process.env.JWS_TOKEN)) return "necessário fzr login"
        
        if (token.expiryDate && token.expiryDate < Date.now()) {
            console.log('after expiry date');
            return generatePolicy({ allow: false });
        }
        const policy = generatePolicy({ allow: true });
        console.log("POLICY: ", policy)
        return policy 
    } catch (error) {
        console.log('error ', error);
        return generatePolicy({ allow: false });
    }
};

const generatePolicy = ({ allow }) => {
    return {
        principalId: 'token',
        policyDocument: {
            Version: '2012-10-17',
            Statement: {
                Action: 'execute-api:Invoke',
                Effect: allow ? 'Allow' : 'Deny',
                Resource: '*',
            },
        },
    };
};
