import axios from "axios";


const ApiClient = () => {
    const defaultOptions = {
        baseURL: "http://localhost:8080/api/v1/vehicles",
    };

    const instance = axios.create(defaultOptions);

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(`error`, error);
            return Promise.reject(error);
        },
    );

    return instance;
};

export default ApiClient();