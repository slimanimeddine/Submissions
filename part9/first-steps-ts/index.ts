/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query?.height);
    const weight = Number(req.query?.weight);

    if (!height || !weight) {
        return res.json({
            error: "malformatted parameters"
        });
    }

    return res.json({
        weight,
        height,
        bmi: calculateBmi(height, weight)
    });
});

app.post('/exercises', (req, res) => {
    const {
        daily_exercises,
        target
    }: { daily_exercises: Array<number>, target: number} = req.body;

    if (target === undefined || daily_exercises === undefined) {
        return res.json({
            error: "parameters missing"
        });
    }

    if (target >= 0 && daily_exercises.every((h: number) => h >= 0)) {
        return res.json(calculateExercises(daily_exercises, target));
    } else {
        return res.status(400).json({
            error: "Malformed parameters",
        });
    }

});

const port = 3003;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});