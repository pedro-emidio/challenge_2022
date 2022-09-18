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
        const data = await this.userRepository.getData(
            userId,
            deviceId,
            dateFilter
        );

        let formatedData = [];
        for (const item of data) {
            formatedData = formatedData.concat(
                item.metrics.map((i) => {
                    return { ...i, insertData: item.insertData };
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
        tensao = sortArray(tensao, (item) => item.date, "ASC");
        potencia = sortArray(potencia, (item) => item.date, "ASC");
        corrente = sortArray(corrente, (item) => item.date, "ASC");
        return { tensao, corrente, potencia };
    }
};
