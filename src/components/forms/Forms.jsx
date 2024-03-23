import React, { useEffect } from 'react';
import FormfacadeEmbed from "@formfacade/embed-react";
const Forms = () => {

  return (
    <FormfacadeEmbed

      formFacadeURL="https://formfacade.com/include/102993419173521066776/form/1FAIpQLSep7xPDD5CeyZBQzlprqTJocuX44soZNJ1XL8F5UFzM3tJZOg/classic.js/?div=ff-compose"

      onSubmitForm={() => console.log('Form submitted')}

    />
  );
};

export default Forms;
