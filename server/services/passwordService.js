

import Password from '../models/Password.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const createPassword = async (userId, plainPassword, userType, session) => {
    let password = new Password({ userId, password: plainPassword, userType: userType });
    if (session)
        password = await password.save({ session })
    else
        password = await password.save();
    return password;
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
    let password;
    if (session)
        password = await Password.findOneAndDelete({ userId }).session({session})
    else
        password = await Password.findOneAndDelete({ userId });
    return password;
};

export const verifyPassword = async (userId, plainPassword) => {
    const password = await Password.findOne({ userId });
    if (!password) throw new Error('Password not found');
    const match = await bcrypt.compare(plainPassword, password.hash);
    return match;
};
