export class API  {
    #BASE_URL = "https://cuandollega.smartmovepro.net/";
    #lineas = {
        linea7: "",
        nuevedejulio: "",
        unionplatense: "",
    }

    /**
     * @private
     */
    constructor() {}

    /**
     * Inicializa la API con los tokens.
     * 
     * @returns {API}
     */
    static async init() {
        let api = new API();

        await api.updateTokens();

        return api;
    }

    /**
     * Actualiza el token de la linea 
     * 
     * @param {string} linea
     */
    async updateToken(linea) {
        if (!linea in this.#lineas) {
            console.error('No existe la linea: ', linea)
        }

        const url = this.#BASE_URL + linea + "/paradascercanas";
        fetch(url)
        .then(response => {
            return response.text()
        })
        .then(html => {
            const parser = new DOMParser()

            const doc = parser.parseFromString(html, "text/html")

            const token = doc.querySelector('input[name="CSRF-TOKEN-CL-FORM"]').value;

            this.#lineas[linea] = token;
        })
        .catch(error => {
            console.error('Error al obtener el token: ', error)
        })


    }
    /**
     * Actualiza los tokens de todas las lineas
     */
    async updateTokens() {
        for(const linea in this.#lineas) {
            this.updateToken(linea);
        }
    }
    
    /**
     * Consume las apis en busca de las estaciones cercanas 
     * 
     * @param {number} latitud 
     * @param {number} longitud 
     * @returns {Object}
     */
    async getParadasCercanas(latitud, longitud) {
        let paradas = {};

        for(const linea in this.#lineas) {
            const url = this.#BASE_URL + linea + "/paradascercanas";

            let body = JSON.stringify({
                latitud: latitud,
                longitud: longitud
            });
            let cookie = this.#lineas[linea];
            fetch(url, {
                "headers": {
                    "accept": "*/*",
                    "content-type": "application/json",
                    "requestverificationtoken": cookie,
                    "cookie": "X-CSRF-TOKEN-CL=" + cookie
                },
                "body": body,
                "method": "POST"
            }).then(response => {
                return response.json();
            }).then(lista => {
                for(const parada in lista) {
                    if (parada.identificador in paradas) continue;

                    parada[parada.identificador] = parada;
                }
            }).catch(_error => {
                this.updateToken(linea);
                
                fetch(url, {
                    "headers": {
                        "accept": "*/*",
                        "content-type": "application/json",
                        "requestverificationtoken": cookie,
                        "cookie": "X-CSRF-TOKEN-CL=" + cookie
                    },
                    "body": body,
                    "method": "POST"
                }).then(response => {
                    return response.json();
                }).then(lista => {
                    for(const parada in lista) {
                        if (parada.identificador in paradas) continue;

                        paradas[parada.identificador] = parada;
                    }
                }).catch(error => {
                    console.error('Error al obtener paradas de la linea: ', linea, error);
                });
            });
        }

        return paradas;
    }

    /**
     * Consume las apis en busca de las estaciones cercanas 
     * 
     * @param {number} codigo Entero
     * @param {string} identificador 
     * @returns {Object}
     */
    async getArribos(codigo, identificador) {
        let arribos = {};

        for(const linea in this.#lineas) {
            const url = this.#BASE_URL + linea + `/arribos/?codLinea=${codigo}&idParada=${identificador}`;

            let cookie = this.#lineas[linea];

            fetch(url, {
                "headers": {
                    "accept": "*/*",
                    "content-type": "application/json",
                    "requestverificationtoken": cookie,
                    "cookie": "X-CSRF-TOKEN-CL=" + cookie
                },
                "method": "POST"
            }).then(response => {
                return response.json().arribos;
            }).then(lista => {
                for(const arribo in lista) {
                    if (arribo.codigoLinea in arribos) continue;

                    arribos[arribo.codigoLinea] = arribo;
                }
            }).catch(_error => {
                this.updateToken(linea);

                fetch(url, {
                "headers": {
                    "accept": "*/*",
                    "content-type": "application/json",
                    "requestverificationtoken": cookie,
                    "cookie": "X-CSRF-TOKEN-CL=" + cookie
                },
                "method": "POST"
                }).then(response => {
                    return response.json().arribos;
                }).then(lista => {
                    for(const arribo in lista) {
                        if (arribo.codigoLinea in arribos) continue;

                        arribos[arribo.codigoLinea] = arribo;
                    }
                });
            });
        }

        return arribos;
    }
}