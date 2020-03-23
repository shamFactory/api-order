import BaseRepository from './base.repository';
import Sequences from '../models/sequences.model';

class SequencesRepository extends BaseRepository {
    constructor() {
        super(Sequences, 'name')
    }

    getLast(name) {
        return this.find(name).then(res => {
            if (!res) {
                return this.create({name: name, seq: 1}).then(c => 1);
            } else {
                res.seq++;
                return this.model.updateOne({name:  name}, res ).then(u => res.seq);
            }
        });
	}
}

module.exports = SequencesRepository