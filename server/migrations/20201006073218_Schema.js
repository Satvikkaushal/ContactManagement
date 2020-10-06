exports.up = function (knex, Promise) {
    return knex.schema.createTable('userInfo', function (table) {
        table.string('username').notNullable()
        table.increments('id').primary()
        table.string('email').notNullable()
        table.string('PhoneNumber').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
        .createTable('userAlternateNumbers', function (table) {
            table.string('AlternateNo').notNullable()
            table.integer('user_id').unsigned().index().references('id').inTable('userInfo');
        })
        .createTable('userAlternateEmail', function (table) {
            table.string('AlternateEmail').notNullable()
            table.integer('user_id').unsigned().index().references('id').inTable('userInfo');
        })
        .createTable('Admins', function (table) {
            table.increments('id').primary()
            table.string('username').notNullable()
            table.string('password').notNullable()
            table.string('name').notNullable()
        })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('userAlternateEmail').dropTableIfExists('userAlternateNumbers')
        .dropTableIfExists('userInfo').dropTableIfExists('Admins');
};
