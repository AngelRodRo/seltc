var Seltc = (function (){

    var seltcs = [];

    var init = function(){
        var elements = document.getElementsByClassName("selectize-input");
        for (var index = 0, element; element = elements[index]; index++) {
            seltcs.push(_genSelect(element)) ;
        }
    }


    // var searchElements = function(params){

    //     new Promise(function(resolve,reject){
    //         var xhttp = new XMLHttpRequest();
    //         xhttp.open("GET","/features",true);
    //         xhttp.setRequestHeader("Content-Type","application/json");
    //         xhttp.onload = function(res){
    //             resolve();                
    //         }
    //         xhttp.onerror = function(){
    //             reject();
    //         }
    //         xhttp.send(params);

    //     });
    // }

    var _genSelect = function(element){

        element.style.display = "none";

        var isClickedAnyOption = false;

        var selectedItems = [],selectedItemsIds=[];

        var insertAfter =  function (newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }

        var values = [
            {
                _id:1,
                name:"Rojo"
            },
            {
                _id:2,
                name:"Grande"
            },
            {
                _id:3,
                name:"Ancho"
            },{
                _id:4,
                name:"Pelo aspero"
            },
            {
                _id:5,
                name:"Chitzu"
            },
            {
                _id:6,
                name:"Enfermo"
            }];

        var container = document.createElement("DIV");
        container.style.width = "100%";
        container.style.height = "45px";

        var containerValues = document.createElement("DIV");
        var inputValue = document.createElement("INPUT");
        var listOptions = document.createElement("UL");
        inputValue.style.width = "100px";

        containerValues.className = "sl-values";
        containerValues.appendChild(inputValue);
        listOptions.className = "sl-options";

        container.appendChild(containerValues);
        container.appendChild(listOptions);

        insertAfter(container,element);

        inputValue.addEventListener('keypress',function(e){
            console.log(e);
            if(e.charCode==13){
                var optionName = this.value;
                var optionDiv = document.createElement("DIV");

                optionDiv.onclick = function(){
                    var index = selectedItems.indexOf(optionName);
                    if(index>=0) selectedItems.splice(index,1);
                    optionDiv.remove();
                }

                optionDiv.innerHTML = optionName;
                if(selectedItems.indexOf(optionName)>=0) return;
                selectedItems.push(optionName);
                containerValues.insertBefore(optionDiv,containerValues.childNodes[0]);
            }

        });

        inputValue.addEventListener("focus",function(){
            listOptions.style.display = "block";
            isClickedAnyOption = false;
        });

        inputValue.addEventListener("blur",function(){
            setTimeout(function(){
                if(!isClickedAnyOption)  listOptions.style.display = "none";
            },100)
        })

        inputValue.addEventListener('keyup', function(e){
            var field = e.target;
            inputValue.offsetWidth += inputValue.offsetWidth * field.length*3;
            var results = [];            
            for (var i = 0,value; value = values[i]; i++) {
                if(value.name.toLowerCase().indexOf(field.value.toLowerCase()) >= 0) results.push(value)
            }

            if (!field.value) {
                if(selectedItems.length) containerValues.childNodes[selectedItems.length-1].remove();
                selectedItems.splice(selectedItems.length-1,1);
            }


            while (listOptions.firstChild) {
                listOptions.removeChild(listOptions.firstChild);
            }
            
            for (var i = 0, result; result = results[i]; i++) {
                var option = document.createElement("LI");
                option.setAttribute("option-name",result.name);
                option.setAttribute("option-id",result._id);
                option.onclick = function () {   
                    
                    isClickedAnyOption = true;
                    inputValue.value = "";
                    listOptions.style.display = "none";
                    var optionName = this.getAttribute("option-name");
                    var optionId = this.getAttribute("option-id")
                    var optionDiv = document.createElement("DIV");
                    isClickedAnyOption = true;
                    optionDiv.onclick = function(){
                        var index = selectedItems.indexOf(optionName);
                        selectedItems.splice(index,1);
                        selectedItemsIds.splice(index,1)
                        optionDiv.remove();
                    }

                    optionDiv.innerHTML = optionName;
                    if(selectedItems.indexOf(optionName)>=0) return;
                    selectedItems.push(optionName);
                    selectedItemsIds.push(optionId)
                    containerValues.insertBefore(optionDiv,containerValues.childNodes[0]);
                    isClickedAnyOption = false;
                    

                }
                option.innerHTML = result.name;
                listOptions.appendChild(option);                
            }

        })      

        var reset = function(){
            
        }  

        return {
            selectedItems: selectedItems,
            selectedItemsIds: selectedItemsIds,
            container: container,
            reset: reset
        }
    }


    init();

    return seltcs;
})