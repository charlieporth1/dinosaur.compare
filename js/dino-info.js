function replaceDino(divId, dinoName) {
     setTimeout(function() {
         const animal = this.getAnimal(dinoName);
         //Root div
         const rootElement = document.querySelector(`#${divId}`);
         //Core data
         rootElement.getElementsByClassName("dino-info-title")[0].innerHTML = animal.name;
         rootElement.getElementsByClassName("dino-info-fact")[0].innerHTML = animal.fact;
         //Height weight data
         rootElement.getElementsByClassName("dino-info-height")[0].innerHTML = this.commafy(animal.height) + " ft";
         rootElement.getElementsByClassName("dino-info-weight")[0].innerHTML = this.commafy(animal.weight) + " lbs";
         //Where when diet Data
         rootElement.getElementsByClassName("dino-info-where")[0].innerHTML = animal.where;
         rootElement.getElementsByClassName("dino-info-when")[0].innerHTML = animal.when;
         rootElement.getElementsByClassName("dino-info-diet")[0].innerHTML = animal.diet;
         try {
             const url = animal.imgUrl();
             console.log("url " +url);
             const img =  rootElement.getElementsByClassName("dino-info-img")[0];
             img.src = url;
             img.alt = `${animal.name} from ${animal.where}`
         } catch (e) {
             console.error("Could not find img "+ e.toString())
         }
     }, 1000)

 }