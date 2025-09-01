import test from 'node:test'
import assert from 'node:assert'
import { calculadora } from './calculadora.js';

test('conjunto de pruebas suma', async(t)=>{
    t.test('deberia sumar correctamente dos numeros', ()=>{
        const num1 = 10;
        const num2 = 5;
        const resultadoEsperado = 15;

        const resultado = calculadora.suma(num1, num2);

        assert.strictEqual(resultado, resultadoEsperado)
    })
})

test('conjunto de pruebas de metodo checkValores', async(t)=>{
    await t.test('Debería retornar false si los argumentos son numericos', ()=>{
        const resultado = calculadora.checkValores(4, 8)
        assert.strictEqual(resultado, false)
    })

    await t.test('Debería retornar true si los argumentos no son numericos', ()=>{
        const resultado = calculadora.checkValores('hola', 'mundo')
        assert.strictEqual(resultado, true)
    })
})