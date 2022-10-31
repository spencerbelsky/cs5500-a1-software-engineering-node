/**
 * @file Enumeration that contains three different martial statuses.
 */

/**
 * @typedef MartialStatus Represent's the different types of relationship a user can have.
 * @property {String} Married a user with a spouse.
 * @property {String} Single a user down on their luck.
 * @property {String} Widowed a user whose spouse has passed away.
 */

enum MaritalStatus {
    Married = 'MARRIED',
    Single = 'SINGLE',
    Widowed = 'WIDOWED'
};
export default MaritalStatus;
