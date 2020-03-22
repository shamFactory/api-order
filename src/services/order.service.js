import DataService from './data.service';

class OrderService extends DataService {

    constructor(model) {
        super(model)
        this.model = model
    }
    
    create(req, res, next) {

    }
}