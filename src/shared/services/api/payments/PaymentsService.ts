import { Enviroment } from '../../../environment';
import { Api } from '../axios-config';


export interface IListagemPayment {
  id: number;
  nome: string;
  email: string;
  veiculo: string;
  placa: string;
  payments: number;
}
interface IDetalhePayment {
  id: number;
  nome: string;
  email: string;
  veiculo: string;
  placa: string;
  payments: number;
}

type TPaymentsComTotalCount = {
  data: IListagemPayment[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPaymentsComTotalCount | Error> => {
  try {
    const urlRelativa = `/payments?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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

const getById = async (id: number): Promise<IDetalhePayment | Error> => {
  try {
    const { data } = await Api.get(`/payments/${id}`);

    if (data) {
      return data;
    }
    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetalhePayment, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhePayment>('/payments', dados);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalhePayment): Promise<void | Error> => {
  try {
    await Api.put(`/payments/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/payments/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

export const PaymentsService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};