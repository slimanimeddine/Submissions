interface result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: string,
    target: number,
    average: number
}

interface Values {
    value0: Array<number>,
    value1: number,
}

const ratingDescriptions = [
    "Need more exercise to reach the target",
    "Not too bad but could be better",
    "Well done! you reached the target"
];

const parseArgumentsEC = (args: Array<string>): Values => {
    const newArr = args.slice(2, args.length - 2);
    if (newArr.every(e => !isNaN(Number(e)))) {
        return {
            value0: newArr.map(e => Number(e)),
            value1: Number(args[args.length - 1])
        };
    } else {
        throw new Error('provided values were not numbers!');
    }
};

export const calculateExercises = (arr: Array<number>, target: number): result => {
    const average = arr.reduce((a: number, b: number) => a + b, 0) / arr.length;
    const trainingDays = arr.length - arr.filter(n => n === 0).length;
    const rating = average >= target ? 3 : average <= target * 0.75 ? 1 : 2;
    return {
        periodLength: arr.length,
        trainingDays,
        target,
        average,
        success: average === target,
        rating,
        ratingDescription: ratingDescriptions[rating - 1]
    };
};

try {
    const { value0, value1 } = parseArgumentsEC(process.argv);
    console.log(calculateExercises(value0, value1));
} catch (error: unknown) {
    let errorMessage = 'something bad happened';
    if (error instanceof Error) errorMessage += `Error: ${error.message}`;
    console.log(errorMessage);
}