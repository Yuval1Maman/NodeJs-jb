const fs = require('fs/promises');


(async() => {
    const result = await fs.readFile('C:\\Users\\Jbt\\Desktop\\stam.txt', 'utf8');
    console.log(result);
})();