const ExcelJs = require('exceljs');
const {test,expect} = require('@playwright/test')

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');

    const output = await readExcel(worksheet, searchText);


    const cell = worksheet.getCell(output.row, output.column+change.colChange);
    cell.value = replaceText; // replace the existing value
    await workbook.xlsx.writeFile(filePath);

}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
                console.log(rowNumber);
                console.log(colNumber);
            }
        }
        )
    }
    )
    return output
}

// update Mango price to 350
// writeExcelTest("Mango", 350, {rowChange:0, colChange:2}, "C:\\Users\\ElisaVasta\\Downloads\\exceldownloadTest.xlsx");

test("Upload download excel validation", async ({page})=>
{
    const textSearch = "Mango";
    const updateValue = 350;

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise =  page.waitForEvent('download');
    await page.getByRole("button", {name: "Download"}).click();
    const download = await downloadPromise;

    // useful for windows
    const downloadPath = "C:\\Users\\ElisaVasta\\Downloads\\download.xlsx";
    await download.saveAs(downloadPath);
    await new Promise(res => setTimeout(res, 500));

    await writeExcelTest(textSearch, 350, {rowChange:0, colChange:2}, "C:\\Users\\ElisaVasta\\Downloads\\download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:\\Users\\ElisaVasta\\Downloads\\download.xlsx");
    const textlocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textlocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue.toString());
}
);
