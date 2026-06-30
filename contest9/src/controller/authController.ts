import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { SignupSchema, SigninSchema } from "../types";
import { prisma } from "../db";
import bcrypt from "bcrypt";

async function signup(req: Request, res: Response) {
    const parsedData = SignupSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ message: "Incorrect inputs" });
    }
    const data = parsedData.data;

    if (!data) {
        return res.status(400).json({ message: "Incorrect inputs" });
    }

    const existingUser = await prisma.user.findFirst({
        where: { username: data.username }
    });

    if (existingUser) {
        return res.status(401).json({ message: "User with this username already exists" });
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
        data: {
            username: data.username,
            password: hashedPassword,
            role: data.role
        }
    });

    const token = jwt.sign(
        {
            userId: newUser.id,
            username: newUser.username,
            role: newUser.role
        },
        process.env.JWT_SECRET as string
    );

    res.status(201).json({
        message: `${data.username} signed up as a ${data.role}`,
        token: token
    });
}

async function signin(req: Request, res: Response) {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ message: "Incorrect inputs" });
    }
    const data = parsedData.data;

    if (!data) {
        return res.status(411).json({ message: "Incorrect inputs" });
    }

    const user = await prisma.user.findFirst({
        where: { username: data.username }
    });
    if (!user) {
        return res.status(403).json({ message: "Incorrect credentials" });
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
        return res.status(403).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign(
        {
            userId: user.id,
            username: user.username,
            role: user.role
        },
        process.env.JWT_SECRET as string
    );
    res.json({ token })
}

export default {
    signup,
    signin
};
