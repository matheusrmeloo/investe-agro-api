import { Request, Response } from "express";
import { Route } from "../config/routes/Route";
import { ClientService } from "../services/ClientService";
import { errorResponse } from "../utils/ResponseUtil";
import * as ExcelJS from "exceljs";

export default class ReportController {
	@Route("/report", "get")
	public async generateClientReport(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const { production, name, documentNumber, neighborhoodId } = req.query;

			const clients = await ClientService.getAllClients({
				production,
				name,
				documentNumber,
				neighborhoodId,
			});

			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet("Clientes");

			worksheet.columns = [
				{ header: "Nome", key: "name", width: 30 },
				{ header: "Telefone", key: "phone", width: 20 },
				{ header: "Tipo de Produção", key: "productionType", width: 30 },
				{ header: "Endereço", key: "address", width: 50 },
			];

			clients.forEach((client) => {
				const { name, phone, productions, address } = client;
				worksheet.addRow({
					name,
					phone,
					productionType:
						productions?.map((prod) => prod.type).join(", ") || "",
					address: `${address?.street || ""}, ${
						address?.neighborhood?.name || ""
					}`,
				});
			});

			const fileName = `Relatório_Clientes_${new Date().toISOString()}.xlsx`;
			res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
			res.setHeader(
				"Content-Type",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			);

			await workbook.xlsx.write(res);
			res.end();
		} catch (error: any) {
			errorResponse(res, 500, error.message);
		}
	}
}
