/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsEntries from "../data/patients";

import { NewPatientEntry, nonSensitivePatientInfo, Patient } from "../types";
import { v1 as uuid } from 'uuid';
const id = uuid();

const getEntries = ():nonSensitivePatientInfo[] => {
    return patientsEntries.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getEntry = (id: string): Patient | undefined => {
    return patientsEntries.find(p => p.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id,
        ...entry
    };

    patientsEntries.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addPatient,
    getEntry
};