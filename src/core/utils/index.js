export const calculateSumOfNumbers = (numbers) => numbers.reduce((acc, cur) => acc + cur, 0);
    
    // cчитает сумму всех элементов массива и
    // возвращает ее итоговое значение


import moment from "moment";
import 'moment-precise-range-plugin';

export const getFormattedTime = (date) => {
    // форматировать дату и время 
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}

