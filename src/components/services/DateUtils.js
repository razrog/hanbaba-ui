/* eslint-disable */

export default class DateUtils{

    /**
     *
     * @param date {Date}
     * @returns {String}
     */
    static getDateAsSimpleString(date) {
        return date.getFullYear() + "-" + this.padString( date.getMonth() + 1, 2 ) + "-" + this.padString( date.getDate(), 2 );
    }

    /**
     *
     * @param str {String | Number}
     * @param length {int}
     * @returns {string}
     */
    static padString(str, length) {
        str = str.toString();
        return str.length < length ? this.padString("0" + str, length) : str;
    }
}
