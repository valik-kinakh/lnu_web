// Factory pattern
interface Pizza {
    prepare(): void;
    bake(): void;
    cut(): void;
    box(): void;
}

class MargheritaPizza implements Pizza {
    prepare(): void {
        console.log('Preparing Margherita Pizza');
    }

    bake(): void {
        console.log('Baking Margherita Pizza');
    }

    cut(): void {
        console.log('Cutting Margherita Pizza');
    }

    box(): void {
        console.log('Boxing Margherita Pizza');
    }
}

// Concrete Pizza B: Pepperoni
class PepperoniPizza implements Pizza {
    prepare(): void {
        console.log('Preparing Pepperoni Pizza');
    }

    bake(): void {
        console.log('Baking Pepperoni Pizza');
    }

    cut(): void {
        console.log('Cutting Pepperoni Pizza');
    }

    box(): void {
        console.log('Boxing Pepperoni Pizza');
    }
}

interface PizzaFactory {
    createPizza(): Pizza;
}

class MargheritaPizzaFactory implements PizzaFactory {
    createPizza(): Pizza {
        return new MargheritaPizza();
    }
}

class PepperoniPizzaFactory implements PizzaFactory {
    createPizza(): Pizza {
        return new PepperoniPizza();
    }
}

function orderPizza(factory: PizzaFactory) {
    const pizza = factory.createPizza();
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
}

console.log('Ordering Margherita Pizza...');
orderPizza(new MargheritaPizzaFactory());

console.log('Ordering Pepperoni Pizza...');
orderPizza(new PepperoniPizzaFactory());

// Adapter
interface PaymentProcessor {
    processPayment(amount: number): void;
}

class PayPal {
    pay(amount: number): void {
        console.log(`Paid $${amount} via PayPal`);
    }
}

class PayPalAdapter implements PaymentProcessor {
    private paypal: PayPal;

    constructor(paypal: PayPal) {
        this.paypal = paypal;
    }

    processPayment(amount: number): void {
        this.paypal.pay(amount);
    }
}

class Stripe {
    makePayment(amount: number): void {
        console.log(`Paid $${amount} via Stripe`);
    }
}

class StripeAdapter implements PaymentProcessor {
    private stripe: Stripe;

    constructor(stripe: Stripe) {
        this.stripe = stripe;
    }

    processPayment(amount: number): void {
        this.stripe.makePayment(amount);
    }
}

function purchase(paymentProcessor: PaymentProcessor, amount: number) {
    paymentProcessor.processPayment(amount);
}

const paypal = new PayPal();
const stripe = new Stripe();

const paypalAdapter = new PayPalAdapter(paypal);
const stripeAdapter = new StripeAdapter(stripe);

console.log('Processing payment via PayPal...');
purchase(paypalAdapter, 100);

console.log('Processing payment via Stripe...');
purchase(stripeAdapter, 150);

// Iterator
class Book {
    constructor(private title: string) {}

    getTitle(): string {
        return this.title;
    }
}

interface Iterator {
    hasNext(): boolean;
    next(): any;
}

class BookIterator implements Iterator {
    private index: number = 0;

    constructor(private books: Book[]) {}

    hasNext(): boolean {
        return this.index < this.books.length;
    }

    next(): Book {
        return this.books[this.index++];
    }
}

interface BookCollection {
    createIterator(): Iterator;
}

class Library implements BookCollection {
    private books: Book[] = [];

    addBook(book: Book): void {
        this.books.push(book);
    }

    createIterator(): Iterator {
        return new BookIterator(this.books);
    }
}

function printBooks(bookIterator: Iterator): void {
    while (bookIterator.hasNext()) {
        const book = bookIterator.next() as Book;
        console.log(book.getTitle());
    }
}

const library = new Library();
library.addBook(new Book('The Great Gatsby'));
library.addBook(new Book('To Kill a Mockingbird'));
library.addBook(new Book('1984'));
library.addBook(new Book('Pride and Prejudice'));

const iterator = library.createIterator();
console.log('Books in the library:');
printBooks(iterator);
