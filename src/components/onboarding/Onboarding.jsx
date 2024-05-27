import React from 'react';
import './Onboarding.css';

const Onboarding = () => {
  return (
    <div className='onboarding-container'>
      <h1 style={{color: 'white', marginBottom: '1rem'}}>Welcome</h1>
      <ol>
        <li>
          <div className="li11">
            <div className="value-li11">1</div>
            <div className="line-li11"></div>
          </div>
          <div>
            <p className="li11-text">Why don't I see any content after filling out the forms?</p>
            <div className="text-change">
              Please be patient. It takes approximately 5 hours for your form to be verified. Once verification is complete, you will be able to access and set up your store. This process ensures the accuracy and security of your information. During this period, our team carefully reviews the details you have provided to maintain the quality and integrity of our platform.
            </div>
          </div>
        </li>
        <li>
          <div className="li11">
            <div className="value-li11">2</div>
            <div className="line-li11"></div>
          </div>
          <div>
            <p className="li11-text">How do I deactivate the voice integration feature?</p>
            <div className="text-change">
              If you prefer not to use the voice integration feature, you can easily deactivate it. Navigate to the settings menu located in the dropdown above. Within the settings, you will find an option to turn off the voice integration. This feature can be toggled on or off based on your preference to enhance your user experience.
            </div>
          </div>
        </li>
        <li>
          <div className="li11">
            <div className="value-li11">3</div>
            <div className="line-li11"></div>
          </div>
          <div>
            <p className="li11-text">How can I change the language of the app?</p>
            <div className="text-change">
              You can change the language of the app from the settings page. We offer a selection of languages to cater to our diverse user base. Currently, you can choose from English, Hindi, Bengali, and Malayalam. Simply go to the settings, select your preferred language, and the app will update to reflect your choice, ensuring a more comfortable and personalized experience.
            </div>
          </div>
        </li>
        <li>
          <div className="li11">
            <div className="value-li11">4</div>
          </div>
          <div>
            <p className="li11-text">Is there any way to change the theme of the application?</p>
            <div className="text-change">
              Yes, you can customize the theme of the application to better suit your preferences. This can be done from the settings page where you will find various theme options. Currently, we offer five distinct themes based on primary colors. These themes are designed to be visually accessible, making them suitable for users with different levels of visual impairment.
            </div>
          </div>
        </li>
      </ol>
    </div>
  )
}

export default Onboarding;
