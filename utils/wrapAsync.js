function wrapAsync(fn)
{
    return function(req, res, next){
        fn(req, res, next).catch(next);
    }
}

module.exports = wrapAsync;

// or we can write this

// module.exports = (fn) =>
// {
//     return function(req, res, next) =>{
//         fn(req, res, next).catch(next);
//     }
// }