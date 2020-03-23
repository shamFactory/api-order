import supertest from "supertest";
import should from "should";
import mongoose from 'mongoose';
import * as config from '../../src/config/test.config';
import OrderService from '../../src/services/order.service';
import OrderRepository from '../../src/repositories/orders.repository';
import * as globalConfig from '../../src/config/global.config';
import dbConfig from '../../src/config/db.config';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

const service = new OrderService();
const repository = new OrderRepository();
const min = 1111;
const max = 9999;
const rand = Math.floor(Math.random() * (max - min + 1) + min);

describe("New Order test", () => {
    it("should return 1 new order", (done) => {
        repository.findAll().countDocuments().then(amount => {
            console.log('amount:'+amount);
            service.create(1, 10, '987654321').then(res => {
                should.equal(res.amount, 10);
                should.equal(res.phone, '987654321');
                done();
            }).catch(err => {
                done();
            })
        });
    });
});

describe("CSV Order test", () => {
    it("should return 1 new order csv", (done) => {
        repository.findAll().then(res => {
            service.addCsv(res, 'orders-test.csv');

            fs.createReadStream(path.resolve(globalConfig.path_csv, 'orders-test.csv'))
                .pipe(csv.parse({ headers: true }))
                .on('error', error => { /*console.error(error)*/ })
                .on('data', row => { /*console.log(row)*/ })
                .on('end', (rowCount) => {
                    console.log(`Parsed ${rowCount} rows`)
                    should.equal(res.length, rowCount)

                    const file = path.resolve(globalConfig.path_csv,  'orders-test.csv')
                    const csvFile = fs.createWriteStream(file);
                    csv.writeToStream(csvFile, [{
                        'ticketId': 'ticketId',
                        'productId': 'productId',
                        'quantity': 'quantity',
                        'description': 'description',
                        'netPrice': 'netPrice',
                        'phone': 'phone'
                    }], { headers: false })
                    done();
                });
        });
    });
});