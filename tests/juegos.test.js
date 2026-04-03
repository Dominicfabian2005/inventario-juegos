import { crearDriver, tomarCaptura, login, By, until } from './helper.js';

async function clickAgregar(driver) {
  await driver.sleep(2000);
  await driver.executeScript("document.getElementById('btn-agregar').click()");
  await driver.sleep(3000);
}

async function escribirEnInput(driver, nombre, valor) {
  await driver.executeScript(
    `var input = document.querySelector('input[name="${nombre}"]');
     var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
     nativeInputValueSetter.call(input, '${valor}');
     input.dispatchEvent(new Event('input', { bubbles: true }));`
  );
  await driver.sleep(500);
}

async function buscarJuego(driver, valor) {
  await driver.executeScript(`
    var input = document.getElementById('buscador');
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(input, '${valor}');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  `);
  await driver.sleep(2000);
}

describe('HU-02: Agregar juego', function () {
  this.timeout(60000);

  it('Camino feliz: agregar juego con datos completos', async function () {
    const driver = await crearDriver();
    try {
      await login(driver);
      await clickAgregar(driver);
      await escribirEnInput(driver, 'nombre', 'Juego Selenium');
      const selects = await driver.findElements(By.css('select'));
      await selects[0].findElement(By.css('option[value="PS5"]')).click();
      await driver.sleep(500);
      await selects[1].findElement(By.css('option[value="Acción"]')).click();
      await driver.sleep(500);
      await escribirEnInput(driver, 'anio', '2024');
      await selects[2].findElement(By.css('option[value="Disponible"]')).click();
      await driver.sleep(1000);
      await tomarCaptura(driver, 'agregar_juego_formulario');
      await driver.executeScript("document.getElementById('btn-enviar').click()");
      await driver.wait(until.alertIsPresent(), 5000);
      await driver.switchTo().alert().accept();
      await driver.sleep(1500);
      await tomarCaptura(driver, 'agregar_juego_exito');
    } finally {
      await driver.quit();
    }
  });

  it('Prueba negativa: agregar juego sin nombre', async function () {
    const driver = await crearDriver();
    try {
      await login(driver);
      await clickAgregar(driver);
      await tomarCaptura(driver, 'agregar_juego_sin_nombre');
      await driver.executeScript("document.getElementById('btn-enviar').click()");
      await driver.wait(until.alertIsPresent(), 5000);
      await driver.sleep(1000);
      await driver.switchTo().alert().accept();
      await driver.sleep(1000);
    } finally {
      await driver.quit();
    }
  });

  it('Prueba de límites: nombre con 1 solo carácter', async function () {
    const driver = await crearDriver();
    try {
      await login(driver);
      await clickAgregar(driver);
      await escribirEnInput(driver, 'nombre', 'A');
      await driver.sleep(1000);
      await tomarCaptura(driver, 'agregar_juego_nombre_limite');
      await driver.executeScript("document.getElementById('btn-enviar').click()");
      await driver.wait(until.alertIsPresent(), 5000);
      await driver.sleep(1000);
      await driver.switchTo().alert().accept();
      await driver.sleep(1000);
    } finally {
      await driver.quit();
    }
  });
});

describe('HU-03: Buscar juego', function () {
  this.timeout(60000);

  it('Camino feliz: buscar juego existente', async function () {
    const driver = await crearDriver();
    try {
      await login(driver);
      await driver.wait(until.elementLocated(By.id('buscador')), 5000);
      await driver.sleep(2000);
      await buscarJuego(driver, 'minecraft');
      await tomarCaptura(driver, 'buscar_juego_existente');
      const filas = await driver.findElements(By.css('#tabla-juegos tbody tr'));
      if (filas.length === 0) throw new Error('No se encontraron resultados');
      await driver.sleep(1000);
    } finally {
      await driver.quit();
    }
  });

  it('Prueba negativa: buscar juego inexistente', async function () {
    const driver = await crearDriver();
    try {
      await login(driver);
      await driver.wait(until.elementLocated(By.id('buscador')), 5000);
      await driver.sleep(1500);
      await buscarJuego(driver, 'zzzzzzzzzzz');
      await tomarCaptura(driver, 'buscar_juego_inexistente');
      const filas = await driver.findElements(By.css('#tabla-juegos tbody tr'));
      if (filas.length > 0) throw new Error('Debería estar vacío');
      await driver.sleep(1000);
    } finally {
      await driver.quit();
    }
  });

  it('Prueba de límites: buscar con un solo carácter', async function () {
    const driver = await crearDriver();
    try {
      await login(driver);
      await driver.wait(until.elementLocated(By.id('buscador')), 5000);
      await driver.sleep(1500);
      await buscarJuego(driver, 'm');
      await tomarCaptura(driver, 'buscar_juego_un_caracter');
      await driver.sleep(1000);
    } finally {
      await driver.quit();
    }
  });
});

