import { Request, Response } from 'express';

import connection from '../database/connection';

export default class RevenueCategoriesController {
    async create(request: Request, response: Response) {
        try {
            const { name } = request.body;
            const created_at = new Date();
            const updated_at = new Date();

            const revenue_added = await connection('revenue_categories')
                .insert({
                name,
                created_at,
                updated_at
                });

            if (!revenue_added) {
                throw new Exception();
            }

            return response.status(201).json({ message: 'Revenue category created successfully.'});

        } catch (error) {

            return response.status(500).json({ error: "There was an error. The system administrator was notified and working to solve this." });
        }
    }
    
    async delete(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const delete_revenue_category = await connection('revenue_categories')
                .where('id', '=', id)
                .del('*');

            if (delete_revenue_category) {
                return response.status(200)
                    .json({ message: "Revenue category deleted successfully."});
            }
            return response.status(406)
                    .json({ message: "Revenue category previously deleted." });
            
        } catch (error) {

            return response.status(400).json({ error: "There was an error. Probably, this revenue category was deleted previously. Ask support to the system administrator." });
        }
    }

    async update(request: Request, response: Response) {
        try {
            const { name } = request.body;
            const { id } = request.params;

            const updated_at = new Date();

            const update = await connection('revenue_categories')
                .where('id', '=', id)
                .update({ name, updated_at });

            if(update == 1) {
                return response.status(200)
                    .json({ message: "Revenue category updated successfully." });
            }
            return response.status(400)
                    .json({ message: "ID passed doesn't exist. Try again with a valid ID." });
        } catch (error) {
            return response.status(500)
                    .json({ message: "There was an error. The system administrator was notified and working to solve this." });
        }
        
    }

    async index(request: Request, response: Response) {
        try {
            const categories = await connection('revenue_categories')
                .select('*');

            return response.status(200)
                    .json({ revenue_categories: categories });
        } catch (error) {
            return response.status(500)
                    .json({ message: "There was an error. The system administrator was notified and working to solve this." });
        }
        
    }
}