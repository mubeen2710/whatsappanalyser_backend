const fs = require('fs').promises;
const path = require('path');


const DATA_FILE = path.join(__dirname, 'data.txt');


readWhatsAppData = async () => {
    try {
        // reading data from file
    let values = await fs.readFile(DATA_FILE, 'utf8')
    // splitting data into lines
    let lines = values.split(/\r?\n/);
    let result = []
    // looping over each line to extract date and number
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].trim();
        // cheching is the current line has a phone number or not
        isValid = lines[i].indexOf('+91')
        // we only care about lines with phone numbers
        if (isValid !== -1) {
            // extracting date
            let date = lines[i].split(',')[0];
            let number 
            dash = lines[i].indexOf('-')
            isNew = false;
            // checking for colon to identify if its a new user or existing user
            isColon = lines[i].indexOf(':',dash)
            if(isColon !== -1){
                
                number = lines[i].substring(dash+1,isColon)
                number = number.trim()
            }else{
                // if colon not found then checking for keywords added or joined to identify new user
                let regex = /added|joined/;
                if(regex.test(lines[i])){
                    isNew = true;
                }
                nextChar = lines[i].slice(dash+1).match(/[^+\d\s]+/);
                number = lines[i].substring(dash+1,dash+nextChar.index)
                number = number.trim()
            }
            if(number){
                result.push({date:date,number:number,isNew:isNew})
            }
        }
    }
    return result
} catch (error) {
    console.error('Error reading WhatsApp data:', error);
    return [];
}
}
// single instance to store data and avoid multiple file reads
let data = []
/**
 * function to get WhatsApp chat data
 */
getWhatsAppData = async () => {
    if (data.length !== 0) {
        return data;
    }
    data = await readWhatsAppData();

    return data;

}

module.exports = { getWhatsAppData }




