var fs = require('fs');

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream('./capture/' + filename);
    stream.write(new Buffer(data, 'base64')).end();
}

describe('Yahoo', function() {

    beforeEach(function() {
        browser.ignoreSynchronization = true; // Angularサイトでなければtrueに設定
    });

    it('タイトル確認', function() {
        browser.get('http://www.yahoo.co.jp/');
        expect(browser.getTitle()).toEqual('Yahoo! JAPAN');
    });

    it('検索実行', function() {
        element(by.id('srchtxt')).sendKeys('ビジネスバンクグループ');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, 'yahoo.png');
        });
    });
});