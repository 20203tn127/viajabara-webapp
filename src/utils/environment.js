const url = 'http://44.193.57.107:3000/viajabara';

export const createURL = (params) =>{
    const route = params.join('/');
    return url + route;
}

