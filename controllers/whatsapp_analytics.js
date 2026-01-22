const { getWhatsAppData } = require('../utils/whatsapp_data')

/**
 * function to get active WhatsApp users graph data
 * @returns graph data and active users list
 */
const activeUserGraphData =async () =>{
      // getting chat data
      let chats =await getWhatsAppData();
      // calculating index of last data
      let i=chats.length-1
      // initiating graph data and active users array
      let graphData = []
      let activeArray = []
      // as we required last 7 days data and it is already sorted we are iterating from last
      while(i>=0){
        let date = chats[i].date;
        // creating set to store unique active users
        let set = new Set()
        let newUsers =0;
        // inner loop to get all users in that date
        while(i>=0 && chats[i].date === date){
            if(chats[i].isNew){
                newUsers +=1
            }else{
                set.add(chats[i].number)
            }
            i--
        }

        graphData.push({date:date,activeUsers:set.size,newUsers:newUsers})
        // adding each day active users
        activeArray.push({date:date,activeUsers:set})
        if(graphData.length===7){
            break;
        }
      }
      // logic for active users for 4 or more days in the last 7 days
      // object to store user and their active day count
      let userDayCount = {}
      let activeusers =[]
      for(let j=0;j<activeArray.length;j++){
         for (const value of activeArray[j].activeUsers) {
          // adding count if user already exists else initializing count
          if(userDayCount[value]){
            userDayCount[value] +=1
          }
            else{   
            userDayCount[value] =1
            }
            if(userDayCount[value]===4){
              activeusers.push(value)
              userDayCount[value]=0
            }
        }
      }

      return {graphData:graphData.reverse(),activeusers}
      
}

module.exports = { activeUserGraphData }