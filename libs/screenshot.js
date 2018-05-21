const puppeteer = require('puppeteer');
const path = require('path');


module.exports = class Screenshot {
    constructor(config) {
        this.config = config;
        this.wsEndpoint = '';
    }
    /**
     * 获取Browser 实例
     */
    async getBrowser() {
        let broswer = null;
        try {
            //如果endPoint 不存在
            if (!this.wsEndpoint) {
                //使用launch 启动
                broswer = await puppeteer.launch({
                    ignoreHTTPSErrors: true,
                    args: ['--no-sandbox']
                });
                /**
                 * Emitted when Puppeteer gets disconnected from the Chromium instance. This might happen because of one of the following:
                 * Chromium is closed or crashed
                 *  The browser.disconnect method was called
                 */
                broswer.on('disconnected', () => {
                    this.wsEndpoint = '';
                })

                this.wsEndpoint = broswer.wsEndpoint();
            } else {
                broswer = await puppeteer.connect({
                    ignoreHTTPSErrors: true,
                    browserWSEndpoint: this.wsEndpoint
                })
            }
        } catch (ex) {
            console.log(ex);
        }

        return broswer;
    }

    async getPage(options) {
        let browser = await this.getBrowser(),
            page = null;
        try {
            page = await browser.newPage();

            page.on('error', (err) => {
                console.log(err);
            })

            if (options.url) {
                await page.goto(options.url, {
                    waitUntil: 'networkidle0'
                });
            }

        } catch (ex) {
            console.log(ex);
        }

        return page;

    }

    async do(opt) {
        opt = Object.assign(opt, this.config);
        let page = await this.getPage(opt);
        if (page) {
            if (opt.selector) {
                let eleHandle = await page.$(opt.selector);
                await eleHandle.screenshot(opt);
            } else {
                await page.screenshot(opt);

            }
        }

    }
}