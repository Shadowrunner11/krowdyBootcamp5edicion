import { mockResponseProfiles } from '../../test/mockData';
import AxiosService from '../service/axiosService';

// Tested
// TO-DO : logar pasar la url profielVar a este contexto
// TO-DO : completar logica para extraer infomracion
async function scrap() {
  const data = await AxiosService
    .getProfileInfo(mockResponseProfiles[0].profileVar);
  console.log(data);
}

scrap();