const mirrow = (req, res) => {
    const methods = [{
        method : 'POST',
        hasBody : true,
        purpouse : "El metodo post se utiliza pra enviar una entidad a un recurso específico, causando a menudo un cambio en el estado o efectos secundarios en el servidor."
    }, {
        method: 'PUT',
        hasBody: true,
        purpouse: "El metodo pu reemplaza todas las representaciones actuales del recurso de destino con carga util de la peticion."
    }, {
        method: 'PATCH',
        hasBody: true,
        purpouse: "El metodo patch es utilizado para aplicar modificaciones parciales a un recurso"
    }, {
        method: 'HEAD',
        hasBody: false,
        purpouse: "El metodo head pide una respuesta identica a la de una peticion get, pero sin el cuerpo de la respuesta"
    }, {
        method: 'GET',
        hasBody: false,
        purpouse: "El metodo get solicita una representacion de un recurso especifico, las peticiones que usa el metodo get solo deben recuperar datos"
    }, {
        method: 'DELETE',
        hasBody: false,
        purpouse: "El metodo delete elimina el recurso especificado"
    }];

    const requestMethod = methods.find(
        m => m.method === req.method) || {
            method: req.method,
            hasBody: false,
            purpouse: "No tiene un body, no hay una respuesta, Metodo no soportado"
        };
        requestMethod.purpouse+= requestMethod.hasBody ? "Tiene cuerpo" : "No tiene cuerpo";
        if(requestMethod.hasBody){
            req.body; //JS debe de parcear mediante un JSON el objeto necesario
            res.json({...req.body, ruta_consumida: req.route.path, ...requestMethod});
        
        }else{
            res.json({ruta_consumida: req.OriginalUrl, ...requestMethod})
        }
};

module.exports = mirrow;