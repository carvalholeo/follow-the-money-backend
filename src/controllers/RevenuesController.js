const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

module.exports = {
    async create(request, response) {
        try {
            const { source, revenue_category_id, expected_amount, paid_amount, expected_date, effective_date, reference_month, is_paid } = request.body;
            const authorization_id = request.headers.token;

            const created_at = new Date();
            const updated_at = new Date();

            const user_id = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');

            if (!user_id) {
                return response.status(401)
                    .json({ message: "Authorization token isn't valid. Login in the system and try again." });
            }

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
                throw new Exception();
            }

            return response.status(201).json({ message: 'Revenue added successfully.'});

        } catch (error) {

            return response.status(500).json({ error: "There was an error. The system administrator was notified and working to solve this." });
        }
    },
    
    async delete(request, response) {
        try {
            const { id } = request.params;
            const authorization_id = request.headers.token;

            const user_id = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');

            if (!user_id) {
                return response.status(401)
                    .json({ message: "Authorization token isn't valid. Login in the system and try again." });
            }

            const delete_revenue = await connection('revenues')
                .where({
                    id,
                    user_id
                })
                .del('*');

            if (delete_revenue) {
                return response.status(200)
                    .json({ message: "Revenue deleted successfully."});
            }
            return response.status(406)
                    .json({ message: "Expenses previously deleted." });
            
        } catch (error) {

            return response.status(400).json({ error: "There was an error. Probably, this revenue was deleted previously. Ask support to the system administrator." });
        }
    },

    async update(request, response) {
        try {
            const { source, revenue_category_id, expected_amount, paid_amount, expected_date, effective_date, reference_month, is_paid } = request.body;
            const { id } = request.params;
            const authorization_id = request.headers.token;

            const updated_at = new Date();

            const user_id = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');
            
            if (!user_id) {
                return response.status(401)
                    .json({ message: "Authorization token isn't valid. Login in the system and try again." });
            }

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
                    created_at,
                    updated_at
                });

            if(update == 1) {
                return response.status(200)
                    .json({ message: "Revenue updated successfully." });
            }
            return response.status(400)
                    .json({ message: "ID passed doesn't exist. Try again with a valid ID." });
        } catch (error) {
            return response.status(500)
                    .json({ message: "There was an error. The system administrator was notified and working to solve this." });
        }
        
    },

    async index(request, response) {
        try {
            const authorization_id = request.headers.token;
            const { page = 1 } = request.query;

            const user_id = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');
            
            if (!user_id) {
                return response.status(401)
                    .json({ message: "Authorization token isn't valid. Login in the system and try again." });
            }
            
            const [count] = await connection('revenues')
                .where({ user_id })
                .count();

            const revenues = await connection('revenues')
                .where({ user_id })
                .join('revenue_categories', 'revenue_categories.id', '=', 'revenues.revenue_category_id')
                .limit(25)
                .offset((page - 1) * 25)
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
            
            response.header('X-Total-Count', count['count(*)']);

            return response.status(200)
                    .json({ revenues });
        } catch (error) {
            console.log(error);
            return response.status(500)
                    .json({ message: "There was an error. The system administrator was notified and working to solve this." });
        }
        
    }
}