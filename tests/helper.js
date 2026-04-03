import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';
import path from 'path';

export async function crearDriver() {
  const options = new chrome.Options();
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
  await driver.manage().setTimeouts({ implicit: 5000 });
  await driver.manage().window().maximize();
  return driver;
}

export async function tomarCaptura(driver, nombre) {
  const carpeta = './tests/screenshots';
  if (!fs.existsSync(carpeta)) fs.mkdirSync(carpeta, { recursive: true });
  const imagen = await driver.takeScreenshot();
  const ruta = path.join(carpeta, `${nombre}_${Date.now()}.png`);
  fs.writeFileSync(ruta, imagen, 'base64');
  console.log(`📸 Captura guardada: ${ruta}`);
}

export async function login(driver) {
  await driver.get('http://localhost:5173');
  await driver.executeScript("localStorage.clear()");
  await driver.get('http://localhost:5173');
  await driver.findElement(By.id('input-username')).sendKeys('admin');
  await driver.findElement(By.id('input-password')).sendKeys('admin123');
  await driver.findElement(By.id('btn-login')).click();
  await driver.wait(until.elementLocated(By.id('btn-logout')), 5000);
}

export { By, until };