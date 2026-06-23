const z = require("zod");

const SignupSchema = z.object({
    username: z.string(),
    password: z.string().min(6)
})

const SigninSchema = z.object({
    username: z.string(),
    password: z.string().min(6)
})

module.exports = {
    SignupSchema,
    SigninSchema
}