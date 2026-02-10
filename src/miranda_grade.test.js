const { calcWeightedGrade, percentile } = require('./miranda_grade');

describe('calcWeightedGrade', () => {
    test('calcula la nota ponderada correctamente', () => {
        const items = [
            { score: 80, weight: 0.3 },
            { score: 90, weight: 0.5 },
            { score: 70, weight: 0.2 }
        ];
        expect(calcWeightedGrade(items)).toBe(83);
    });

    test('lanza TypeError si items no es un arreglo', () => {
        expect(() => calcWeightedGrade('no es arreglo')).toThrow(TypeError);
    });

    test('lanza TypeError si score no es número', () => {
        expect(() => calcWeightedGrade([{ score: '80', weight: 0.5 }, { score: 90, weight: 0.5 }]))
            .toThrow(TypeError);
    });

    test('lanza RangeError si suma de weights no es 1', () => {
        expect(() => calcWeightedGrade([{ score: 80, weight: 0.5 }, { score: 90, weight: 0.3 }]))
            .toThrow(RangeError);
    });
});

describe('percentile', () => {
    test('calcula el percentil correctamente', () => {
        const values = [10, 20, 30, 40, 50];
        expect(percentile(50, values)).toBe(30);
    });

    test('retorna el valor mínimo cuando p=0', () => {
        const values = [10, 20, 30, 40, 50];
        expect(percentile(0, values)).toBe(10);
    });

    test('retorna el valor máximo cuando p=100', () => {
        const values = [10, 20, 30, 40, 50];
        expect(percentile(100, values)).toBe(50);
    });

    test('lanza TypeError si p no es número', () => {
        expect(() => percentile('50', [10, 20, 30])).toThrow(TypeError);
    });

    test('lanza TypeError si values no es arreglo', () => {
        expect(() => percentile(50, 'no es arreglo')).toThrow(TypeError);
    });

    test('lanza RangeError si p está fuera de rango', () => {
        expect(() => percentile(150, [10, 20, 30])).toThrow(RangeError);
    });
});
