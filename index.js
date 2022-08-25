const puppeteer = require("puppeteer");

(async function main(){
    try{

        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        
        //https://stackoverflow.com/questions/52163547/node-js-puppeteer-how-to-set-navigation-timeout
        //timeout was fixed by change cconst DEFAULT_TIMEOUT = 3000000; in /puppeter/timeoutsetting.js or something like thtat
        page.setDefaultNavigationTimeout(300000000); 
        //await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 ")

        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36")


        //const navigationPromise = page.waitForNavigation({waitUntil: "domcontentloaded"});

        //await page.goto("https://web.whatsapp.com/",{waitUntil: 'load', timeout: 0});
        await page.goto("https://web.whatsapp.com/");
        
        //await navigationPromise;
        await page.waitForSelector("._2_1wd");

        await delay(5000);

        const contactName = "Francelis";
        await page.click(`span[title='${contactName}']`);
        await page.waitForSelector(".OTBsx");

        const editor = await page.$("div[tabindex='-1']");
        await editor.focus();

        const amountOfMessages = 500;

        for(var i = 0; i<amountOfMessages; i++){
            await page.evaluate(()=>{
                const message = "aqui va el mensaje"
                document.execCommand("insertText",false,message);  //error at this line is deprecated
            });

            await page.click("span[data-testid='send']");
            await delay(500);
        }

    }catch(e){
        console.log("error mine",e)
    }
})();

function delay(time){
    return new Promise(function(resolve){
        setTimeout(resolve, time);
    });
}