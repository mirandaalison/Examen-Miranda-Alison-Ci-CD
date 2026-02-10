// Función para calcular la nota final ponderada
function calcWeightedGrade(items) {
  // Validar que items es un arreglo
    if (!Array.isArray(items)) {
        throw new TypeError('items debe ser un arreglo');
    }

    // Validar que cada item tiene score y weight numéricos
    for (const item of items) {
        if (typeof item.score !== 'number' || typeof item.weight !== 'number') {
        throw new TypeError('score y weight deben ser números');
        }
        // Validar rangos
        if (item.score < 0 || item.score > 100) {
        throw new RangeError('score debe estar entre 0 y 100');
        }
        if (item.weight < 0 || item.weight > 1) {
        throw new RangeError('weight debe estar entre 0 y 1');
        }
    }

    // Validar suma de weights (tolerancia ±0.001)
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    if (Math.abs(totalWeight - 1) > 0.001) {
        throw new RangeError('La suma de los weights debe ser 1 (±0.001)');
    }

    // Calcular nota ponderada
    const weightedSum = items.reduce((sum, item) => sum + item.score * item.weight, 0);
    return Number(weightedSum.toFixed(2));
    }

    // Función para calcular el percentil (método nearest-rank)
    function percentile(p, values) {
    // Validar tipos
    if (typeof p !== 'number') {
        throw new TypeError('p debe ser un número');
    }
    if (!Array.isArray(values) || values.length === 0) {
        throw new TypeError('values debe ser un arreglo no vacío');
    }
    if (!values.every(val => typeof val === 'number')) {
        throw new TypeError('todos los valores deben ser números');
    }

    // Validar rangos
    if (p < 0 || p > 100) {
        throw new RangeError('p debe estar entre 0 y 100');
    }

    // Casos de borde
    if (p === 0) {
        return Number(Math.min(...values).toFixed(2));
    }
    if (p === 100) {
        return Number(Math.max(...values).toFixed(2));
    }

    // Ordenar valores ascendentemente
    const sorted = [...values].sort((a, b) => a - b);
    const n = sorted.length;
    // Calcular rango nearest-rank (indexación 1..N)
    const rank = Math.ceil((p / 100) * n);
    // Devolver valor en la posición rank-1 (ajustado para indexación 0..N-1)
    return Number(sorted[rank - 1].toFixed(2));
    }

module.exports = { calcWeightedGrade, percentile };