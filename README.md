# paw_pal
"Get to know" App for Dog Owners - inspired by dating apps
This is the frontend part of the seperated frontend and backend.
It was developed using Ionic with Vue.js to be able to get rendered into a native application but also provide some experience in using the JavaScript framework Vue.

The main idea was to provide an online space for dog enthusiasts where they can meet likeminded people. This may be for various different reasons, for example trying to find a dog sitter, trying to become a dog sitter or just finding dog friends for your dog to hang around with.

Implemented in the app is the library i18n for translating all texts. Actually only the german language is configured completely and there is no language switcher yet.

# Functonality

## Loading Screen
Is put in front of slower loading pages like Login and Explorer

## Login Screen
Regular login form that connects to the PawPal API, which generates a Session Token and saves it to the customer.
This token gets stored in localstorage and has to be used for every future request as a Bearer Auth Header.
GeoLocation tracker. If customer allowes tracking, his location at the moment of login is being stored in his profile and only updated on logins.

## Regsiter Screen
Register form with fields for all essential customer information.
Image File Uploader for the profile image using the Ionic Camera component
Custom Select Component for selecting i.e. characteristics or search requirements.
Later the explorer can be configured to filter customers with those.

## Explore Page
Dating App Inspired Card-Swipe layout and functionality. Swiping a card to the right until its box shadow turns green means a "yes" action. Swiping left means a "no".
The animation is still a bit flickery and may need some work in the future. Alternative to click buttons instead.
Explorer Page returns profiles of customers that have either matched the current customer and are waiting for match confirmation or customers that havend interacted with the customer at all. Also, if a location is provided, only customers who also provide their location and are within 10 km distance of this location are shown. This is handled in the api. If the customer just simply clicks on the card, it expands into a full profile mode and the swipe functionality is deactivated. Now there can be found further details about the customer in a text description and the actions "yes" or "no" can be triggered by clicking the still existing buttons.

## Imprint Page
Placeholder for a future imprint page

## Matches Page
List view of al confirmed matches a customer has. A click on one of the matches gets you to the Messages Page of the selected Match

## Messages Page
Every match has its own chat reachable through the Messages Page. A basic chat functionality is implemented with a textarea and a submit button. Depending on weather the current customer sent the message or not, the message is displayed as a bubble either on the right side or the left side of the screen.

## Ideas for future
- Translate app to different languages
- Show name of chant partner in header of Messages Page
- Improve swipe animation on explorer page