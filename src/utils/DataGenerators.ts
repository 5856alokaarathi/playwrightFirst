
const {faker} = require('@faker-js/faker');

interface UserProfile{
    firstName : string;
    lastName : string;
    postalCode: string;
}
export const DataGenerators = {

    generateCheckoutCustomer(): UserProfile {
        return {
            firstName : faker.name.firstName(),
            lastName : faker.name.lastName(),
            postalCode : faker.address.zipCode()
        };
    }


}



