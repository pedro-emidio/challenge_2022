const moment = require("moment");
const { groupBy } = require("../../helpers/groupBy");
const { sortArray } = require("../../helpers/sort");
module.exports = class AddDataService {
    constructor(userRepository) {
        /**
         * @type {import("../../data/repositories/userRepository").default}
         */
        this.userRepository = userRepository;
    }

    async execute(userId, deviceId, dateFilter = "year") {
        const [data, yearData] = await Promise.all([
            this.userRepository.getData(userId, deviceId, dateFilter),
            this.userRepository.getData(userId, deviceId, "year"),
        ]);

        const today = moment();
        let formatedData = [];
        let yearformatedData = [];
        for (const item of data) {
            formatedData = formatedData.concat(
                item.metrics.map((i) => {
                    return { ...i, insertData: item.insertData };
                })
            );
        }
        for (const item of yearData) {
            yearformatedData = yearformatedData.concat(
                item.metrics.map((i) => {
                    return { ...i, insertData: item.insertData };
                })
            );
        }
        let corrente = [];
        let tensao = [];
        let potencia = [];
        let groupedData = {};
        let tensaoAtual,
            potenciaAtual,
            correnteAtual = 0;
        // [{x:"Janeiro",y:20}]
        switch (dateFilter) {
            case "year":
                var format = new Intl.DateTimeFormat("pt-br", {
                    month: "long",
                });
                let todayFormated = format.format(today);
                groupedData = groupBy(
                    formatedData.map((item) => {
                        return {
                            ...item,
                            x: format.format(item.insertData),
                        };
                    }),
                    "x"
                );
                for (const [key, values] of Object.entries(groupedData)) {
                    let totalResistencia = 0;
                    let totalCorrente = 0;
                    let averageCorrente = 0;
                    let averageResistencia = 0;
                    const [fistValue] = values;
                    const date = fistValue.insertData;
                    for (const metric of values) {
                        totalCorrente += metric.corrente;
                        totalResistencia += metric.resistencia;
                    }
                    averageCorrente = totalCorrente / parseFloat(values.length);
                    averageResistencia =
                        totalResistencia / parseFloat(values.length);
                    corrente.push({
                        x: key,
                        y: averageCorrente,
                        date,
                    });
                    tensao.push({
                        x: key,
                        y: averageCorrente * averageResistencia,
                        date,
                    });
                    potencia.push({
                        x: key,
                        y:
                            averageCorrente *
                            averageResistencia *
                            averageCorrente,
                        date,
                    });
                    if (todayFormated == key) {
                        potenciaAtual =
                            averageCorrente *
                            averageResistencia *
                            averageCorrente;
                        correnteAtual = averageCorrente;
                        tensaoAtual = averageCorrente * averageResistencia;
                    }
                }
                break;

            case "month":
                groupedData = groupBy(
                    formatedData.map((item) => {
                        return {
                            ...item,
                            x: new Date(item.insertData).toLocaleDateString(
                                "pt-br"
                            ),
                        };
                    }),
                    "x"
                );
                for (const [key, values] of Object.entries(groupedData)) {
                    let totalResistencia = 0;
                    let totalCorrente = 0;
                    let averageCorrente = 0;
                    let averageResistencia = 0;
                    const [fistValue] = values;
                    const date = fistValue.insertData;
                    for (const metric of values) {
                        totalCorrente += metric.corrente;
                        totalResistencia += metric.resistencia;
                    }
                    averageCorrente = totalCorrente / parseFloat(values.length);
                    averageResistencia =
                        totalResistencia / parseFloat(values.length);
                    corrente.push({
                        x: key,
                        y: averageCorrente,
                        date,
                    });
                    tensao.push({
                        x: key,
                        y: averageCorrente * averageResistencia,
                        date,
                    });
                    potencia.push({
                        x: key,
                        y:
                            averageCorrente *
                            averageResistencia *
                            averageCorrente,
                        date,
                    });
                }
                break;
            case "day":
                var format = new Intl.DateTimeFormat("pt-br", {
                    month: "long",
                });
                groupedData = groupBy(
                    formatedData.map((item) => {
                        return {
                            ...item,
                            x: moment(item.insertData)
                                .locale("pt-br")
                                .format("HH:mm"),
                        };
                    }),
                    "x"
                );
                for (const [key, values] of Object.entries(groupedData)) {
                    let totalResistencia = 0;
                    let totalCorrente = 0;
                    let averageCorrente = 0;
                    let averageResistencia = 0;
                    const [fistValue] = values;
                    const date = fistValue.insertData;
                    for (const metric of values) {
                        totalCorrente += metric.corrente;
                        totalResistencia += metric.resistencia;
                    }
                    averageCorrente = totalCorrente / parseFloat(values.length);
                    averageResistencia =
                        totalResistencia / parseFloat(values.length);
                    corrente.push({
                        x: key,
                        y: averageCorrente,
                        date,
                    });
                    tensao.push({
                        x: key,
                        y: averageCorrente * averageResistencia,
                        date,
                    });
                    potencia.push({
                        x: key,
                        y:
                            averageCorrente *
                            averageResistencia *
                            averageCorrente,
                        date,
                    });
                }
                break;
        }
        const tensaoOrdenada = sortArray(tensao, (item) => item.date, "ASC");
        const potenciaOrdenada = sortArray(
            potencia,
            (item) => item.date,
            "ASC"
        );
        const correnteOrdenada = sortArray(
            corrente,
            (item) => item.date,
            "ASC"
        );
        potencia = [];
        tensao = [];
        corrente = [];
        var format = new Intl.DateTimeFormat("pt-br", {
            month: "long",
        });
        let todayFormated = format.format(today);
        groupedData = groupBy(
            yearformatedData.map((item) => {
                return {
                    ...item,
                    x: format.format(item.insertData),
                };
            }),
            "x"
        );
        for (const [key, values] of Object.entries(groupedData)) {
            let totalResistencia = 0;
            let totalCorrente = 0;
            let averageCorrente = 0;
            let averageResistencia = 0;
            const [fistValue] = values;
            const date = fistValue.insertData;
            for (const metric of values) {
                totalCorrente += metric.corrente;
                totalResistencia += metric.resistencia;
            }
            averageCorrente = totalCorrente / parseFloat(values.length);
            averageResistencia = totalResistencia / parseFloat(values.length);
            corrente.push({
                x: key,
                y: averageCorrente,
                date,
            });
            tensao.push({
                x: key,
                y: averageCorrente * averageResistencia,
                date,
            });
            potencia.push({
                x: key,
                y: averageCorrente * averageResistencia * averageCorrente,
                date,
            });
            if (todayFormated == key) {
                potenciaAtual =
                    averageCorrente * averageResistencia * averageCorrente;
                correnteAtual = averageCorrente;
                tensaoAtual = averageCorrente * averageResistencia;
            }
        }
        return {
            tensao: tensaoOrdenada,
            corrente: potenciaOrdenada,
            potencia: correnteOrdenada,
            tensaoAtual,
            correnteAtual,
            potenciaAtual,
        };
    }
};
