const moment = require("moment");
const { groupBy } = require("../../helpers/groupBy");
const { sortArray } = require("../../helpers/sort");
require("moment/locale/pt-br");
module.exports = class AddDataService {
    constructor(userRepository) {
        /**
         * @type {import("../../data/repositories/userRepository").default}
         */
        this.userRepository = userRepository;
    }

    async execute(userId, deviceId, dateFilter = "year") {
        let tensaoAtual = 0,
            potenciaAtual = 0,
            correnteAtual = 0;
        let random = Math.random();
        if (random > 0.5) {
            random = random * 10;
        } else {
            random = -random * 7;
        }
        const TENSAO_MEDIA = 120 + random;
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
                    return { corrente: i, insertData: item.insertData };
                })
            );
        }
        for (const item of yearData) {
            yearformatedData = yearformatedData.concat(
                item.metrics.map((i) => {
                    return { corrente: i, insertData: item.insertData };
                })
            );
        }
        let corrente = [];
        let tensao = [];
        let potencia = [];
        let groupedData = {};

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
                            date: item.insertData,
                            x: format.format(item.insertData),
                        };
                    }),
                    "x"
                );
                for (const [key, values] of Object.entries(groupedData)) {
                    let totalCorrente = 0;
                    let averageCorrente = 0;

                    const [fistValue] = values;
                    const date = fistValue.insertData;
                    for (const metric of values) {
                        totalCorrente += metric.corrente;
                    }
                    averageCorrente = parseFloat(totalCorrente / values.length);

                    corrente.push({
                        x: key,
                        y: averageCorrente,
                        date,
                    });
                    tensao.push({
                        x: key,
                        y: TENSAO_MEDIA,
                        date,
                    });
                    potencia.push({
                        x: key,
                        y: TENSAO_MEDIA * averageCorrente,
                        date,
                    });
                    if (todayFormated == key) {
                        potenciaAtual = averageCorrente * TENSAO_MEDIA;
                        correnteAtual = averageCorrente;
                        tensaoAtual = TENSAO_MEDIA;
                    }
                }
                break;

            case "month":
                groupedData = groupBy(
                    formatedData.map((item) => {
                        return {
                            ...item,
                            date: item.insertData,
                            x: new Date(item.insertData).toLocaleDateString(
                                "pt-br"
                            ),
                        };
                    }),
                    "x"
                );
                for (const [key, values] of Object.entries(groupedData)) {
                    let totalCorrente = 0;
                    let averageCorrente = 0;

                    const [fistValue] = values;
                    const date = fistValue.insertData;
                    for (const metric of values) {
                        totalCorrente += metric.corrente;
                    }

                    averageCorrente = parseFloat(totalCorrente / values.length);
                    corrente.push({
                        x: key,
                        y: averageCorrente,
                        date,
                    });
                    tensao.push({
                        x: key,
                        y: TENSAO_MEDIA,
                        date,
                    });
                    potencia.push({
                        x: key,
                        y: TENSAO_MEDIA * averageCorrente,
                        date,
                    });
                }
                break;
            case "day":
                var format = new Intl.DateTimeFormat("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                });
                groupedData = groupBy(
                    formatedData.map((item) => {
                        return {
                            ...item,
                            date: item.insertData,
                            x: format.format(item.insertData),
                        };
                    }),
                    "x"
                );
                for (const [key, values] of Object.entries(groupedData)) {
                    let totalCorrente = 0;
                    let averageCorrente = 0;

                    const [fistValue] = values;
                    const date = fistValue.insertData;
                    for (const metric of values) {
                        if (metric.corrente > 15) console.log(metric);
                        totalCorrente += metric.corrente;
                    }
                    averageCorrente = parseFloat(totalCorrente / values.length);

                    corrente.push({
                        x: key,
                        y: averageCorrente,
                        date,
                    });
                    tensao.push({
                        x: key,
                        y: TENSAO_MEDIA,
                        date,
                    });
                    potencia.push({
                        x: key,
                        y: TENSAO_MEDIA * averageCorrente,
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
                    date: item.insertData,
                    x: format.format(item.insertData),
                };
            }),
            "x"
        );
        for (const [key, values] of Object.entries(groupedData)) {
            let totalCorrente = 0;
            let averageCorrente = 0;

            const [fistValue] = values;
            const date = fistValue.insertData;
            for (const metric of values) {
                totalCorrente += metric.corrente;
            }
            averageCorrente = parseFloat(totalCorrente / values.length);

            // console.log({
            //     averageCorrente,
            //     averagePotencia: TENSAO_MEDIA * averageCorrente,
            // });
            corrente.push({
                x: key,
                y: averageCorrente,
                date,
            });
            tensao.push({
                x: key,
                y: TENSAO_MEDIA,
                date,
            });
            potencia.push({
                x: key,
                y: TENSAO_MEDIA * averageCorrente,
                date,
            });
            if (todayFormated == key) {
                potenciaAtual = TENSAO_MEDIA * averageCorrente;
                correnteAtual = averageCorrente;
                tensaoAtual = TENSAO_MEDIA;
            }
        }
        return {
            tensao: tensaoOrdenada,
            corrente: correnteOrdenada,
            potencia: potenciaOrdenada,
            tensaoAtual,
            correnteAtual,
            potenciaAtual,
        };
    }
};
