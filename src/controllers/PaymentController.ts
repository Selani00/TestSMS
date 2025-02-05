import express from "express";
import {CustomResponse} from "../utils/CustomResponse";
import {StatusCodes} from "../utils/StatusCodes";
import {ClientServiceImpl} from "../services/impl/AccountServiceImpl";

const clientService = new ClientServiceImpl();

