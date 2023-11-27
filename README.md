# Hopes and Dreams

Hopes and Dreams is a social platform designed to help users collaborate, share and plan their hopes, aspirations, dreams and goals.  The site is designed as a collaborative space through which, with a little luck and a little help, those dreams might come true.

## Contents:

### UX Design

[UX - Strategy](#ux---strategy)\
[UX - Scope](#ux---scope)\
[UX - Structure](#ux---structure)\
[UX - Skeleton](#ux---skeleton)\
[UX - Surface](#ux---surface)

### Testing and Deployment

[Game Features](#game-features)\
[Testing Documentation](#testing-documentation)\
[Deployment](#deployment)

### Credits and Technical

[Credits](#credits)\
[Technical Information](#technical-information)

## UX - Strategy 
([back to top](#contents))

### 1) Research

My research ahead of this project has involved looking at existing social platforms and analyzing what makes them work (or otherwise) and interviewing friends, colleagues and family to understand what they do and don't like about them.  I am also lucky to be able to draw on 20 years of experience working in online advertising and marketing.  On reviewing the information I have been able to gather, I have settled on a number of key points which, through the establishment of developer goals and user stories, will be important in a social platform as intimate as this.

### 2) Project Goal

Hopes and Dreams intends to be a place to realise positive aspirations. In spite of this, I intend to avoid the sort of language that exists around setting goals.  Whilst planning tools can be part of the process (either as part of the MVP or part of the evolution of the project) this platform is about encouraging blue skies thinking. The intention is that a community will develop to support people in pursuit of their dreams, at which point they might even become goals, rather than interaction with the site be a goal-setting exercise in itself.  The aspiration is almost as important as the realisation, as such creating and sharing a dream with the community will be intended as a journey of discovery rather than a chore.  Dreams are meant to be shared and celebrated almost as much as they are meant to be realised.

The main goal of the project then, is to develop this community and bring people together, through a UI which makes the site a pleasure to use.  It's about having people put their dreams and ideas in writing and find like-minded people.  On a simple MVP level this will simply be about matching dreams to users, creating a 'feed of dreams' containing a variety of fascinating hopes and aspirations, hopefully some of which will motivate the user to positively engage - whether this engagement means offering advice, the benefit of experience or even practical assistance.  The site will also act as a more conventional social platform, where you can actively search for and follow individuals or their aspirations and receive updates about how things are going for them.

### 3) Developer Goals

- Build portfolio: I want this project to display originality which will make it stand out from the crowd and provide value for users.
- Develop technical skills:  I would like to make use of JQuery on this occasion to simplify the Javascript, along with more advanced CSS techniques to create a feast for the eyes.  The way the database is indexed will be very important and I think I will learn a lot duriung this project, probably the hard way!
- Extensibility: Using Mongo DB as a DBMS combined with a modular plan for the design means there is huge scope for future development and monetisation.

### 4) Site Owner - User Stories

Based on my project research I have identified the following key areas.

- Brand Identity: The branding needs to be strong and clear from page one
- Site purpose:  The site mission and purpose needs to be clearly stated to encourage sign-up.  It needs to inspire people.
- Simple sign-up: I want as much site interaction as possible as quickly as possible and users need a simple sign-up process just as soon as they hit the homepage.
- Clean UI: I want the UI to be a stripped down and simple as possible so that it functions as well on mobile as it does on desktop, and looks great on both.  I want it to look so great people can't wait to click or tap on things.
- Clear User Journey:  From the minute the user clicks the sign-up button, they need to be hand-held through the process.  This is a new concept and signing up is the most important part of that journey.  As soon as they have signed up and land in the site for the first time, the question 'what do I do now' needs to be answered.
- Organic feed:  No edge weighting, all content has an equal chance on the general feed. No compulsary marketing on any feed. Logic for displaying dreams must be clean and effective.

### 5) Site Visitor - User Stories

This site should be for everyone, from any walk of life.  As such the user stories focus on UI, engagement and provision of compelling content.

- Reasons to stay:  The homepage needs to give users instant motivation to sign up, through brand imagery and a clear concept.
- Clean user journey:  The user journey needs to be interesting, but not too long, particularly through the sign-up phase.
- Quick and intuitive UI: to avoid drop-outs the user should not be hunting for anything.
- Customisable look and feel: People like to be able to make their corner of the web their own.  
- Access to content: Feeds need to reflect what people are following and the things they have interest in, and searches need to deliver relevant results.
- Safe Space:  Users need to feel their data is safe, that any data they provide is provided for a good reason, and that they have control over comments and content they see.

## UX - Scope
([back to top](#contents))

### Technology

The technology used will be HTML/CSS and JavaScript/JQuery, using Python with the Flask framework as a templating language and MongoDB to store data.

I have chosen to use MongoDB over PostgreSQL for a number of reasons (in order of importance):
 - Type of Application:  From the reading I've done it seems MongoDB is a great option for unstructured data the likes of which you find on social media platforms, and is being widely adopted by 'big-tech' companies.
 - Development Cycle: The lack of requirement for a rigid schema will suit the ongoing development of this project, with its potential for expansion and growth (both to MVP level and beyond).  I feel like the application could see significant evolution as I develop it and encounter new challenges.
 - Data storage capacity:  ElephantSQL only provides 25MB storage with the base package, which is extremely low headroom for this sort of application, whilst MongoDB Atlas provides 512MB which should be more than enough.
 - MongoDB Atlas:  Atlas is a slick platform with a superb UI and great documentation, making it a pleasure to use. 
 - Personal Development:  Because my fourth project will involve using the Django framework with a relational database and being familiar with MySQL from the past, I feel like using MongoDB here will add a very useful string to my bow and further my professional development.
 - Obselescence: This relates to course material, where the PostgreSQL module is far lower in quality than the MongoDB content.  Whilst both contain deprecated code, only minor changes were required to update PyMongo functionality to be compatible with latest package versions and therefore make the code viable for use in a brand-new real-world application. The SQLAlchemy methodology I have been taught caused all sorts of problems and required very specific package versions to function whilst leaving out key concepts such as search functionality and user authentication; it would need a lot of additional learning to fill these gaps in my knowledge which I don't have time for in the context of this course.

### Core Elements (MVP)

#### Structure

 - Landing Page: features logo, brief site description and sign up / sign in option.  All about branding the site.
 - New User Journey:  On clicking Sign Up will begin a user journey.
 - Base Elements:  Once signed in each page will have title/logo and menu with four core elements, plus a search.
 - Feed (default page): The main site feed is divided into two elements, Dreamscape (default) and Personal
 - Profile: Consists of an overview of your profile and options to update info divided into 2 sections, account or personal settings.
 - Dreams: This page will list your current Hopes and Dreams. 
 - Dreambuilder:  This is a walkthrough process for creating a new dream. 
 - Update Dream Page:  Page will consist of a description, and underneath icons representing each aspect of a dream.  Where an available module doesn't exist there will be the option to create it.
 - View dream page: here you can review your dream as others see it, and view, rate and respond to any offers of help, comments or encouragement that other users have provided.

#### Features

NB This MVP feature list represents this site as I currently envisage it, and will be subject to change (probably quite a lot of it!)

 - Detailed step-by-step user journey planner to introduce them to the world of hopes and dreams, which not only gets them signed up to the site but introduces the site concept in small bites.  Unfolds in stages over multiple pages with strong brand imagery based around default theme.  A bare minimum of the personal profile settings will be set compulsararily here for initial discovery (to avoid an empty feed after signup!).
 - Multiple feeds - one just to follow and/or assist with dreams and one to follow people and dreams you know or are interested in.
 - Dreamscape feed is a 'feed of dreams' consisting of dreams from other users that appear based on the user's interests/skills and also personal settings.  The user can choose to comment, offer advice or offer a service (based on dream requirements).  Alternatively users can just enjoy reading other peoples hopes and dreams.
 - Personal feed will consist of actions from people or dreams you follow, reactions to your comments, comments on your own dreams or any other modules (beyond the MVP)
 - Step-by-step Dreambuilder wizard to walk the user through the process of building their dream. Only a name, description and keywords are compulsary fields, the rest can be added later, or not added at all.  The intention is dreams should be quite freeform.
 - Optional modular elements for your dream, the core of which will be the dream diary, dream requirements and a dream planner
 - Each dream will be listed with a brief description if any exist, and the option to view the dream, update it, or undream it.  If you have no dreams a tutorial message will appear below the Dreambuilder inviting you to share your hopes and dreams.
 - Opportunities to update skills and interests to ensure the user only sees what they are intererested in. Account and personal settings which allow the user to customize their experience.Account settings will include Name, Profile Pic, e-mail address, Location (optional), notifications/privacy settings (if included). Personal settings inlcude Skills/Experiences/Interests, projects, open to (which may be rolled into the privacy settings)
 - Users may comment on a dream to offer advice or encouragement, or offer specific help or services.  They may also follow a specific dream in their personal feed.
 - Users may rate comments, and have the option to filter users with very low scores (which indicates spam, trolling or other destructive behaviour)
 - Search facility to find friends or chase specific dreams.
 - 3 user levels, admin, moderator or user.  The single admin (ie me) will be able to create other moderators and both will be able to remove users and content deemded to be in breach of the Terms of Use Policy.
 - Basic themes - dreams and indeed profiles can be tailored with basic color themes.
 - Image handling - all user supplied images converted and compressed appropriately to the platform. I will also need to work out somewhere to put them when using a Heroku deployment.

### Optional Features

 - Additional Services module for dreams. Will allow companies to offer their services (eg if your dream is to be a web developer, you might be offered courses). Would allow for targeted, entirely optional monetisation without weakening the platform.
 - Organisations module for dreams. If added would provide details of organisations that may be able to help via an API. 
 - Extended notification and privacy settings for each feed, in order to make them highly customisable.
 - The ability to have an advanced range of search options and more advanced requirement gathering, allowing dreams to feature according to multple categories. This is highly unlikely to feature in the MVP; although there may well be multple categories for users/dreams it is likely they will be indexed together for each for discovery purposes.
 - Advanced/custom themes: The ability to select from multiple advanced themes when setting up dreams and accounts, including images.  The ability to create custom themes.  Whilst I view this as a lot more important than just a nice to have given the feedback from some of my research, I'm not sure I'll have time to include it in the MVP for this project as well as providing the basic functionality it needs to be a working real-world application.

## UX - Structure
([back to top](#contents))

### Navigation

#### Essential elements:

#### Optional elements:

## UX - Skeleton
([back to top](#contents))

### Design Choices

### Processes

### Wireframes

Please find the wireframes [HERE](WIREFRAMES.md).

## UX - Surface
([back to top](#contents))

### Color Palate

#### Background colors

#### Text colors

### Fonts

### Images

### Navigation
  
### Alerts

### Responsiveness

## Game Features
([back to top](#contents))

## Testing Documentation
([back to top](#contents))

Please find all testing documentation [HERE](TESTING.md).
  
## Deployment
([back to top](#contents))

### Initial Deployment

### Deployment Instructions

### Continuing This Project

## Credits
([back to top](#contents))

### Fonts

### Images

### Content

### Acknowledgments

## Technical Information
([back to top](#contents))