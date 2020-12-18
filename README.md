# Voice-Command-website-V2
This is an updated version of my University dissertation to measure the feasibility of using a rules based, non AI voice command system to navigate a website. 
Generally cleaning up the code and adding and improving elements following a survey.

After conducting some User Testing, Surveys and some Dev UAT, the following issues were found and a solution was concluded: 
(1)It was discovered that some devices had some styling issues, further investigation found that this was because CSS Grid was not availble for those devices.
Following on from this, a solution was made to change the styling of the whole site from CSS Grid over to Flex.
This meant redisgning and accomodating some of the elements of the pages into components and thus reducing the code in the process.

(2)The Survey found that the Voice Command Modal was hard to follow, so the text was reduced, color was found to be an issue and following some User Testing, it
was found the users wanted a more neutral color through out for this component.

(3)The Users tested, suggested cutting down on the language more so, to increase the readability for the lower skilled students, this was understood and carried out to 
increase the readability, more so the retainability and focus for the sudent.

(4)It was suggested that videos would be useful, this will be a future implementation to the site.

(5)As a point of interest to the user, it was decided to incude a strip banner undeer the new and improved top navigation area to transpose the user, once clicked, to
another site which showcases the thought process and design of the site.
