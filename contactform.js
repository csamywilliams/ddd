var ContactForm = function() {

    let saveEntry = function(pool, form, res) {

        let entry = {
            name: form.fullname,
            email: form.email,
            message: form.message,
            contactStatus: 1
        };

        pool.query('INSERT INTO contact SET ?', entry, function (error, results, fields) {
            if (error) throw error;
            console.log(results.insertId);

            // res.render('pages/contact', page);
        });

        

        return;

    };

    return {
        saveEntry: saveEntry
    };
} () ;

module.exports = ContactForm;