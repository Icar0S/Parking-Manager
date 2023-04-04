import { Enviroment } from '../../../environment';
import { Api } from '../axios-config';


export interface IListagemCliente {
  id: number;
  email: string;
  nome: string;
  veiculo: string,
  placa: string,
  checkin: Date, //Date
  checkout: Date,
  payments: number
}
interface IDetalheCliente {
  id: number;
  email: string;
  nome: string;
  veiculo: string,
  placa: string,
  checkin: Date, //Date
  checkout: Date,
  payments: number
}

type TClientesComTotalCount = {
  data: IListagemCliente[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TClientesComTotalCount | Error> => {
  try {
    const urlRelativa = `/clients?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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

const getById = async (id: number): Promise<IDetalheCliente | Error> => {
  try {
    const { data } = await Api.get(`/clients/${id}`);

    if (data) {
      return data;
    }
    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetalheCliente, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheCliente>('/clients', dados);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalheCliente): Promise<void | Error> => {
  try {
    await Api.put(`/clients/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/clients/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

export const ClientesService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};