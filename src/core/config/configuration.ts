import { get } from 'env-var';

export default (): Record<string, any> => ({
    node: {
        env: get('NODE_ENV').default('local').required().asString(),
        name: get('NODE_NAME').default('diginest').required().asString(),
        url: get('NODE_URL').default('http://localhost:3000').asUrlString(),
        debug: get('NODE_DEBUG').default('false').required().asBool(),
        port: get('NODE_PORT').default(3000).required().asPortNumber(),
        admin_mode: get('NODE_ADMIN_MODE').default('false').required().asBool(),
    },

    app: {
        basePath: get('BASE_PATH').default('/').required().asString(),
    },

    db: {
        driver: get('DB_DRIVER').default('mongodb').required().asString(),
        host: get('DB_HOST').default('mongo').required().asString(),
        port: get('DB_PORT').default(27017).required().asPortNumber(),
        name:  get('DB_NAME').default('diginest').required().asString(),
        user:  get('DB_USER').asString(),
        pass:  get('DB_PASS').asString(),
        auth:  get('DB_AUTH').asString(),
    },

    jwtUser: {
        secretKey: get('JWT_USER_SECRET').default('ba7nH{zBs$}6H4mu').required().asString(),
        options: {
            expiresIn: get('JWT_USER_EXPIRE').default('2h').required().asString(),
        },
    },

	jwtCustomer: {
        secretKey: get('JWT_CUSTOMER_SECRET').default('ba7nH{zBs$}6H4mu').required().asString(),
        options: {
            expiresIn: get('JWT_CUSTOMER_EXPIRE').default('2h').required().asString(),
        },
    },

    saltRounds: 10,

    mailer: {
        host: get('MAIL_HOST').asString(),
        port: get('MAIL_PORT').asPortNumber(),
        user: get('MAIL_USERNAME').asString(),
        pass: get('MAIL_PASSWORD').asString(),
        name: get('MAIL_NAME').asString(),
        verify_key: get('MAIL_KEY_VERIFY').asString(),
    },

    redis: {
        host: get('REDIS_HOST').default('redis').asString(),
        port: get('REDIS_PORT').default(6379).asPortNumber(),
        password: get('REDIS_PASSWORD').asString(),
    },

	twilio: {
		accountSid: get('TWILIO_ACCOUNT_SID').asString(),
		authToken: get('TWILIO_AUTH_TOKEN').asString(),
		from: get('TWILIO_PHONE_FROM').asString(),
        messagingServiceSid: get('TWILIO_MESSAGING_SERVICE_SID').asString()
	},

    domainFe: {
        host: get('NEXT_PUBLIC_BASE_URL').asString()
    },

    translation: {
        defaultLocale: 'en',
        fallbackLocale: 'en',
    }
});