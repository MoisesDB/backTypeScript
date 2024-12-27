import express from "express";
import {get, merge} from 'lodash'
import { getUserBySessionToken } from "../db/users";

export const isAuthenticated = async(req: any, res: any, next: any) => {
    try {
        const sessionsToken = req.cookies['BAH-AUTH'];

        if(!sessionsToken) {
            console.log('token nao achado');
            
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionsToken);

        if(!existingUser) {
            console.log('session token', sessionsToken);
            console.log('usuario nn existe', existingUser);
            return res.sendStatus(403);
        }

        merge(req, {identify: existingUser});

        return next()
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
}

export const isOwner = async(req: any, res: any, next: any) => {
    try {
        const { id } = req.params
        const currentUserId = get(req, 'identify._id') as string

        if(!currentUserId) {
            console.log('nao é o id', id)
            return res.sendStatus(403);
        }

        if(currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
}