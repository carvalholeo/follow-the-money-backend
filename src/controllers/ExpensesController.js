const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

module.exports = {
    async create(request, response) {
        try {
            const { source, expense_type_id, expense_category_id, expected_amount, paid_amount, due_date, payday, reference_month, is_paid } = request.body;
            const authorization_id = request.headers.token;

            const created_at = new Date();
            const updated_at = new Date();

            const [{ user_id }] = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');

            if (!user_id) {
                return response.status(401)
                    .json({ message: "Authorization token isn't valid. Login in the system and try again." });
            }

            const [permission] = await connection('users')
                .where({'users.id': user_id})
                .join('permissions', 'users.permission_id', '=', 'permissions.id')
                .select([
                    'permissions.is_admin',
                    'users.is_active'
                ]);

            if(!permission.is_active) {
                return response.status(403)
                    .json({ message: "Your user is blocked. If you think that it's an error, contact system administrator to support." });
            }

            const expenses_added = await connection('expenses')
                .insert({
                source,
                expense_type_id,
                expense_category_id,
                expected_amount,
                paid_amount,
                due_date,
                payday,
                reference_month,
                is_paid,
                user_id,
                created_at,
                updated_at
                });

            if (!expenses_added) {
                throw new Exception();
            }

            return response.status(201).json({ message: 'Expense added successfully.'});

        } catch (error) {

            return response.status(500).json({ error: "There was an error. The system administrator was notified and working to solve this." });
        }
    },
    
    async delete(request, response) {
        try {
            const { id } = request.params;
            const authorization_id = request.headers.token;

            const [{ user_id }] = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');

            if (!user_id) {
                return response.status(401)
                    .json({ message: "Authorization token isn't valid. Login in the system and try again." });
            }

            const [permission] = await connection('users')
                .where({'users.id': user_id})
                .join('permissions', 'users.permission_id', '=', 'permissions.id')
                .select([
                    'permissions.is_admin',
                    'users.is_active'
                ]);

            if(!permission.is_active) {
                return response.status(403)
                    .json({ message: "Your user is blocked. If you think that it's an error, contact system administrator to support." });
            }

            const delete_expenses = await connection('expenses')
                .where({
                    id,
                    user_id
                })
                .del('*');

            if (delete_expenses) {
                return response.status(200)
                    .json({ message: "Expenses deleted successfully."});
            }
            return response.status(406)
                    .json({ message: "Expenses previously deleted." });
            
        } catch (error) {

            return response.status(400).json({ error: "There was an error. Probably, this expense was deleted previously. Ask support to the system administrator." });
        }
    },

    async update(request, response) {
        try {
            const { source, expense_type_id, expense_category_id, expected_amount, paid_amount, due_date, payday, reference_month, is_paid } = request.body;
            const { id } = request.params;
            const authorization_id = request.headers.token;

            const updated_at = new Date();

            const [{ user_id }] = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');
            
            if (!user_id) {
                return response.status(401)
                    .json({ message: "Authorization token isn't valid. Login in the system and try again." });
            }

            const [permission] = await connection('users')
                .where({'users.id': user_id})
                .join('permissions', 'users.permission_id', '=', 'permissions.id')
                .select([
                    'permissions.is_admin',
                    'users.is_active'
                ]);

            if(!permission.is_active) {
                return response.status(403)
                    .json({ message: "Your user is blocked. If you think that it's an error, contact system administrator to support." });
            }

            const update = await connection('expenses')
                .where({
                    id,
                    user_id
                })
                .update({
                    source,
                    expense_type_id,
                    expense_category_id,
                    expected_amount,
                    paid_amount,
                    due_date,
                    payday,
                    reference_month,
                    is_paid,
                    updated_at
                    });

            if(update == 1) {
                return response.status(200)
                    .json({ message: "Expense updated successfully." });
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

            const [{ user_id }] = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');
            
            if (!user_id) {
                return response.status(401)
                    .json({ message: "Authorization token isn't valid. Login in the system and try again." });
            }

            const [permission] = await connection('users')
                .where({'users.id': user_id})
                .join('permissions', 'users.permission_id', '=', 'permissions.id')
                .select([
                    'permissions.is_admin',
                    'users.is_active'
                ]);

            if(!permission.is_active) {
                return response.status(403)
                    .json({ message: "Your user is blocked. If you think that it's an error, contact system administrator to support." });
            }
            
            const [count] = await connection('expenses')
                .where({ user_id })
                .count();

            const expenses = await connection('expenses')
                .where({ user_id })
                .join('expense_types', 'expense_types.id', '=', 'expenses.expense_type_id')
                .join('expense_categories', 'expense_categories.id', '=', 'expenses.expense_category_id')
                .limit(25)
                .offset((page - 1) * 25)
                .select([
                    'expenses.source',
                    'expense_types.name',
                    'expense_categories.name',
                    'expenses.expected_amount',
                    'expenses.paid_amount',
                    'expenses.due_date',
                    'expenses.payday',
                    'expenses.reference_month',
                    'expenses.is_paid',
                    'expenses.created_at',
                    'expenses.updated_at'
                ]);
            
            response.header('X-Total-Count', count['count(*)']);

            return response.status(200)
                    .json({ expenses });
        } catch (error) {
            console.log(error);
            return response.status(500)
                    .json({ message: "There was an error. The system administrator was notified and working to solve this." });
        }
        
    }
}