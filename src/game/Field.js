export const FieldType = {
    EMPTY: 0,
    FILLED: 1,
    MARKED: 2,
    ERROR: 3
};


class Field {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = FieldType.EMPTY;
    }
}

export default Field;