import { browser, element, by } from 'protractor';

describe('contact list', function() {
  it('test ListComponent', function() {
    // 打开网页
    browser.get('/list');

    const contactList = element.all(by.css('.list li a'));

    // 测试列表记录条数是否符合预期
    expect(contactList.count()).toBeGreaterThan(8);

    contactList.first().click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.endsWith('list/1')).toBe(true);
    });
  });
});
