/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";

const router = express.Router();

import patientsService from "../services/patientsService";
import toNewPatientEntry from "../utils";

router.get('/', (_req, res) => {
    res.send(patientsService.getEntries());
});

router.get('/:id', (req, res) => {
    res.send(patientsService.getEntry(req.params.id));
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error:any) {
        res.status(400).send(error.message);
    }
});

export default router;