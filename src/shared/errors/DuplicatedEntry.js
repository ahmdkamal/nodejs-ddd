class DuplicatedEntry extends Error {
    constructor(field) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        this.message = `This ${field} already exists`;

        this.status = 422;

        this.errors = [
            {
                "msg": `This ${field} already exists, invalid value`,
                "param": `${field}`,
                "location": "body"
            }
        ];
    }
}

module.exports = DuplicatedEntry;
