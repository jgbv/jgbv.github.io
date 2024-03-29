//example page call idpo.html?propertyName=456MainStreet&clientName=DunderMifflin
//file:///C:/bvpy/NLP_SetDress_Data/html/idpo.html?propertyName=456MainStreet&clientName=DunderMifflin&chairs=img_AluChair_HermanMiller_11_33.00,img_ConferenceTable_Ikea_2_5600.00,img_SwedishChair_Ikea_4_44.45
function parseQueryItems(){
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      let propName = params.propertyName;
      let clientN = params.clientName;
      let chairStr = params.chairs;
      var chairs = chairStr.split(",")
      console.log(propName);
      console.log(clientN);
      console.log(chairs);
      document.getElementsByTagName("title")[0].innerHTML = `Purchase Order ${propName}`;
      document.getElementById("clientName").innerHTML = clientN;
      document.getElementById("POdate").innerHTML = getDate();    
      
      var polist = document.getElementById("poitems");
      var c;
      var chairdata = [];
      for (var i=0; i < chairs.length; i++){
        c = chairs[i].split("_");
        
        var rowimg = `<td class="rowimg">${c[0]}</td>`;
        var itemName = `<td class="itemName">${c[1]}</td>`;
        chairdata.indexOf(itemName) === -1 ? chairdata.push(c[1]) : console.log("already added");
        var supplierName = `<td class="supplierName">${c[2]}</td>`;
        var itemQuantity = `<td class="itemQuantity">${c[3]}</td>`;
        var itemCost = `<td class="itemCost">$${c[4]}</td>`;
        var elementList = `<tr>${rowimg}${itemName}${supplierName}${itemQuantity}${itemCost}</tr>`;
        polist.insertAdjacentHTML("beforeend", elementList);
      }
      
      var randoms = Array(chairdata.length).fill(0).map(makeARandomNumber);

      var barColors = [
        "#b91d47",
        "#00aba9",
        "#2b5797",
        "#e8c3b9",
        "#1e7145"
      ];

      new Chart("myChart", {
        type: "pie",
        data: {
          labels: chairdata,
          datasets: [{
            backgroundColor: barColors,
            data: randoms
          }]
        },
        options: {
          title: {
            display: true,
            text: clientN
          }
        }
      });


}

var makeARandomNumber = function(){
  return Math.floor(Math.random() * 9);
}


function getDate(){
    const date = new Date();
    let day = String(date.getDate()).padStart(2,'0');
    let month = String(date.getMonth()+1).padStart(2,'0');
    let year = date.getFullYear();
    let datestr = `${month}/${day}/${year}`;
    return datestr;
}
