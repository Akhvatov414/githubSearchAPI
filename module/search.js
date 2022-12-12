export class SEARCH{
    constructor(api){
        this.api = api;
        this.main = document.querySelector('.main');
        this.listItem = document.querySelector('.list-item');
        this.searchInput = document.querySelector('.search-form__input');
        this.autocompleteList = document.querySelector('.search-form__list');
        this.searchInput.addEventListener('keydown', (event) => {
            if(event.code == 'Space') return;
        })
        this.searchInput.addEventListener('keyup', this.debounce(this.searchRepo.bind(this), 200))
    }

    searchRepo(){
        if(this.searchInput.value){
            if(this.searchInput.value === '') console.log(123);;
            if(this.listItem === null){ 
                console.log('Пустой')
            } else {
                //console.log(document.querySelectorAll('.list-item'));
                document.querySelectorAll('.list-item').forEach(el => el.remove())
            }
            
            this.api.fetchRepos(this.searchInput.value)
                .then(res => this.processingResponse(res))
        } else {
            document.querySelectorAll('.list-item').forEach(el => el.remove())
            //throw Error('oops');
            
        }
    }

    processingResponse(response){
        let repos;
        if(response.ok){
            response.json().then((res) => {
                if(res.items){
                    repos = res.items;
                    repos.forEach((repo, index) => {
                        if (index <= 4){
                            this.createRepo(repo);
                        } else {
                            return
                        }
                    })
                }
            })
        }
    }

    createElement(elTag, elClass){
        const element = document.createElement(elTag);
        if(elClass){
            element.classList.add(elClass);
        }

        return element;
    }

    createRepo(repoData){
        const repoElement = this.createElement('li', 'list-item');
        repoElement.innerHTML = `${repoData.name}`;
        this.autocompleteList.append(repoElement);
        repoElement.addEventListener('click', () => {
            //console.log(repoData.owner.login);
            this.selectElement(repoData.name, repoData.owner.login, repoData.stargazers_count)
        })
        this.listItem = repoElement;
    }

    selectElement(name, owner, stars){
        const searchRes = this.createElement('div', 'container');
        const closeButton = this.createElement('button', 'template-button');
        // const closeImg1 = this.createElement('img');
        // closeImg1.src ='./img/close1.svg';
        // closeImg1.alt = 'Удалить элемент';
        // const closeImg2 = this.createElement('img');
        // closeImg2.src ='./img/close2.svg';
        // closeImg2.alt = 'Удалить элемент';
        //closeImg.innerHTML = "<div class = 'test'>CLOSE</div>"
        const props = this.createElement('ul', 'conatiner__props');
        props.innerHTML = `
        <li class = 'props'>Name: ${name}</li>
        <li class = 'props'>Owner: ${owner}</li>
        <li class = 'props'>Stars: ${stars}</li>
        `;
        closeButton.addEventListener('click', (event) => {
            let close = event.target.closest('.container');
            close.remove();
        })
        searchRes.append(props);
        //closeButton.append(closeImg1);
        // closeButton.append(closeImg2);
        searchRes.append(closeButton);
        this.main.append(searchRes);
        this.clearSearch();
    }

    clearSearch(){
        this.searchInput.value = '';
        document.querySelectorAll('.list-item').forEach(el => el.remove())
    }

    debounce(func, wait, immediate){
        let timeout;
        return function(){
            const context = this;
            const args = arguments;
            const later = function(){
                timeout = null;
                if(!immediate) func.apply(context, args);
            }
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args)
        }
    }
}