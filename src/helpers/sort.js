module.exports.sortArray = (
    array,
    selector = (item) => item,
    order = "ASC"
) => {
    let newArray;
    if (order === "ASC") {
        newArray = array.sort((a, b) => {
            if (selector(a) < selector(b)) {
                return -1;
            }
            if (selector(a) > selector(b)) {
                return 1;
            }
            return 0;
        });
    } else {
        newArray = array.sort((a, b) => {
            if (selector(a) > selector(b)) {
                return -1;
            }
            if (selector(a) < selector(b)) {
                return 1;
            }
            return 0;
        });
    }

    return newArray;
};
