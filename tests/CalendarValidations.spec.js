
const{test,expect} = require('@playwright/test');

test('@Web Calendar Validation', async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

    const year = 2027;
    const month = 9;
    const day = 14;

    // Convert the month to a 2 character string. If the month already has 2 characters, then it will remain as is.
    const monthInTwoDigitsFormat = String(month).padStart(2,'0');

    //Combine it into a Date format
    const enteredDate = `${year}-${monthInTwoDigitsFormat}-${day}`;
    console.log('Entered Date: ' + enteredDate);

    await page.locator('.react-date-picker__inputGroup').click();

    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.locator('.react-calendar__navigation__label__labelText').click();

    await page.getByRole('button',{name:String(year)}).click();

    await page.locator('.react-calendar__year-view__months__month').nth(month-1).click();

    await page.getByText(String(day)).click();

    const selectedDate = await page.locator('[name="date"]').getAttribute('value');

    //Validate if the selected date macthes with the initialized date.
    await expect(selectedDate).toBe(enteredDate);

    await context.close();

})