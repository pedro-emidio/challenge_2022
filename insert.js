const moment = require("moment");
const db = require("./src/data/mongodb");
const { InsertRecord } = require("./src/schemas");
const XLSX = require("xlsx");
/** @type {import("mongoose").default.Model} */
const record = InsertRecord;
process.env.DBHOST = "mongodb+srv";
async function main() {
    // const wb = XLSX.readFile("./dados.xlsx");
    // const ws = wb.Sheets["Planilha1"];
    // const data = XLSX.utils.sheet_to_json(ws).map((item) => item.dados);
    let metrics = [];
    let firstTime = moment(new Date("2022-08-01"));
    let counter = 0;
    // for (const item of data) {
    while (firstTime.isBefore(moment(new Date("2022-09-21")))) {
        firstTime = moment(firstTime).add(30, "minute");

        metrics.push({ corrente: Math.random() * 6 });
        await db();
        await record.create({
            deviceId: "62c07ebb78990300401b9d83",
            userId: "62be83cda7ff956200baec54",
            metrics,
            insertData: firstTime.toDate(),
        });

        // console.log({
        //     deviceId: "62c07ebb78990300401b9d83",
        //     userId: "62be83cda7ff956200baec54",
        //     metrics,
        //     insertData: firstTime.toDate(),
        // });
        metrics = [];
    }
    // }
    process.exit();
}
main();
