const URL = 'https://api.github.com/';

export class API{
    constructor(){

    }

    async fetchRepos(searchValue){
        try{
            return await fetch(`${URL}search/repositories?q=${searchValue}`)
        } catch(err){
            throw err;
        }
        
    }
}