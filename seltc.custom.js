//Mini Underscore 

Array.prototype.oIndexOf = function(condition){
    let objects = this;
    for (var i = 0, object; object=objects[i]; i++) {
        console.log(object)
        if(condition(object)) return i;                
    }
}


var Seltc = (function (){

    var seltcs = [];

    var containerValues = document.createElement("DIV"),
        inputValue = document.createElement("INPUT"),
        listOptions = document.createElement("UL");
    
    var selectedOptions = [];
        
    
    var options = [
        {
            id:1,
            name:"Rojo"
        },
        {
            id:2,
            name:"Grande"
        },
        {
            id:3,
            name:"Ancho"
        },{
            id:4,
            name:"Pelo aspero"
        },
        {
            id:5,
            name:"Chitzu"
        },
        {
            id:6,
            name:"Enfermo"
        }];

    var availableOptions = options;
    
    var init = function(){
        let elements = document.getElementsByClassName("selectize-input");
        for (let index = 0, element; element = elements[index]; index++) {
            seltcs.push(_genSelect(element)) ;
        }
    }
    var count = 0;

    var clearList  = function(){
        while (listOptions.firstChild) {
            listOptions.removeChild(listOptions.firstChild);
        }
    }

    var SeltcEvents = {
        keyup(e){
            let field = e.target;
            let results = [];            

            //Calculate input width from options selected
            inputValue.offsetWidth += inputValue.offsetWidth * field.length*3;
            console.log(options)
            //Check if the input's value match with an any existing option in the initial array
            for (let i = 0,option; option = availableOptions[i]; i++) {
                if(option.name.toLowerCase().indexOf(field.value.toLowerCase()) >= 0) results.push(option)
            }

            if (!field.value) {
                count++;
                if(count==2){
                    if(selectedOptions.length) containerValues.childNodes[selectedOptions.length-1].remove();
                    let option = selectedOptions[selectedOptions.length-1];
                    selectedOptions.splice(selectedOptions.length-1,1);
                    availableOptions.push(option);
                    count = 0;                        
                }            
            }else{
                count = 0;                
            }


            clearList();
            
            for (var i = 0, result; result = results[i]; i++) {
                let optionItem = document.createElement("LI");
                optionItem.setAttribute("option-name",result.name);
                optionItem.setAttribute("option-id",result.id);
                optionItem.onclick = function () {   

                    clearList();

                    isClickedAnyOption = true;
                    inputValue.value = "";
                    listOptions.style.display = "none";
                    
                    let name = this.getAttribute("option-name");
                    let id = this.getAttribute("option-id");

                    let option = {id,name};

                    var optionDiv = document.createElement("DIV");
                    isClickedAnyOption = true;


                    optionDiv.onclick = function(){
                        var index = selectedOptions.oIndexOf((v)=> v.id == option.id);
                        selectedOptions.splice(index,1);
                        availableOptions.push(option);
                        optionDiv.remove();

                       
                    }

                    // Check if the option selected exist in the option's list for delete it 
                    // of available options
                    let index = availableOptions.oIndexOf((v)=> v.id == option.id );
                    availableOptions.splice(index,1);
                    
                    optionDiv.innerHTML = option.name;
                    if(selectedOptions.oIndexOf((v)=> v.id == option.id )>=0) return;

                    selectedOptions.push(option);

                    containerValues.insertBefore(optionDiv,inputValue);
                    isClickedAnyOption = false;
                }
                optionItem.innerHTML = result.name;
                listOptions.appendChild(optionItem);                
            }

        },
        keypress(e){
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
        },
        focus(){
            listOptions.style.display = "block";
            isClickedAnyOption = false;
        },
        blur(){
            setTimeout(function(){
                if(!isClickedAnyOption)  listOptions.style.display = "none";
            },100)
        }
    }

    var _genSelect = function(element){

        element.style.display = "none";

        var isClickedAnyOption = false;


        var insertAfter =  function (newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }



        
        let container = document.createElement("DIV");
        container.style.width = "100%";
        container.style.height = "45px";

        // Create components for select
        

        inputValue.style.width = "100px";

        containerValues.className = "sl-values";
        containerValues.appendChild(inputValue);
        listOptions.className = "sl-options";

        container.appendChild(containerValues);
        container.appendChild(listOptions);

        insertAfter(container,element);

        inputValue.addEventListener('keypress',SeltcEvents.keypress);
        inputValue.addEventListener("focus", SeltcEvents.focus);
        inputValue.addEventListener("blur",SeltcEvents.blur);
        inputValue.addEventListener('keyup', SeltcEvents.keyup);      

        var reset = function(){
            
        }  

        return {
            selectedOptions: selectedOptions,
            container: container,
            reset: reset
        }
    }


    init();

    return seltcs;
})