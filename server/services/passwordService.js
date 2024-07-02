

import Password from '../models/Password.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const saltRounds = 10;

export const createPassword = async (userId, plainPassword, userType, session) => {
    let password = new Password({ userId, password: plainPassword, userType });
    if (session)
        return await password.save({ session })
    else
       return await password.save();
};

export const updatePassword = async (userId, newPlainPassword, session) => {
    console.log('password service update password');
    let password;
    if (session)
        password = await Password.findOneAndUpdate({ userId: userId }, { password: newPlainPassword }, { new: true, session });
    else
        password = await Password.findOneAndUpdate({ userId: userId }, { password: newPlainPassword }, { new: true });
    console.log('password saved: '+password);
        return password;
};

export const deletePassword = async (userId, session) => {
    if (session)
        return await Password.findOneAndDelete({ userId});
    else
        return await Password.findOneAndDelete({ userId });
};

export const verifyPassword = async (userId, plainPassword) => {
    const password = await Password.findOne({ userId });
    if (!password) throw new Error('Password not found');
    const match = await bcrypt.compare(plainPassword, password.hash);
    return match;
};
