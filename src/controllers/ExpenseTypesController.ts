import { Request, Response } from "express";

import connection from "../database/connection";
import Logger from "../utils/Logger";

const logger = new Logger();
export default class ExpenseTypesController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body;
      const created_at = new Date();
      const updated_at = new Date();
            
      const expense_added = await connection("expense_types")
        .insert({
          name,
          created_at,
          updated_at
        });

      if (!expense_added) {

        throw "Error on create a new expense type.";
      }

      return response
        .status(201)
        .json({ message: "Expense category created successfully."});

    } catch (error) {

      logger.makeLog("CreateExpenseType", error);

      return response
        .status(500)
        .json({ error: "There was an error. The system administrator was notified and working to solve this." });
    }
  }
    
  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const delete_expense_category = await connection("expense_types")
        .where("id", "=", id)
        .del("*");

      if (delete_expense_category) {

        return response
          .status(200)
          .json({ message: "Expense category deleted successfully."});
      }

      return response
        .status(406)
        .json({ message: "Expense category previously deleted." });
            
    } catch (error) {

      logger.makeLog("DeleteExpenseType", error);

      return response
        .status(400)
        .json({ error: "There was an error. Probably, this expense category was deleted previously. Ask support to the system administrator." });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body;
      const { id } = request.params;
      const updated_at = new Date();

      const update = await connection("expense_types")
        .where("id", "=", id)
        .update({ name, updated_at });

      if(update === 1) {

        return response
          .status(200)
          .json({ message: "Expense category updated successfully." });
      }

      return response
        .status(400)
        .json({ message: "ID passed doesn't exist. Try again with a valid ID." });

    } catch (error) {

      logger.makeLog("UpdateExpenseType", error);

      return response
        .status(500)
        .json({ message: "There was an error. The system administrator was notified and working to solve this." });
    }
        
  }

  async index(request: Request, response: Response): Promise<Response> {
    try {
      const categories = await connection("expense_types")
        .select("*");

      return response
        .status(200)
        .json({ expense_types: categories });

    } catch (error) {

      logger.makeLog("GetExpenseTypes", error);

      return response
        .status(500)
        .json({ message: "There was an error. The system administrator was notified and working to solve this." });
    }
        
  }
}