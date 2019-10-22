Hi there. Here begins the project two journey for the Software Engineering Immersive course from General Assembly in Seattle, WA.

My goal is to develop a care network messaging app. The premise is that a perspective user might need therapist advice, so they come to my site to find the therapists near them. Then message them.

I'll use node.js and express, seqauelize, and postgres to accomplish this goal.  Users have the ability to sign up and log in to their message center and update the existing messages if desired or create new ones.

Monday, October 21, was awful. When trying to create new models, I broke the authentication portal and could not recover.  I tried to undo sequelize models, I tried to force recovers back to their original state.  It was excruciating. I also tried to merge with a previous commit to bounce back to a spot I knew was working, and even that did not cooperate.  At 4:30, I made the decision to begin a new repository again and include the auth template.

While this was crashing around me, I was able to authenticate a fetch request to my Better Doctor API and receive appropriate objects of data. I now have to transition that to an axios call, but at least I have been able to make an independent fetch from a console and receive the data I was expecting.

As of 7:00, Oct 22, I have recovered and set up four new ejs views that connect and render.  I have to incorporate the tables I will try to rebuild, and then I will perform the axios call in order to get viable content to my pages.

It is past time to get things in order and I am on the verge of hyperventilating due to these breaks to my progress.