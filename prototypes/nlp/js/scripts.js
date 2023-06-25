//example page call idpo.html?propertyName=456MainStreet&clientName=DunderMifflin

function parseQueryItems(){
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      let propName = params.propertyName;
      let clientN = params.clientName;
      let chairs = params.chairs;
      console.log(propName);
      console.log(clientN);
      console.log(chairs);
      document.getElementsByTagName("title")[0].innerHTML = `Purchase Order ${propName}`;
      document.getElementById("clientName").innerHTML = clientN;
      document.getElementById("POdate").innerHTML = getDate();    
}

function getDate(){
    const date = new Date();
    let day = String(date.getDate()).padStart(2,'0');
    let month = String(date.getMonth()+1).padStart(2,'0');
    let year = date.getFullYear();
    let datestr = `${month}/${day}/${year}`;
    return datestr;
}
