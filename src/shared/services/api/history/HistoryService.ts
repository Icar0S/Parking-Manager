import { Enviroment } from '../../../environment';
import { Api } from '../axios-config';


export interface IListagemHistory {
  id: number;
  nome: string;
  veiculo: string;
  placa: string;
  payments: number;
}

interface IDetalheHistory {
  id: number;
  nome: string;
  veiculo: string;
  placa: string;
  payments: number;
}

type THistorysComTotalCount = {
  data: IListagemHistory[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<THistorysComTotalCount | Error> => {
  try {
    const urlRelativa = `/history?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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

const getById = async (id: number): Promise<IDetalheHistory | Error> => {
  try {
    const { data } = await Api.get(`/history/${id}`);

    if (data) {
      return data;
    }
    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetalheHistory, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheHistory>('/history', dados);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalheHistory): Promise<void | Error> => {
  try {
    await Api.put(`/history/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/history/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

export const HistoryService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};