module.exports = function(err, req, res, next) {
    console.log(err);
    if (err.resource) {
        res.status(404).json({
            message: "La URI solicitada no existe."
        });
    } else if (err.status) {
        res.status(err.status).json({
            message: err.message,
            error: err.error
        });
    } else if (err.length) {
        var item, array = [];
        for (item of err) {
            array.push(item.msg);
        }
        res.status(400).json({
            message: array[0],
            error: array
        });
    } else {
        res.status(500).json({
            message: 'Internal Server Error',
            error: err
        });
    }
}; 