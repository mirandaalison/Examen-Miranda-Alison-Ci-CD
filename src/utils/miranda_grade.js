
function calcWeightedGrade(items) {
  
    if (!Array.isArray(items)) {
        throw new TypeError('items debe ser un arreglo');
    }



    //valdidacion rangos
    for (const item of items) {
        if (typeof item.score !== 'number' || typeof item.weight !== 'number') {
        throw new TypeError('ingrese valro numerico');
        }

        if (item.score < 0 || item.score > 100) {
        throw new RangeError('rengo valido de 0 a 100');
        }

        if (item.weight < 0 || item.weight > 1) {
        throw new RangeError('rengo valido de 0 a 1');
        }
    }



    //suma pesos 
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    if (Math.abs(totalWeight - 1) > 0.001) {
        throw new RangeError('suma de pesos debe ser 1');
    }

    //nota ponderada
    const weightedSum = items.reduce((sum, item) => sum + item.score * item.weight, 0);
    return Number(weightedSum.toFixed(2));
    }






    //alcular percentil
    function percentile(p, values) {
    

    if (typeof p !== 'number') {
        throw new TypeError('ingrese un numero en p');
    }
    if (!Array.isArray(values) || values.length === 0) {
        throw new TypeError('ingrese valores para el arreglo');
    }
    if (!values.every(val => typeof val === 'number')) {
        throw new TypeError('los valores deben ser numeros');
    }

    

    if (p < 0 || p > 100) {
        throw new RangeError('renago de p de 0 a 100');
    }

    //bordes
    if (p === 0) {
        return Number(Math.min(...values).toFixed(2));
    }
    if (p === 100) {
        return Number(Math.max(...values).toFixed(2));
    }

    //ascendente
    const sorted = [...values].sort((a, b) => a - b);
    const n = sorted.length;
    const rank = Math.ceil((p / 100) * n);
    return Number(sorted[rank - 1].toFixed(2));
    }

module.exports = { calcWeightedGrade, percentile };