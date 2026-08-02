
const ExcelJS = require('exceljs');
const { test, expect } = require('@playwright/test');
const path = require('path');

async function writeExcel(searchText, replacePrice, change, filePath) {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = await workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = await worksheet.getCell(output.row, (output.column + change.colChange));
    cell.value = replacePrice;

    workbook.xlsx.writeFile(filePath);

}

async function readExcel(worksheet, searchText) {

    let outputCell = {
        row: -1,
        column: -1
    }

    await worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {

            if (cell.value === searchText) {
                outputCell.row = rowNumber
                outputCell.column = colNumber
            }
        })
    })

    return outputCell;
}

test('@Web Upload Download Excel', async ({ page }) => {
    
    const inputText = 'Apple';
    const updateValue = '870';

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    const downloadPromise = page.waitForEvent('download');

    await page.getByRole('button', { name: 'Download' }).click();

    const download = await downloadPromise;

    const downloadPath = path.join('C:', 'JavaScript', 'download.xlsx');
    
    await download.saveAs(downloadPath);

    // Update Apple Price to 870
    writeExcel(inputText, updateValue, { rowChange: 0, colChange: 2 }, downloadPath);

    // Click on the 'Choose File' button
    await page.locator('#fileinput').click();

    //Select the file from the local folder
    await page.locator('#fileinput').setInputFiles(downloadPath);

    const textLocator = page.getByText(inputText);
    const desiredRow = page.getByRole('row').filter({has:textLocator});
    
    const desiredValue = desiredRow.locator('#cell-4-undefined');
    
    await expect(desiredValue).toHaveText(updateValue);    

})
