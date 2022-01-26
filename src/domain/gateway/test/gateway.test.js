process.env.NODE_ENV = 'test';
const express = require('express');
const assert = require('chai').assert;
const expect = require('chai').expect;
const request = require('supertest');
const conn = require('../../../db');
const routesConfig = require('../../../routes');
const app = routesConfig(express());

describe("Gateway CRUD", () => {
    before((done) => {
        conn.connect()
            .then(() => {
                done()
            })
            .catch((err) => done(err));
    })

    after((done) => {
        conn.close()
            .then(() => {
                done()
            })
            .catch((err) => done(err));
    })

    it('Returns 201, should create new gateway', (done) => {
        request(app).post('/api/v1/gateways').send({
            serialNumber: "12255334333",
            name: "Kamal",
            ipAddress: "192.168.1.1"
        }).then((res) => {
            expect(res).to.contain.property('status');
            assert(201 === res.status)

            const body = res.body;
            expect(body).to.contain.property('data');
            const data = body.data;

            expect(data).to.contain.property('id');
            expect(data).to.contain.property('serialNumber');
            expect(data).to.contain.property('name');
            expect(data).to.contain.property('createdAt');
            done();
        }).catch((err) => {
            done(err)
        })
    });

    it('It Fails', (done) => {
        request(app).post('/api/v1/gateways').send({
            serialNumber: "12255",
            ipAddress: "192.168.1.1"
        }).then((res) => {
            expect(res).to.contain.property('status');
            assert(res.status === 400);
            done();
        }).catch((err) => {
            done(err)
        })
    });

    it('It Fails Uniqueness', (done) => {
        request(app).post('/api/v1/gateways').send({
            serialNumber: "12255334322424",
            name: "Kamal",
            ipAddress: "192.168.1.1"
        }).then((res) => {
            expect(res).to.contain.property('status');
            assert(201 === res.status)

            const body = res.body;
            expect(body).to.contain.property('data');

            const data = body.data;

            expect(data).to.contain.property('id');
            expect(data).to.contain.property('serialNumber');
            expect(data).to.contain.property('name');
            expect(data).to.contain.property('createdAt');
        }).then(() => {
            request(app).post('/api/v1/gateways').send({
                serialNumber: "12255334322424",
                name: "Kamal",
                ipAddress: "192.168.1.1"
            }).then((res) => {
                expect(res).to.contain.property('status');
                assert(400 === res.status)
                done();
            }).catch((err) => {
                done(err)
            })
        }).catch((err) => {
            done(err)
        })
    });

    it('Get One Gateway', (done) => {
        request(app).post('/api/v1/gateways').send({
            serialNumber: "212331",
            name: "Kamal",
            ipAddress: "192.168.1.1"
        }).then((res) => {
            expect(res).to.contain.property('status');
            assert(201 === res.status)

            const body = res.body;
            expect(body).to.contain.property('data');
            const data = body.data;

            expect(data).to.contain.property('id');
            expect(data).to.contain.property('serialNumber');
            expect(data).to.contain.property('name');
            expect(data).to.contain.property('createdAt');

            return res;
        }).then((res) => {
            request(app).get(`/api/v1/gateways/${res.body.data.id}`).then((getObject) => {
                expect(getObject).to.contain.property('body');
                const body = getObject.body;

                expect(body).to.contain.property('data');
                const data = getObject.body.data;

                expect(data).to.contain.property('id');

                assert(data.id === res.body.data.id)
                done();
            }).catch((err) => {
                done(err)
            })

        }).catch((err) => {
            done(err)
        })
    });


    it('Update One Gateway', (done) => {
        request(app).post('/api/v1/gateways').send({
            serialNumber: "2123311000dd332334",
            name: "Kamal",
            ipAddress: "192.168.1.1"
        }).then((res) => {
            expect(res).to.contain.property('status');
            assert(201 === res.status)

            const body = res.body;
            expect(body).to.contain.property('data');
            const data = body.data;

            expect(data).to.contain.property('id');
            expect(data).to.contain.property('serialNumber');
            expect(data).to.contain.property('name');
            expect(data).to.contain.property('createdAt');

            return res;
        }).then((res) => {
            request(app).put(`/api/v1/gateways/${res.body.data.id}`).send({
                serialNumber: "2123311000dd3321",
                name: "Kamal22",
                ipAddress: "192.168.1.2"
            }).then((getObject) => {
                expect(getObject).to.contain.property('body');
                const body = getObject.body;

                expect(body).to.contain.property('data');
                const data = getObject.body.data;

                expect(data).to.contain.property('id');

                assert(data.id === res.body.data.id)
                assert(data.serialNumber !== res.body.data.serialNumber)
                assert(data.name !== res.body.data.name)
                assert(data.ipAddress !== res.body.data.ipAddress)

                done();
            }).catch((err) => {
                done(err)
            })

        }).catch((err) => {
            done(err)
        })
    });

    it('Delete One Gateway', (done) => {
        request(app).post('/api/v1/gateways').send({
            serialNumber: "21233xxx",
            name: "Kamal",
            ipAddress: "192.168.1.1"
        }).then((res) => {
            expect(res).to.contain.property('status');
            assert(201 === res.status)

            const body = res.body;
            expect(body).to.contain.property('data');
            const data = body.data;

            expect(data).to.contain.property('id');
            expect(data).to.contain.property('serialNumber');
            expect(data).to.contain.property('name');
            expect(data).to.contain.property('createdAt');

            return res;
        }).then((res) => {
            request(app).delete(`/api/v1/gateways/${res.body.data.id}`).then((res) => {
                assert(204 === res.status)
                done();
            }).catch((err) => {
                done(err)
            })

        }).catch((err) => {
            done(err)
        })
    });


})