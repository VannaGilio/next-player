
/********** Status Code De Mensagens De ERRO**********/
const ERROR_REQUIRED_FIELDS={
    status: false, status_code: 400, menssage:'Erro:Não Foi Possível realizar a requisição, pois existem campos obrigatórios que não foram preenchidos ou não atendem a quantidade de caracteres!'
}
const ERROR_NOT_FOUND = {
    status: false, status_code: 404, menssage:'Erro: Não foram encontrados itens de retorno'
}
/********** Status Code De Mensagens De Sucesso**********/

const SUCCESS_CREATED_ITEM={
    status: true, status_code: 201, menssage:'Item criado com sucesso!!'
}
const SUCCESS_DELETED_ITEM={
    status: true, status_code: 200, menssage:'Item excluído com sucesso!!'
}
const SUCCESS_UPDATED_ITEM={
    status: true, status_code: 200, menssage:'Item atualizado com sucesso!!'
}

export default 
    ERROR_REQUIRED_FIELDS
    SUCCESS_CREATED_ITEM
    ERROR_NOT_FOUND
    SUCCESS_DELETED_ITEM
    SUCCESS_UPDATED_ITEM
