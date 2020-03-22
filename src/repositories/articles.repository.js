import BaseRepository from './base.repository';
import Articles from '../models/articles.model';

class ArticlesRepository extends BaseRepository {
	constructor () { 
		super(Articles, 'codart') 
	}
}

module.exports = ArticlesRepository