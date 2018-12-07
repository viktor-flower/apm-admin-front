import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Navigate home', async () => {
    page.navigateTo();
  });

  it('Admin - Login', async() => {
      await page.openSideNav();
      await page.clickOn('.anonymous-menu .login-menu-item');
      await page.wait('lookAt');
      await page.sendKeys('input[placeholder=Name]', 'administer');
      await page.sendKeys('input[placeholder=Password]', 'administer');
      await page.wait('lookAt');
      await page.clickOn('.submit');
  });

  describe('Permissiosn', () => {
    it('Navigate', async () => {
      await page.openSideNav();
      await page.clickOn('.authenticated-menu .permissions-menu-item');
    });

    it('Create', async () => {
      await page.wait('lookAt');
      await page.clickOn('.local-menu');
      await page.clickOn('.new-menu-item');
      await page.sendKeys('input[placeholder=Name]', 'new_permission' + Date.now().valueOf());
      await page.sendKeys('input[placeholder=Title]', 'New permission'  + Date.now().valueOf());
      await page.sendKeys('input[placeholder=Description]', 'Description');
      await page.wait('lookAt');
      await page.clickOn('.submit');
    });

    it('Edit', async () => {
      await page.wait('lookAt');
      await page.clickOn('tr:nth-child(5) .group-menu-item');
      await page.clickOn('.cdk-overlay-container .edit-menu-item');
      await page.clear('input[placeholder=Name]');
      await page.sendKeys('input[placeholder=Name]', 'Edited permission' + Date.now().valueOf());
      await page.clear('input[placeholder=Title]');
      await page.sendKeys('input[placeholder=Title]', 'Edited permission title' + Date.now().valueOf());
      await page.clear('input[placeholder=Description]');
      await page.sendKeys('input[placeholder=Description]', 'Edited description');
      await page.wait('lookAt');
      await page.clickOn('.submit');
    });
  });

  describe('Roles', () => {
    it('Navigate', async () => {
      await page.openSideNav();
      await page.clickOn('.authenticated-menu .roles-menu-item');
    });

    it('Create', async () => {
      await page.wait('lookAt');
      await page.clickOn('.local-menu');
      await page.clickOn('.new-menu-item');
      await page.wait('lookAt');
      await page.sendKeys('input[placeholder=Name]', 'new_role_' + Date.now().valueOf());
      await page.sendKeys('input[placeholder=Title]', 'New role ' + Date.now().valueOf());
      await page.sendKeys('input[placeholder=Description]', 'Role description');
      await page.clickOn('.permission-group formly-field:nth-child(5) mat-checkbox');
      await page.clickOn('.permission-group formly-field:nth-child(3) mat-checkbox');
      await page.clickOn('.permission-group formly-field:nth-child(7) mat-checkbox');
      await page.wait('lookAt');
      await page.clickOn('.submit');
    });

    it('Edit', async () => {
      await page.wait('lookAt');
      await page.clickOn('tr:nth-child(5) .group-menu-item');
      await page.clickOn('.cdk-overlay-container .edit-menu-item');
      await page.wait('lookAt');
      await page.clear('input[placeholder=Title]');
      await page.sendKeys('input[placeholder=Title]', 'Edited role title ' + Date.now().valueOf());
      await page.clear('input[placeholder=Description]');
      await page.sendKeys('input[placeholder=Description]', 'Edited role description');
      await page.clickOn('.permission-group formly-field:nth-child(4) mat-checkbox');
      await page.clickOn('.permission-group formly-field:nth-child(2) mat-checkbox');
      await page.clickOn('.permission-group formly-field:nth-child(6) mat-checkbox');
      await page.wait('lookAt');
      await page.clickOn('.submit');
    });
  });

  describe('Users', () => {
    it('Navigate', async () => {
      await page.openSideNav();
      await page.clickOn('.authenticated-menu .users-menu-item');
    });

    it('Create', async () => {
      await page.wait('lookAt');
      await page.clickOn('.local-menu');
      await page.clickOn('.new-menu-item');
      await page.wait('lookAt');
      await page.sendKeys('input[placeholder=Name]', 'New User');
      await page.clickOn('.role-group formly-field:nth-child(5) mat-checkbox');
      await page.clickOn('.role-group formly-field:nth-child(3) mat-checkbox');
      await page.clickOn('.role-group formly-field:nth-child(2) mat-checkbox');
      await page.wait('lookAt');
      await page.clickOn('.submit');
    });

    it('Edit', async () => {
      await page.wait('lookAt');
      await page.clickOn('tr:nth-child(5) .group-menu-item');
      await page.clickOn('.cdk-overlay-container .edit-menu-item');
      await page.wait('lookAt');
      await page.clear('input[placeholder=Email]');
      await page.sendKeys('input[placeholder=Email]', 'edited-email@example.com');
      await page.clear('input[placeholder=Name]');
      await page.sendKeys('input[placeholder=Name]', 'Edited Name');
      await page.clickOn('.role-group formly-field:nth-child(4) mat-checkbox');
      await page.clickOn('.role-group formly-field:nth-child(2) mat-checkbox');
      await page.clickOn('.role-group formly-field:nth-child(3) mat-checkbox');
      await page.wait('lookAt');
      await page.clickOn('.submit');
    });
  });

  it('Logout', async () => {
    await page.openSideNav();
    await page.clickOn('.authenticated-menu .logout-menu-item');
  });

});
