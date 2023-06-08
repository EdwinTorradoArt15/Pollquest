import axios from "axios";

export const getUser = async (id: string) => {
    return await axios.get(`/api/usuarios/${id}`);
}