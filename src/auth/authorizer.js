const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
    try {
        const token = event.authorizationToken.split(" ")[1];

        if (!token) {
            console.log("could not find a token on the event");
            return {
                statusCode: 403,
                body: JSON.stringify({
                    message: "could not find a token on the event",
                }),
            };
        }
        if (!jwt.verify(token, process.env.JWS_TOKEN))
            return {
                statusCode: 403,
                body: JSON.stringify({
                    message: "token invalido",
                }),
            };

        const { userId } = jwt.decode(token);

        return generatePolicy({
            userId,
            context: { userId },
            effect: "Allow",
            resource: event.methodArn.split("/", 2).join("/") + "/*",
        });
    } catch (error) {
        console.log("error ", error);
        return {
            statusCode: 403,
            body: JSON.stringify({
                message: "token invalido",
            }),
        };
    }
};

const generatePolicy = ({ userId, effect, resource, context }) => {
    const policy = {
        principalId: userId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
        context,
    };
    return policy;
};
