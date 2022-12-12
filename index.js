import { API } from "./module/api.js";
import { SEARCH } from "./module/search.js";


const api = new API();

new SEARCH(api);