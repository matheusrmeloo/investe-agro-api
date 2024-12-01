import { Response } from "express";

/**
 * Função para formatar respostas de sucesso.
 * @param res Objeto Response do Express.
 * @param status Código HTTP.
 * @param payload Dados retornados na resposta.
 */
export const successResponse = (
	res: Response,
	status: number,
	payload: any,
): Response => {
	return res.status(status).json({
		status,
		payload,
	});
};

/**
 * Função para formatar respostas de erro.
 * @param res Objeto Response do Express.
 * @param status Código HTTP.
 * @param error Mensagem de erro.
 */
export const errorResponse = (
	res: Response,
	status: number,
	error: string,
): Response => {
	return res.status(status).json({
		status,
		payload: {
			error,
		},
	});
};
