class MaxCapacity extends Error {
    constructor(field, max) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        this.message = `This ${field} has the maximum capacity (${max})`;

        this.status = 422;

        this.errors = [
            {
                "msg": `This ${field} has the maximum capacity (${max})`,
                "param": `${field}`,
                "location": "body"
            }
        ];
    }
}

module.exports = MaxCapacity;
