import { AppPage } from './app.po';
import { browser, element, by, logging, Key } from 'protractor';

// describe('workspace-project App', () => {
//   let page: AppPage;

//   beforeEach(() => {
//     page = new AppPage();
//   });

//   it('should display welcome message', () => {
//     page.navigateTo();
//     expect(page.getTitleText()).toEqual('Welcome to WanderlustUI!');
//   });

//   afterEach(async () => {
//     // Assert that there are no errors emitted from the browser
//     const logs = await browser.manage().logs().get(logging.Type.BROWSER);
//     expect(logs).not.toContain(jasmine.objectContaining({
//       level: logging.Level.SEVERE,
//     } as logging.Entry));
//   });
// });


describe('WanderLust', () => {

  it('1. Should navigate to server page and reset DB', function () {
    browser.waitForAngularEnabled(false);
    browser.get("http://localhost:4000/user/setup");
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain("user/setup");
  })


  it('2. Should navigate to Wanderlust landing page', function () {
    browser.sleep(1000);
    browser.get("http://localhost:4200/home");
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain("home");
  })

  
  it('3. Should search for Trips', function () {
    browser.sleep(1000);
    var searchInput = element(by.name('continent'));
    browser.sleep(1000);
    searchInput.sendKeys('europe');
    browser.sleep(1000);
    var searchButton = element(by.name("searchbutton"));
    browser.sleep(1000);
    searchButton.click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain("packages/EUROPE");
  })

  it("4. Should calculate charges for a Trip", function () {
    browser.sleep(1000);
    element.all(by.name("book")).then(function (allButtons) {
      allButtons[0].click();
    })

    browser.sleep(3000);
    var nop = element(by.name("noOfPersons"));
    nop.sendKeys(2);
    browser.sleep(1000);
    var date = element(by.name("date"));
    date.sendKeys('30');
    date.sendKeys('7');
    browser.sleep(1000);
    date.sendKeys(Key.TAB);
    date.sendKeys('2020');
    browser.sleep(1000);
    var calChrgsBtn = element(by.name("calChrgsBtn"));
    calChrgsBtn.click();
    // var sm = element(by.id('successMessage'));
    // expect(sm).toContain('Your trip ends on August 6, 2020 and you will pay $4,998.00')
  })

  it('5. Should get a message from alert box', function () {
    var btn = element(by.name('bookingTrip'));
    browser.sleep(1000);
    btn.click();
    browser.sleep(1000);
    var txt = browser.switchTo().alert().getText()
    expect(txt).toContain('Please Login to book a package')
  })

  it('6. Page should go to Register', function () {
    browser.switchTo().alert().accept();
    browser.sleep(2000);
    var btn = element(by.name('register'));
    btn.click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain("register");
  })

  it('7. Should register successfully', function () {
    var name = element(by.id("name"));
    var email = element(by.id("emailId"));
    var no = element(by.id("uContactNo"));
    var pass = element(by.id("uPass"));

    name.sendKeys("Krishna");
    email.sendKeys("demo@gmail.com");
    no.sendKeys(6896589658);
    pass.sendKeys("Abc@1234");

    browser.sleep(1000);
    var button = element(by.name("submit"));
    button.click();
    browser.sleep(5000);
    expect(browser.getCurrentUrl()).toContain("login");
    
  });

  it('8. should login successfully', function () {
    var no = element(by.id("uContactNo"));
    var pass = element(by.id("uPass"));

    no.sendKeys(6896589658);
    pass.sendKeys("Abc@1234");

    browser.sleep(1000);
    var button = element(by.name("submit"));
    button.click();
    browser.sleep(2000);
    // var welcomeMsg = element(by.id("name"));
    
    expect(browser.getCurrentUrl()).toContain("home/U1001");
  });

  it('9. Should search for Trips - 2', function () {
    browser.sleep(1000);
    var searchInput = element(by.name('continent'));
    browser.sleep(1000);
    searchInput.sendKeys('europe');
    browser.sleep(1000);
    var searchButton = element(by.name("searchbutton"));
    browser.sleep(1000);
    searchButton.click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain("packages/EUROPE");
  })

  it("10. Should calculate charges for a Trip", function () {
    browser.sleep(1000);
    element.all(by.name("book")).then(function (allButtons) {
      allButtons[0].click();
    })

    browser.sleep(3000);
    var nop = element(by.name("noOfPersons"));
    nop.sendKeys(2);
    browser.sleep(1000);
    var date = element(by.name("date"));
    date.sendKeys('30');
    date.sendKeys('7');
    browser.sleep(1000);
    date.sendKeys(Key.TAB);
    date.sendKeys('2020');
    browser.sleep(1000);
    var calChrgsBtn = element(by.name("calChrgsBtn"));
    calChrgsBtn.click();
    // var sm = element(by.id('successMessage'));
    // expect(sm).toContain('Your trip ends on August 6, 2020 and you will pay $4,998.00')
  })


  it('11. Should book a trip and Should check for planned trips', function () {
    var btn = element(by.name('bookingTrip'));
    browser.sleep(1000);
    btn.click();
    browser.sleep(1000);
    // var name = element(by.id('head'));
    browser.sleep(1000);
    element(by.id('plannedTrips')).click();
    browser.sleep(2000);
    // var heading = element(by.id('heading'))
    // expect(heading).toEqual(name);
    browser.sleep(1000);
    browser.get("http://localhost:4200/home/U1001");
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('home/U1001')
  })

  it('12. Should remove a trip', function () {
    browser.get("http://localhost:4200/viewBookings");
    browser.sleep(3000);
    element(by.id('delete')).click();
    browser.sleep(4000);
    var em = element(by.id('em')).getText();
    browser.sleep(2000);
    expect(em).toEqual('Sorry, You have not planned any trips with us yet!')    
  })  

  it('13. Should get user profile details', function () {
    browser.sleep(2000);
    element(by.id('name')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('profile')    
  })
  
  browser.sleep(1000);
  it('14. should logout', function () {
    browser.sleep(1000);
    var logout = element(by.id('logout'));
    logout.click();
    browser.sleep(2000);
    var txt = browser.switchTo().alert().getText()
    expect(txt).toContain('Are you sure that you want to proceed?')
    browser.switchTo().alert().accept();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain("home");

  })
  
});
