
export interface UsuarioApiResponse {
  data: ResponseDaApi[];
}

// Resposta da API 
export interface ResponseDaApi {
   content: {
    id: number,
    nome: string,
    email: string,
    resetToken: string,
	resetTokenExpires: string,
	senha: string
   },
   	empty: boolean,
	first: boolean,
	last: boolean,
	number: number,
	numberOfElements: number,
	pageable: {
		offset: number,
		pageNumber: number,
		pageSize: number,
		paged: boolean,
		sort: {
			empty: boolean,
            sorted: boolean,
			unsorted: boolean
		},
		unpaged: boolean
	},
	size: number,
	sort: {
		empty: boolean,
		sorted: boolean,
		unsorted: boolean
	},
	totalElements: number,
	totalPages: number
}
 
// Dados para criar um novo agendamento
export interface UsuarioAdmin {
  nome: string;
  email: string;
  senha: string;
}