describe('HU-04: Editar juego', function () {
  this.timeout(60000);

  it('Camino feliz: editar nombre de juego', async function () {
    const driver = await crearDriver();
    try {
      await login(driver);
      await driver.sleep(1500);
      await driver.findElement(By.css('.btn-editar')).click();
      await driver.sleep(1000);
      await driver.executeScript(`
        var input = document.querySelector('input.input-inline[name="nombre"]');
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(input, 'Juego Editado');
        input.dispatchEvent(new Event('input', { bubbles: true }));
      `);
      await driver.sleep(1000);
      await tomarCaptura(driver, 'editar_juego_formulario');
      await driver.findElement(By.css('.btn-editar')).click();
      await driver.sleep(1500);
      await tomarCaptura(driver, 'editar_juego_exito');
    } finally {
      await driver.quit();
    }
  });

  it('Prueba negativa: cancelar edición', async function () {
    const driver = await crearDriver();
    try {
      await login(driver);
      await driver.sleep(1500);
      await driver.findElement(By.css('.btn-editar')).click();
      await driver.sleep(1000);
      await tomarCaptura(driver, 'editar_juego_cancelar');
      await driver.findElement(By.css('.btn-eliminar')).click();
      await driver.sleep(1500);
      await tomarCaptura(driver, 'editar_juego_cancelado');
    } finally {
      await driver.quit();
    }
  });

  it('Prueba de límites: editar con nombre vacío', async function () {
    const driver = await crearDriver();
    try {
      await login(driver);
      await driver.sleep(1500);
      await driver.findElement(By.css('.btn-editar')).click();
      await driver.sleep(1000);
      await driver.executeScript(`
        var input = document.querySelector('input.input-inline[name="nombre"]');
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(input, '');
        input.dispatchEvent(new Event('input', { bubbles: true }));
      `);
      await driver.sleep(1000);
      await tomarCaptura(driver, 'editar_juego_nombre_vacio');
      await driver.findElement(By.css('.btn-editar')).click();
      await driver.sleep(1500);
      await tomarCaptura(driver, 'editar_juego_nombre_vacio_resultado');
    } finally {
      await driver.quit();
    }
  });
});

describe('HU-05: Eliminar juego', function () {
  this.timeout(60000);

  it('Camino feliz: eliminar juego confirmando', async function () {
    const driver = await crearDriver();
    try {
      await login(driver);
      await driver.sleep(1500);
      const filaAntes = await driver.findElements(By.css('#tabla-juegos tbody tr'));
      const cantAntes = filaAntes.length;
      await driver.findElement(By.css('.btn-eliminar')).click();
      await driver.wait(until.alertIsPresent(), 3000);
      await driver.switchTo().alert().accept();
      await driver.sleep(1500);
      await tomarCaptura(driver, 'eliminar_juego_exito');
      const filaDespues = await driver.findElements(By.css('#tabla-juegos tbody tr'));
      if (filaDespues.length >= cantAntes) throw new Error('El juego no fue eliminado');
    } finally {
      await driver.quit();
    }
  });

  it('Prueba negativa: cancelar eliminación', async function () {
    const driver = await crearDriver();
    try {
      await login(driver);
      await driver.sleep(1500);
      const filaAntes = await driver.findElements(By.css('#tabla-juegos tbody tr'));
      const cantAntes = filaAntes.length;
      await driver.findElement(By.css('.btn-eliminar')).click();
      await driver.wait(until.alertIsPresent(), 3000);
      await driver.switchTo().alert().dismiss();
      await driver.sleep(1500);
      await tomarCaptura(driver, 'cancelar_eliminar');
      const filaDespues = await driver.findElements(By.css('#tabla-juegos tbody tr'));
      if (filaDespues.length !== cantAntes) throw new Error('El juego fue eliminado');
    } finally {
      await driver.quit();
    }
  });
});