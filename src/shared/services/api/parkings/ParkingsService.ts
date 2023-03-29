import { Enviroment } from '../../../environment';
import { Api } from '../axios-config';


export interface IListagemParking {
  id: number;
  nome: string;
  payments: number;
  cidadeId: number;
}
interface IDetalheParking {
  id: number;
  nome: string;
  payments: number;
  cidadeId: number;
}

type TParkingsComTotalCount = {
  data: IListagemParking[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TParkingsComTotalCount | Error> => {
  try {
    const urlRelativa = `/parking?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS),
      };
    }
    return new Error('Erro ao listar os registros');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros');
  }
};

const getById = async (id: number): Promise<IDetalheParking | Error> => {
  try {
    const { data } = await Api.get(`/parking/${id}`);

    if (data) {
      return data;
    }
    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetalheParking, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheParking>('/parking', dados);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalheParking): Promise<void | Error> => {
  try {
    await Api.put(`/parking/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/parking/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

export const ParkingsService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};