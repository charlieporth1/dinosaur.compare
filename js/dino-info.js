function replaceAnimal(divId, dinoName) {
    setTimeout(function () {
        let animal = this.getAnimal(dinoName);
        //Root div
        const rootElement = document.querySelector(`#${divId}`);
        if (rootElement && animal) {

            const isHuman = animal.isHuman && dinoName.toString().toLowerCase() === "human";
            let name, diet = "";
            try {
                name = animal.name.charAt(0).toUpperCase() + animal.name.slice(1, animal.name.length - 1);
                diet = animal.diet.charAt(0).toUpperCase() + animal.diet.slice(1, animal.diet.length - 1);
            } catch (e) {
            }

            //Core data
            const title = rootElement.getElementsByClassName("dino-info-title")[0];
            const factP = rootElement.getElementsByClassName("dino-info-fact")[0];
            title.innerHTML = animal.name ? name : '';
            factP.innerHTML = animal.fact ? animal.fact : '';

            //Height weight data
            const heightP = rootElement.getElementsByClassName("dino-info-height")[0];
            const weightP = rootElement.getElementsByClassName("dino-info-weight")[0];
            heightP.innerHTML = humanifyHeight(animal.height);
            weightP.innerHTML = commafy(animal.weight) + " lbs";

            //Where when diet Data
            const whereP = rootElement.getElementsByClassName("dino-info-where")[0];
            const whenP = rootElement.getElementsByClassName("dino-info-when")[0];
            const dietP = rootElement.getElementsByClassName("dino-info-diet")[0];

            whereP.innerHTML = animal.where ? animal.where : '';
            whenP.innerHTML = animal.when ? animal.when : '';
            dietP.innerHTML = animal.diet ? diet : '';

            if (isHuman) {
                whenP.hidden = true;
                whereP.hidden = true;
                factP.hidden = true;
                dietP.innerHTML = animal.diet.toLowerCase() === "unselected" ? "Omnivore" : diet;
                !!name ? title.innerHTML = "Homo Spaien" : undefined;
            }
            try {
                const url = animal.imgUrl();
                const img = rootElement.getElementsByClassName("dino-info-img")[0];
                img.src = url;
                img.alt = `${animal.name} from ${animal.where}`
            } catch (e) {
                console.error("Could not find img " + e.toString())
            }
        } else {
            console.error(`Not found ${divId}`)
        }
    }, 1500)

}