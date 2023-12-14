const url = 'http://localhost:8080/viajabara';

export const createURL = (params) =>{
    const route = params.join('/');
    return url + route;
}

