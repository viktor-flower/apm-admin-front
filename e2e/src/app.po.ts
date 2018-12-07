import { browser, by, element, Key } from 'protractor';

export class AppPage {
  map = {
    'sidenav': '.page-sidenav-button',
    'toaster-success': '.toast-success',
  };

  sleepOption = 'fast';

  sleepParameters = {
    default: {
      clicked: 3000,
      pressed: 300,
      navigated: 3000,
      lookAt: 3000
    },
    fast: {
      clicked: 500,
      pressed: 100,
      navigated: 500,
      lookAt: 500
    }
  };

  async navigateTo() {
    await browser.get('/');
  }

  async openSideNav() {
    await this.clickOn('.side-nav-button');
  }

  async waitForAngualar() {
    await browser.waitForAngular();
  }

  async clear(key, index = -1) {
    const el = this.getElement(key, index);
    await el.clear();
  }

  async sleep(ticks) {
    await browser.sleep(ticks);
  }

  getElement(key, index = -1) {
    const selector = this.map[key] ? this.map[key] : key;
    if (index > -1) {
      return element.all(selector).get(index);
    }

    return element(by.css(selector));
  }

  async clickOn(key, index = -1) {
    const el = this.getElement(key, index);
    await el.click();
    await this.wait('clicked');
  }

  async wait(key) {
    const ticks = this.sleepParameters[this.sleepOption][key];
    await this.sleep(ticks);
  }

  async sendKeys(key, keys, index = -1) {
    const el = this.getElement(key, index);
    await el.clear();
    await el.sendKeys(keys);
    await this.wait('pressed');
  }
}
