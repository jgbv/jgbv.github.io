//example page call nlpdata.html?propertyName=456MainStreet&clientName=DunderMifflin
//file:///C:/bvpy/NLP_SetDress_Data/html/idpo.html?propertyName=456MainStreet&clientName=DunderMifflin&chairs=img_AluChair_HermanMiller_11_33.00,img_ConferenceTable_Ikea_2_5600.00,img_SwedishChair_Ikea_4_44.45
function parseQueryItems(){
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      let prompt = params.prompt;
      let numppl = params.numppl;
      let propName = params.propertyName;
      let clientN = params.clientName;
      let ffeStr = params.ffe;
      var ffes = ffeStr.split(",")
      console.log(propName);
      console.log(clientN);
      console.log(ffes);
      document.getElementsByTagName("title")[0].innerHTML = `Purchase Order ${propName}`;
      document.getElementById("clientName").innerHTML = clientN;
      document.getElementById("POdate").innerHTML = getDate();    
      document.getElementById("prompt").innerHTML = prompt;
      document.getElementById("maxppl").innerHTML = `Maximum occupancy: ${numppl}`;
      
      var polist = document.getElementById("poitems");
      var c;
      var ffeLabels = [];
      var ffeCounts = [];
      var ffeCosts = 0;
      for (var i=0; i < ffes.length; i++){
        c = ffes[i].split("_");
        
        var rowimg = `<td class="rowimg">${c[0]}</td>`;
        var itemName = `<td class="itemName">${c[1]}</td>`;
        ffeLabels.indexOf(itemName) === -1 ? ffeLabels.push(c[1]) : console.log("already added");
        var supplierName = `<td class="supplierName">${c[2]}</td>`;
        var itemQuantity = `<td class="itemQuantity">${c[3]}</td>`;
        ffeCounts.push(parseInt(c[2]))
        var itemCost = `<td class="itemCost">$${c[4]}</td>`;
        ffeCosts += parseFloat(c[4])
        var elementList = `<tr>${rowimg}${itemName}${supplierName}${itemQuantity}${itemCost}</tr>`;
        polist.insertAdjacentHTML("beforeend", elementList);
      }
      
      document.getElementById("fsubtotal").innerHTML = ffeCosts;
      var processingfee = 100.00;
      var shippingfee = 1683.31;
      document.getElementById("ftotal").innerHTML = ffeCosts+processingfee+shippingfee;

    //   var randoms = Array(ffeLabels.length).fill(0).map(makeARandomNumber);
      var barColors = Array(ffeLabels.length).fill(0).map(Math.floor(Math.random()*16777215).toString(16));

    //   var barColors = [
    //     "#b91d47",
    //     "#00aba9",
    //     "#2b5797",
    //     "#e8c3b9",
    //     "#1e7145"
    //   ];

      new Chart("pieChart", {
        type: "pie",
        data: {
          labels: ffeLabels,
          datasets: [{
            backgroundColor: barColors,
            data: ffeCounts
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
