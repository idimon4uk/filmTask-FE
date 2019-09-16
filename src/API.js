const baseUrl = 'http://127.0.0.1:3000';

module.exports={
    GET_ALL_FILMS:()=>{return baseUrl+'/api/films'},//GET
    GET_FILM_DETAIL:(id)=>{return `${baseUrl}/api/films/${id}`},//GET
    DELETE_FILM:(id)=>{return `${baseUrl}/api/films/${id}`},//DELETE
    ADD_NEW_FILM:()=>{return baseUrl+'/api/films'}, //POST
    EDIT_FILM:(id)=>{return `${baseUrl}/api/films/${id}`}, //PUT
    GET_ALL_STARS:()=>{return `${baseUrl}/api/stars/`},//GET
    GET_STAR:(id)=>{return `${baseUrl}/api/stars/${id}`},//GET
    UPLOAD_FILE:()=>{return baseUrl+'/api/films/import'}
}
