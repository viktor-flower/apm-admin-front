import { browser, by, element, Key } from 'protractor';

export class AppPage {
  map = {
    'sidenav': '.page-sidenav-button',
    'toaster-success': '.toast-success',
  };

  sleepOption = 'default';

  sleepParameters = {
    default: {
      clicked: 1000,
      pressed: 100,
      navigated: 2000,
      lookAt: 5000
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

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  async clear(key, index = -1) {
    const el = this.getElement(key, index = -1);
    const text = await el.getAttribute('value');
    let chars = '';
    for (let i = 0; i < text.length; i++) {
      chars += Key.BACK_SPACE;
    }
    await el.sendKeys(chars.toString());
  }

  sleep(ticks) {
    return browser.sleep(ticks);
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
    await this.clear(el);
    await el.sendKeys(keys);
    await this.wait('pressed');
  }
}
