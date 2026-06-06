export class OpenStreetMap {
    #BASE_URL = "https://nominatim.openstreetmap.org";
    #USER_AGENT = "BondiFacil/1.0";

    /**
     * Busca ubicaciones en OpenStreetMap
     * 
     * @param {string} query 
     * @returns {Object[]}
     */
    async searchStreet(query) {
        if (search == undefined || search.length==0) return;

        let url = `${this.#BASE_URL}/search?street=${query}&county=Partido+de+La+Plata&country=Argentina&state=Buenos+Aires&format=json`;

        let resultados = [];

        fetch(url, {
            "headers": {
                "content-type": "application/json",
                "User-Agent": this.#USER_AGENT
            }
        }).then(response => {
            resultados = resultados.concat(response.json());
        }).catch(error => {
            console.error('Error al obtener ubicaciones: ', linea, error);
        });

        url = `${this.#BASE_URL}/search?amenity=${query}&county=Partido+de+La+Plata&country=Argentina&state=Buenos+Aires&format=json`;

        fetch(url, {
            "headers": {
                "content-type": "application/json",
                "User-Agent": this.#USER_AGENT
            }
        }).then(response => {
            resultados = resultados.concat(response.json());
        }).catch(error => {
            console.error('Error al obtener ubicaciones: ', linea, error);
        });

        return resultados;
    }
}