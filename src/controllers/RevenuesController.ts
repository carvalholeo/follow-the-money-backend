import { Request, Response } from 'express';

import connection from '../database/connection';
import getUserId from '../utils/getUserId';
import Logger from '../utils/Logger';

const logger = new Logger();

export default class RevenuesController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { source, revenue_category_id, expected_amount, paid_amount, expected_date, effective_date, reference_month, is_paid } = request.body;
      const user_id = getUserId(String(request.headers.session));
      const created_at = new Date();
      const updated_at = new Date();

      const revenues_added = await connection('revenues')
        .insert({
          source,
          revenue_category_id,
          expected_amount,
          paid_amount,
          expected_date,
          effective_date,
          reference_month,
          is_paid,
          user_id,
          created_at,
          updated_at
        });

      if (!revenues_added) {

        throw 'Error on create a new revenue.';
      }

      return response
        .status(201)
        .json({ message: 'Revenue added successfully.'});

    } catch (error) {

      logger.makeLog('CreateRevenue', error);

      return response
        .status(500)
        .json({ error: 'There was an error. The system administrator was notified and working to solve this.' });
    }
  }
    
  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const user_id = getUserId(String(request.headers.session));

      const delete_revenue = await connection('revenues')
        .where({
          id,
          user_id
        })
        .del('*');

      if (delete_revenue) {

        return response
          .status(200)
          .json({ message: 'Revenue deleted successfully.'});
      }

      return response
        .status(406)
        .json({ message: 'Expenses previously deleted.' });
            
    } catch (error) {

      logger.makeLog('DeleteRevenue', error);

      return response
        .status(400)
        .json({ error: 'There was an error. Probably, this revenue was deleted previously. Ask support to the system administrator.' });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const { source, revenue_category_id, expected_amount, paid_amount, expected_date, effective_date, reference_month, is_paid } = request.body;
      const { id } = request.params;
      const user_id = getUserId(String(request.headers.session));
      const updated_at = new Date();

      const update = await connection('revenues')
        .where({
          id,
          user_id
        })
        .update({
          source,
          revenue_category_id,
          expected_amount,
          paid_amount,
          expected_date,
          effective_date,
          reference_month,
          is_paid,
          user_id,
          updated_at
        });

      if(update === 1) {

        return response
          .status(200)
          .json({ message: 'Revenue updated successfully.' });
      }

      return response
        .status(400)
        .json({ message: 'ID passed doesn\'t exist. Try again with a valid ID.' });

    } catch (error) {

      logger.makeLog('UpdateRevenue', error);

      return response
        .status(500)
        .json({ message: 'There was an error. The system administrator was notified and working to solve this.' });
    }
        
  }

  async index(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = getUserId(String(request.headers.session));
      const { page = 1 } = request.query;

      const [count] = await connection('revenues')
        .where({ user_id })
        .count();
      const contador = count['count(*)'] as string;

      const revenues = await connection('revenues')
        .where({ user_id })
        .join('revenue_categories', 'revenue_categories.id', '=', 'revenues.revenue_category_id')
        .limit(25)
        .offset((Number(page) - 1) * 25)
        .select([
          'revenues.source',
          'revenue_categories.name',
          'revenues.expected_amount',
          'revenues.paid_amount',
          'revenues.expected_date',
          'revenues.effective_date',
          'revenues.reference_month',
          'revenues.is_paid',
          'revenues.created_at',
          'revenues.updated_at'
        ]);
            
      response.header('X-Total-Count', contador);

      return response
        .status(200)
        .json({ revenues });

    } catch (error) {

      logger.makeLog('GetRevenues', error);

      return response
        .status(500)
        .json({ message: 'There was an error. The system administrator was notified and working to solve this.' });
    }
        
  }
}
