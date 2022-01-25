class DuplicatedEntry extends Error {
    constructor(field) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        this.message = `This entry doesn't exist`;

        this.status = 422;

        this.errors = [
            {
                "msg": "This entry doesn't exist",
                "param": `${field}`,
                "location": "parameter"
            }
        ];
    }
}

module.exports = DuplicatedEntry;
