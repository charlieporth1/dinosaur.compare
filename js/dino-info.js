function replaceAnimal(divId, dinoName) {
    setTimeout(function () {
        let animal = this.getAnimal(dinoName);
        //Root div
        const rootElement = document.querySelector(`#${divId}`);
        if (rootElement && animal) {

            const isHuman = animal.isHuman && dinoName.toString().toLowerCase() === "human";
            let name, diet = "";
            try {
                diet = animal.diet.charAt(0).toUpperCase() + animal.diet.slice(1, animal.diet.length - 1);
                name = this.titleCase(animal.name.charAt(0).toUpperCase() + animal.name.slice(1, animal.name.length - 1));
            } catch (err) {
                console.error(err);
            }

            //Core data
            const title = rootElement.getElementsByClassName("dino-info-title")[0];
            const factP = rootElement.getElementsByClassName("dino-info-fact")[0];
            title.innerHTML = animal.name || '';
            factP.innerHTML = animal.fact || '';

            //Height weight data
            const heightP = rootElement.getElementsByClassName("dino-info-height")[0];
            const weightP = rootElement.getElementsByClassName("dino-info-weight")[0];
            heightP.innerHTML = this.humanifyHeight(animal.height);
            weightP.innerHTML = this.commafy(animal.weight) + " lbs";

            //Where when diet Data
            const whereP = rootElement.getElementsByClassName("dino-info-where")[0];
            const whenP = rootElement.getElementsByClassName("dino-info-when")[0];
            const dietP = rootElement.getElementsByClassName("dino-info-diet")[0];

            whereP.innerHTML = animal.where || '';
            whenP.innerHTML = animal.when || '';
            dietP.innerHTML = animal.diet || '';

            if (isHuman) {
                whenP.hidden = true;
                whereP.hidden = true;
                factP.hidden = true;
                dietP.innerHTML = animal.diet.toLowerCase() === "unselected" ? "Omnivore" : diet;
                if (this.isEmpty(name)) {
                    title.innerHTML = "Homo Spaien";
                }
            }
            try {
                const url = animal.imgUrl();
                const img = rootElement.getElementsByClassName("dino-info-img")[0];
                img.src = url;
                img.alt = `${animal.name} from ${animal.where}`;
            } catch (error) {
                console.error("Could not find img " + error.toString());
            }
        } else {
            console.error(`Not found ${divId}`);
        }
    }, 1500);

}