import { login, register } from "../controllers/authentication";
import express, { Router } from "express";

export default (router: Router): void => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
};