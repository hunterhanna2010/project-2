Hi there. Here begins the project two journey for the Software Engineering Immersive course from General Assembly in Seattle, WA.

My goal is to develop a care network messaging app. The premise is that a perspective user might need therapist advice, so they come to my site to find the therapists near them. Then message them.

I'll use node.js and express, seqauelize, and postgres to accomplish this goal.  Users have the ability to sign up and log in to their message center and update the existing messages if desired or create new ones.

Monday, October 21, was awful. When trying to create new models, I broke the authentication portal and could not recover.  I tried to undo sequelize models, I tried to force recovers back to their original state.  It was excruciating. I also tried to merge with a previous commit to bounce back to a spot I knew was working, and even that did not cooperate.  At 4:30, I made the decision to begin a new repository again and include the auth template.

While this was crashing around me, I was able to authenticate a fetch request to my Better Doctor API and receive appropriate objects of data. I now have to transition that to an axios call, but at least I have been able to make an independent fetch from a console and receive the data I was expecting.

As of 7:00, Oct 22, I have recovered and set up four new ejs views that connect and render.  I have to incorporate the tables I will try to rebuild, and then I will perform the axios call in order to get viable content to my pages.

It is past time to get things in order and I am on the verge of hyperventilating due to these breaks to my progress.

7:40, Oct 23, I was able to get back on track and make up for Monday's work that went sideways. I created the db tables. Wrote the axios call, and implemented the ejs pages layout. I was able to collect the user name from login and personally welcome that user to my page and ensure that navigation was smooth. I would consider Tuesday's progress successful. However, there is much to do still. My axios call is producing results in the terminal console, however, it is printing empty objects.  I have figured out why they are empty objects, but when i drill down on the axios call with more specifity, it says it cannot find the object even though I am writing it into the code.
I will give myself two hours to figure this out. Then, I will work on a save feature that creates a favorites application page, and then a message board. But I cannot progress until I have info printing to my page. I am nervous and frustrated, but in a better spot than yesterday morning.

7:10 AM 10/24, I am able to produce two different queries from my axios api call, one to seattle area and the other specified by specialty. Which was my goal. I have it formatted nicely to the page, except the phone number which doesn't include any periods or dashes from the api, so it looks bad, but that is a minor issue.
As a person who enjoys putting puzzles together, it was extremely gratifying to see the axios call and drill down to find the info I wanted to display to the page. It actually became a fun exercise to see what info I could cull and produce to the page.

Of most importance is completing the CRUD routes. I have the views set, and the redirect patterns set, but my original message is not working yet even though it shows as an inserted new message to my database. In fact, all the areas of the table are inserted correctly from the form information. When I try to take the content in the database and print it to my page, I have a problem. And because I haven't figured out that pattern yet, I can't see one message, let alone all of them. The goal is to see them and either add to it (update) or delete the connection to the therapist(delete).  Both of those options would complete my CRUD route cycle. I have time to figure this out, but presentation is today. I HAVE TO GET THE CRUD ROUTES DONE!