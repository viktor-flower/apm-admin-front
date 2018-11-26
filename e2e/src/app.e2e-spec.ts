import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Navigate home', async () => {
    await page.navigateTo();
  });

  it('Admin - Login', async() => {
      await page.navigateTo();
      await page.openSideNav();
      await page.clickOn('.anonymous-menu .login-menu-item');
      await page.sendKeys('*[ng-reflect-name=login]', 'admin');
      await page.sendKeys('*[ng-reflect-name=password]', 'passwd');
      await page.clickOn('.submit');
  });

  describe('Permission', () => {
    it('Navigate', async () => {
      await page.waitForAngualar();
      await page.openSideNav();
      await page.clickOn('.authenticated-menu .permissions-menu-item');
    });

    it('Create', async () => {
      await page.clickOn('.local-menu');
      await page.clickOn('.new-menu-item');
      await page.sendKeys('input[placeholder=Name]', 'New permission');
      await page.sendKeys('input[placeholder=Description]', 'Description');
      await page.clickOn('.submit');
    });

    it('Edit', async () => {
      await page.waitForAngualar();
      await page.wait('lookAt');
      await page.clickOn('tr:nth-child(5) .group-menu-item');
      await page.clickOn('.cdk-overlay-container .edit-menu-item');
      await page.clear('input[placeholder=Name]');
      await page.sendKeys('input[placeholder=Name]', 'Edited permission');
      await page.clear('input[placeholder=Description]');
      await page.sendKeys('input[placeholder=Description]', 'Edited description');
      await page.clickOn('.submit');
    });
  });
});
