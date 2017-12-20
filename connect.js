var mysql      = require('mysql');

var DatabaseConnection = function() {

    var pool  = mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : '<dbpassword>',
        database : 'DDDWales'
    });


    let getPool = function() {
        return pool;
    }

    let getSponsors = function() {

        queryDb('SELECT * from sponsors')
            .then(function(result) {
                dddwales['sponsors'] = result;
            })
            .catch(function(err) {
                console.log('Caught an error!', err);
            });
    };

    queryDb = function(query) {
        return new Promise(function(resolve, reject) {
            pool.query(query, function(err, rows, fields) {
                if (!err) {
                    resolve(rows);
                } else {
                    console.log('Error while performing Query.');
                    reject(err);
                }
            });
        });
    };

    return {
        getSponsors: getSponsors,
        getPool: getPool
    };
} () ;

module.exports = DatabaseConnection;