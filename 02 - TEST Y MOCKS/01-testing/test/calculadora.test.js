// node --test
// .test .spec

import test from 'node:test'
import assert from 'node:assert'

import { calculadora } from '../calculadora.js'

test('Conjunto de pruebas de suma', async(t)=>{
    await t.test('Deberia sumar correctamente 2 números', ()=>{
        const num1 = 4;
        const num2 = 8;
        const resultadoEsperado = 12;

        const resultado = calculadora.suma(num1, num2);

        assert.deepStrictEqual(resultado, resultadoEsperado, 'El resultado no es el esperado')

        assert.notDeepStrictEqual(num1 + num2, 0, 'La suma no debería ser 0')
        assert.ok(resultado > 11, 'El resultado no es mayor a 11')
        assert.ok(resultado >= 12, 'El resultado deberia ser mayor o igual a 12')
    })

   await t.test('Si se intenta sumar algún argumento no numerico, deberia responder con un error', ()=>{
       const arg1 = 4;     
       const arg2 = ['hola']

       assert.throws(
        () => calculadora.suma(arg1, arg2),
        new Error('Argumentos invalidos'),
        'Debería lanzar un error por argumentos invalidos'
       )
    })
})


test('conjunto de pruebas resta', async(t)=>{
    await t.test('deberia restar correctamente 2 numeros', ()=>{
        const num1 = 8;
        const num2 = 4;
        const resultadoEsperado = 4;
        const resultado = calculadora.resta(num1, num2)
        assert.deepStrictEqual(resultado, resultadoEsperado, 'El resultado no es el esperado')
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