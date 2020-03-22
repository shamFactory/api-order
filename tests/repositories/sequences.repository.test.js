import supertest from "supertest";
import should from "should";
import mongoose from 'mongoose';
import * as config from '../../src/config/test.config';
import SequencesRepository from '../../src/repositories/sequences.repository';
import globalConfig from '../../src/config/global.config';
import dbConfig from '../../src/config/db.config';

const repository = new SequencesRepository();
const min = 1111;
const max = 9999;
const rand = Math.floor(Math.random() * (max - min + 1) + min);

describe("New Sequence test", () => {
    it("should return 1 new sequence", async () => {
        const seq = await repository.getLast('test-' + rand);
        should.equal(seq, 1);
    });

    it("should return 2 udpate sequence", async () => {
        const seq = await repository.getLast('test-' + rand);
        should.equal(seq, 2);
    });
});