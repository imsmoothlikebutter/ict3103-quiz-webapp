const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("chai");
const firefox = require("selenium-webdriver/firefox");

describe("Selenium UI Testing", function () {
  let firefoxOptions = new firefox.Options();
  firefoxOptions.addArguments("-headless"); // Headless mode for Firefox
  firefoxOptions.addArguments("--no-sandbox");
  firefoxOptions.addArguments("--disable-dev-shm-usage");
  firefoxOptions.addArguments("--disable-gpu");
  let driver;
  let ip = "172.20.10.2";
  const uncommonPassword = "^GpxRsNHpF!!H6";
  const commonPassword = "password";

  before(async function () {
    driver = new Builder()
      .forBrowser("firefox")
      .setFirefoxOptions(firefoxOptions)
      // If using Remote WebDriver
      .usingServer(`http://${ip}:4444/wd/hub`)
      .build();
  });

  it("Enter common password, stays at Home Page (Fail Case)", async function () {
    this.timeout(5000);
    await driver.get(`http://${ip}:5173/`);
    const passwordField = await driver.findElement(By.id("passwordInput"));
    await passwordField.sendKeys(commonPassword);
    const loginButton = await driver.findElement(By.id("login-button"));
    await loginButton.click();
    await driver.sleep(1000);
    const passwordInputted = await passwordField.getAttribute("value");
    expect(passwordInputted).to.equal(commonPassword);
  });

  it("Enter uncommon password, get redirected to Welcome page (Pass Case)", async function () {
    this.timeout(5000);
    await driver.get(`http://${ip}:5173/`);
    const passwordField = await driver.findElement(By.id("passwordInput"));
    await passwordField.sendKeys(uncommonPassword);
    const loginButton = await driver.findElement(By.id("login-button"));
    await loginButton.click();
    await driver.sleep(1000);
    const passwordDisplayElement = await driver.findElement(
      By.id("passwordDisplay")
    );
    const displayedPassword = await passwordDisplayElement.getText();
    expect(displayedPassword).to.equal(uncommonPassword);
  });

  after(async function () {
    await driver.quit();
  });
});
