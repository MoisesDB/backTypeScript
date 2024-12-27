import express, { Router } from "express";
import { deleteUser, getAllUsers, updateUser } from '../controllers/users'
import { isAuthenticated, isOwner } from "../middlewares/index";

export default (router: Router): void => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/user/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/user/:id', isAuthenticated, isOwner, updateUser);
};