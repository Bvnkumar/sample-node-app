exports.getUsers=(callback)=>{
    pool.query('SELECT * from  emp', function (error, results, fields) {
        if (error) callback(error)
        log.info("Result ",results)
        callback(null,results)
      })
}