import { Settings } from "../core/constants/settings";

export class DonateForm {
    #donateForm;
    #totalAmountHTML;
    #maxdonate;
    #mindonate;
    #totalAmount;
    #createNewDonate;

    static TextObject = {
        DonateButtonText: 'Задонатить',
        InputLabel: `Введите сумму в ${Settings.currency}`,
    }

    static DefaultDonateValues = {
        min: 0,
        max: 100,
    }

    constructor(totalAmount, createNewDonate, maxdonate, mindaonate ){
        this.#maxdonate = maxdonate || DonateForm.DefaultDonateValues.max;
        this.#mindonate = mindaonate || DonateForm.DefaultDonateValues.min;   
        this.#totalAmount = totalAmount; 
        this.#createNewDonate = createNewDonate;
    }

    #renderInputLabel() {
        const inputLabel = document.createElement('label');
        inputLabel.className = "donate-form__input-label";
        inputLabel.textContent = DonateForm.TextObject.InputLabel;

        const input = document.createElement('input');
        input.className = 'donate-form__donate-input';
        input.name = 'amount';
        input.type = 'number';
        input.max = this.#maxdonate;
        input.min = this.#mindonate;;
        input.required = 'required';

        inputLabel.append(input);

        return inputLabel;
    }

    #renderDonateButton() {
        const donateButton = document.createElement('button');
        donateButton.className = 'donate-form__submit-button';
        donateButton.type = 'submit';
        donateButton.innerText = DonateForm.TextObject.DonateButtonText;

        return donateButton;
    }

    updateTotalAmount(newAmount){
        this.#totalAmountHTML.textContent = `${newAmount} ${Settings.currency}`;
    }

    #onCreateNewDonateSubmit(event){
        event.preventDefault();
        const newDonateValue = Number(event.target.amount.value);
        if(newDonateValue && this.#createNewDonate){
            const newDonate = {
                date: new Date(),
                amount: newDonateValue,
            };
            this.#createNewDonate(newDonate);
            event.target.amount.value = '';
        }
    }

    render(){
        this.#donateForm = document.createElement('form');
        this.#donateForm.className = 'donate-form';
        this.#donateForm.addEventListener('submit', this.#onCreateNewDonateSubmit.bind(this));

        this.#totalAmountHTML = document.createElement('h1'); 
        this.#totalAmountHTML.id = 'total-amount';
        this.updateTotalAmount(this.#totalAmount);

        const InputLabel = this.#renderInputLabel();
        const DonateButton = this.#renderDonateButton();

        this.#donateForm.append(this.#totalAmountHTML, InputLabel, DonateButton);   
        
        return this.#donateForm;
    }
}

