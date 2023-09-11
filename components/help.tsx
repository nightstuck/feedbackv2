import { Accordion, AccordionItem, Link } from "@nextui-org/react";
import NextLink from 'next/link';

const Help = () => {
    return (
        <Accordion selectionMode='multiple'>
              <AccordionItem key={1} title="1. Create an Account">
                <p>Go to the Sign Up Page <Link as={NextLink} href='/signup'>here</Link> and create a new Account.</p>
              </AccordionItem>
              <AccordionItem key={2} title="2. Create a new instance">
                <p>Go to your <Link as={NextLink} href='/dashboard'>Dashboard</Link> and click on the <Link as={NextLink} href='/new'>+ Button</Link>.</p>
                <p>Choose a name for the instance. It has to be 3 letters or more.</p>
              </AccordionItem>
              <AccordionItem key={3} title="3. Test your instance">
                <p>
                  Go to the Sign Up Page <Link as={NextLink} href='/signup'>here</Link> and create a new Account.
                </p>
              </AccordionItem>
              <AccordionItem key={4} title="4. Embed the Form into your Website">
                <p>
                  Go to the Sign Up Page <Link as={NextLink} href='/signup'>here</Link> and create a new Account.
                </p>
            </AccordionItem>
        </Accordion>
    );
}

export default Help;