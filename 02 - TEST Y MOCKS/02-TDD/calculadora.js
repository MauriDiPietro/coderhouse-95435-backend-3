class Calculadora {
  checkValores(num1, num2) {
    const ver1 = isNaN(num1);
    const ver2 = isNaN(num2);

    if (ver1 || ver2) return true;
    return false;
  }

  suma(num1, num2) {
    if(this.checkValores(num1, num2)) throw new Error('Argumentos invalidos')
    return num1 + num2;
  }
}

export const calculadora = new Calculadora();
