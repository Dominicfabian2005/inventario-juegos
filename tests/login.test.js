import { crearDriver, tomarCaptura, By, until } from './helper.js';

const URL = 'http://localhost:5173';

describe('HU-01: Login de usuario', function () {
  this.timeout(30000);

  it('Camino feliz: login con credenciales correctas', async function () {
    const driver = await crearDriver();
    try {
      await driver.get(URL);
      await driver.findElement(By.id('input-username')).sendKeys('admin');
      await driver.findElement(By.id('input-password')).sendKeys('admin123');
      await tomarCaptura(driver, 'login_credenciales_correctas');
      await driver.findElement(By.id('btn-login')).click();
      await driver.wait(until.elementLocated(By.id('btn-logout')), 5000);
      await tomarCaptura(driver, 'login_exitoso');
    } finally {
      await driver.quit();
    }
  });

  it('Prueba negativa: login con contraseña incorrecta', async function () {
    const driver = await crearDriver();
    try {
      await driver.get(URL);
      await driver.executeScript("localStorage.clear()");
      await driver.get(URL);
      await driver.findElement(By.id('input-username')).sendKeys('admin');
      await driver.findElement(By.id('input-password')).sendKeys('incorrecta123');
      await driver.findElement(By.id('btn-login')).click();
      await driver.wait(until.elementLocated(By.id('login-error')), 5000);
      await tomarCaptura(driver, 'login_credenciales_incorrectas');
    } finally {
      await driver.quit();
    }
  });

  it('Prueba de límites: login con campos vacíos', async function () {
    const driver = await crearDriver();
    try {
      await driver.get(URL);
      await driver.executeScript("localStorage.clear()");
      await driver.get(URL);
      await driver.findElement(By.id('btn-login')).click();
      await driver.wait(until.elementLocated(By.id('login-error')), 5000);
      await tomarCaptura(driver, 'login_campos_vacios');
    } finally {
      await driver.quit();
    }
  });
});