var config = {
    development: {
        //url to be used in link generation
        url: 'http://my.site.com',
        //mongodb connection settings
        database: {
            host: '127.0.0.1',
            port: '27017',
            db: 'pizza_club'
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '3422'
        },
        user: 'james123',
        password: 'james123'
    }
};
module.exports = config;
// "mongodb+srv://james123:james123@cluster0-zljzo.mongodb.net/pizza_club?retryWrites=true&w=majority"