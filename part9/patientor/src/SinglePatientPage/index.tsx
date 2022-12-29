/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Patient } from '../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useStateValue } from '../state';

const SinglePatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }] = useStateValue();
  const patient = useMemo<Patient | undefined>(() => {
    return patients[id ?? -1];
  }, [patients]); 
  const genderIcon = patient?.gender === "male" ? MaleIcon : FemaleIcon;
  return (
    <div>
        <h3>patient.name {genderIcon}</h3>
        <p>ssn: {patient?.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
    </div>
  );
};

export default SinglePatientPage;