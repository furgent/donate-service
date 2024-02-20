import { Settings } from "../core/constants/settings";
import * as time from "../core/utils";

export class DonateList {
   #donates;
   #donateItemsHTML;

    static Text = {
        Spisok: 'Список донатов',
    }

    constructor (donates){
        this.#donates = donates;
    }

    #donateCreator(container){
        this.#donateItemsHTML.innerHTML = '';
        this.#donates.forEach((value) => {
            const amount = document.createElement('div');
            amount.className = 'donate-item';
            const creationTime = time.getFormattedTime(value.date);
            amount.textContent = `${creationTime} - ${value.amount} ${Settings.currency}`;
            container.append(amount);
        });
    }

    updateDonates(updatedDonates){
        this.#donates = updatedDonates;
        this.#donateCreator(this.#donateItemsHTML);
    }

    render(){
        const donatesContainer = document.createElement('div');
        donatesContainer.className = 'donates-container';

        const titleContainer = document.createElement('h2');
        titleContainer.className = 'donates-container__title';
        titleContainer.innerText = DonateList.Text.Spisok;

        this.#donateItemsHTML = document.createElement('div');
        this.#donateItemsHTML.className = 'donates-container__donates';

        donatesContainer.append(titleContainer, this.#donateItemsHTML);
        this.#donateCreator(this.#donateItemsHTML);
        
        return donatesContainer;
    }
}