class EmailService {
    // TODO: send verification email to user
    // TODO: use this link https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
    async sendEmail(email: string, token: string) {
        return {
            message: 'User created successfully. Verification link sent to email.',
            // TODO: Return the token for testing purposes
            token: `${token}`
        };
    }
}

export default new EmailService();