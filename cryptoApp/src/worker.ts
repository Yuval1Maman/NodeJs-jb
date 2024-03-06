import mysql from 'mysql2';
import util from 'util';
import config from 'config';
import mongoose from 'mongoose';
import getModel from './models/user-symbol/factory';
import getSymbolValueModel from './models/symbol-value/factory';
import axios from 'axios';
import cheerio  from 'cheerio';
import { io } from 'socket.io-client'

const socket = io(`ws://${config.get<string>('worker.io.host')}:${config.get<string>('worker.io.port')}`)

//mysql
const connection = mysql.createConnection(config.get('mysql'));
const connect = util.promisify(connection.connect).bind(connection);
const query = util.promisify(connection.query).bind(connection);

//mongo
const host = config.get<string>('mongo.host');
const port = config.get<string>('mongo.port');
const database = config.get<string>('mongo.database');
mongoose.connect(`mongodb://${host}:${port}/${database}`);


async function scrape(symbol:string){
    console.log(`scraping... ${symbol}`);
    const response = await axios(`https://www.google.com/finance/quote/${symbol}-USD`);
    const html = response.data;
    const $ = cheerio.load(html);
    const value = Number($('.YMlKec.fxKbKc').text().replace(',',''));
    console.log(value);
    
    await getSymbolValueModel().add({
        symbol,
        value,
        when: new Date()
    })

    socket.emit('update from worker', {
        symbol,
        value
    })

    return;
}


async function work(){
    try{
        const symbols = await getModel().getUniqueSymbols();
        const results = await Promise.allSettled(symbols.map(scrape))
        console.log(results)
    }
    catch(err){
        console.log(err)
    }
    finally{
        setTimeout(work,config.get<number>('worker.interval'))
    }
}

(async () => {
    // await Promise.all([
    //     connect(),
    //     mongoose.connect(`mongodb://${host}:${port}/${database}`)
    // ])
    work();
})();
