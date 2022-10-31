/**
 * @file Enumeration that contains three different account types.
 */

/**
 * @typedef AccountType Represent's the different types of accounts a user can create
 * @property {String} Personal an account created for recreational reasons.
 * @property {String} Academic an account created for educational purposes.
 * @property {String} Professional an account created for professional purposes.
 */

enum AccountType {
    Personal = 'PERSONAL',
    Academic = 'ACADEMIC',
    Professional = 'PROFESSIONAL'
};
export default AccountType;
