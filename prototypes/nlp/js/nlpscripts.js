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
      let sqft = params.sqft;

      var baseRentperSqft = 200;

      var sqftsplit = sqft.split(",");

      let ffeStr = params.ffe;
      var ffes = ffeStr.split(",");
      console.log(propName);
      console.log(clientN);
      console.log(ffes);
      document.getElementsByTagName("title")[0].innerHTML = `BeyondView Buildout ${propName}`;
      document.getElementById("clientName").innerHTML = clientN;
      document.getElementById("POdate").innerHTML = getDate();    
      document.getElementById("prompt").innerHTML = prompt;
      document.getElementById("maxppl").innerHTML = `<b>Maximum occupancy</b>: ${numppl}`;
      
      sqfthtml = document.getElementById("sqft");

      var totalsqft = 0;

      for (var i=0; i<sqftsplit.length; i++){
        sqftpart = sqftsplit[i].split("~");
        var sqftval = parseFloat(sqftpart[1]).toFixed(2);
        var sqellist = `<p><b>${sqftpart[0].replace("-"," ")}</b>: ${sqftval}ft<sup>2</sup></p>`;
        sqfthtml.insertAdjacentHTML("beforeend", sqellist);
        totalsqft+=parseFloat(sqftpart[1]);
      }

      

      var polist = document.getElementById("poitems");
      var c;
      var ffeLabels = [];
      var ffeTrack = {};
      var ffeCounts = []
      var ffeCosts = 0;
      var countnum = 0;
      for (var i=0; i < ffes.length; i++){
        c = ffes[i].split("~");
        
        var rowimg = `<td class="rowimg">${c[0]}</td>`;
        var capsname = c[1].charAt(0).toUpperCase() + c[1].slice(1);
        var itemName = `<td class="itemName">${capsname.replace("_"," ")}</td>`;
        var category = c[1].split("_")[0];
        
        var supplierName = `<td class="supplierName">${c[2]}</td>`;
        var itemQuantity = `<td class="itemQuantity">${c[3]}</td>`;
        
        countnum = parseInt(c[3]);

        if(ffeTrack.hasOwnProperty(category)){
            ffeTrack[category]+=1;
        } else {
            ffeTrack[category] = 1;
        }

        var itemCost = `<td class="itemCost">$${c[4]}</td>`;
        var calctotalItemCost = parseInt(c[3]) * parseFloat(c[4]);
        var totalItemCost = `<td class="itemTotalCost">$${calctotalItemCost.toFixed(2)}</td>`;
        ffeCosts += parseFloat(c[4])*parseFloat(c[3]);
        var elementList = `<tr>${rowimg}${itemName}${supplierName}${itemQuantity}${itemCost}${totalItemCost}</tr>`;
        polist.insertAdjacentHTML("beforeend", elementList);
      }
      console.log(ffeTrack.keys);
      for(var i=0; i<Object.keys(ffeTrack).length; i++){
        var fcat = Object.keys(ffeTrack)[i];
        ffeLabels.push(fcat);
        ffeCounts.push(ffeTrack[fcat]);
      }

      document.getElementById("fsubtotal").innerHTML = `$${ffeCosts.toFixed(2)}`;
      var processingfee = 100.29;
      var shippingfee = 1683.31;
      document.getElementById("ffees").innerHTML = `$${processingfee}`;
      document.getElementById("fship").innerHTML = `$${shippingfee}`;
      var total = ffeCosts+processingfee+shippingfee;
      document.getElementById("ftotal").innerHTML = `$${total.toFixed(2)}`;

    //   var randoms = Array(ffeLabels.length).fill(0).map(makeARandomNumber);
      var pieColors = Array(ffeLabels.length).fill(0).map(getRandHexColor);
    //   console.log(`barColors: ${pieColors}`);
    //   var pieColors = [
    //     "#b91d47",
    //     "#00aba9",
    //     "#2b5797",
    //     "#e8c3b9",
    //     "#1e7145"
    //   ];

      console.log(`ffeLabels: ${ffeLabels}`);
      console.log(`ffeCounts: ${ffeCounts}`);

      new Chart("pieChart", {
        type: "pie",
        data: {
          labels: ffeLabels,
          datasets: [{
            backgroundColor: pieColors,
            data: ffeCounts
          }]
        },
        options: {
            legend:{
                position: "right"
                // display: false
            },
          title: {
            display: false,
            text: clientN
          }
        }
      });

      var extraCalcs = 75000; 
      var alltotal = total+extraCalcs;
      var barColors = Array(ffeLabels.length).fill(0).map(getRandHexColor);
      var areacalcs = parseInt(alltotal/totalsqft);
      console.log(`${total} | ${totalsqft} | ${areacalcs}`);
      var bardata = [areacalcs, baseRentperSqft];
      var barlabels = ["Buildout Cost/sqft", "Base Rent/sqft"]
      new Chart("barChart", {
        type: "bar",
        data: {
          labels: barlabels,
          datasets: [{
            backgroundColor: barColors,
            data: bardata
          }]
        },
        options: {
            legend:{
                position: "right",
                display: false
            },
            title: {
                display: false,
                text: clientN
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
      });


}

var makeARandomNumber = function(){
  return Math.floor(Math.random() * 9);
}

var getRandHexColor = function(){
    var hexval = Math.floor(Math.random()*16777215).toString(16); 
    return `#${hexval}`;
}

function getDate(){
    const date = new Date();
    let day = String(date.getDate()).padStart(2,'0');
    let month = String(date.getMonth()+1).padStart(2,'0');
    let year = date.getFullYear();
    let datestr = `${month}/${day}/${year}`;
    return datestr;
}
