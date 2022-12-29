const rangeFunc = (num: number, min: number, max: number): boolean => {
    if (num >= min && num <= max) return true;
    else return false; 
};

interface BMIValues {
    height: number,
    weight: number
}

const parseArgumentsBMI = (args: Array<string>): BMIValues => {
    if (args.length != 4) throw new Error('wrong amount of arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('provided values were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = height / Math.pow(weight, 2);
    if (bmi < 16.0) return 'Underweight (Severe thinness)';
    else if (rangeFunc(bmi, 16.0, 16.9)) return 'Underweight (Moderate thinness)';
    else if (rangeFunc(bmi, 17.0, 18.4)) return 'Underweight (Mild thinness)';
    else if (rangeFunc(bmi, 18.5, 24.9)) return 'Normal range';
    else if (rangeFunc(bmi, 25.0, 29.9)) return 'Overweight (Pre-obese)';
    else if (rangeFunc(bmi, 30.0, 34.9)) return 'Obese (Class I)';
    else if (rangeFunc(bmi, 35.0, 39.9)) return 'Obese (Class II)';
    else return 'Obese (Class III)';
};

try {
    const { height, weight } = parseArgumentsBMI(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'something bad happened';
    if (error instanceof Error) errorMessage += `Error: ${error.message}`;
    console.log(errorMessage);
}