import contactServise from './db/contacts.js';
import { program } from 'commander';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contactServise.listContacts();
      return console.table(allContacts);

    case 'get':
      const currentContact = await contactServise.getContactById(id);
      return console.log(currentContact);

    case 'add':
      const newContact = await contactServise.addContact(name, email, phone);
      return console.log(newContact);

    case 'remove':
      const removeContact = await contactServise.removeContact(id);
      return console.log(removeContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
invokeAction(options);
