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
 - Dreams: This page will list the user's current Hopes and Dreams. 
 - Dreambuilder:  This is a walkthrough process for creating a new dream. 
 - Update Dream Page:  Page will consist of a description, and underneath icons representing each aspect of a dream.  Where an available module doesn't exist there will be the option to create it.
 - View dream page: here the user can review your dream as others see it, and view, rate and respond to any offers of help, comments or encouragement that other users have provided.

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
 - The ability to have an advanced range of search options and more advanced requirement gathering, allowing dreams to feature according to multple categories. This is highly unlikely to feature in the MVP; although there may well be multple categories for users/dreams it is likely they will be grouped together when indexing each side of the search for discovery purposes.
 - Advanced/custom themes: The ability to select from multiple advanced themes when setting up dreams and accounts, including images.  The ability to create custom themes.  Whilst I view this as a lot more important than just a nice to have given the feedback from some of my research, I'm not sure I'll have time to include it in the MVP for this project as well as providing the basic functionality it needs to be a working real-world application.
 - Suggest people to follow by connecting with other social apps via API.  Could also use to invite new users to the service.  Useful growth tool.
 - Infinite scrolling on feeds.

 ### Hopes and Dreams

 - Hopes and Dreams mobile app, with full site integration.
 - Integration with other social APIs to enable users to add friends and share content.

## UX - Structure
([back to top](#contents))

### Site pages and elements

#### Header and Site Navigation

The homepage navigation will simply be a sign up/sign in button prominently placed, which leads either to the sign-up user journey or the Dreamscape feed by default on signing in.

Once logged in the main navigation will be in the form of bold icons indicating the function of each page, and a logo will appear either alongside or above the navigation.
 - Feeds
 - Profile
 - Dreams

Furthermore search functionality will also be included on all pages.  This will take either the form of a search bar with a radial offering the option to search for people or dreams, or an additional icon which would open a more detailed search page.  The choice of concept here will likely evolve along with the site design.

My philosophy is to simplify navigation and avoid the need for additional pop-up/drop-down menus on mobile which impair site feel and are largely un-necessary if navigation is well designed.

#### Footer

If I view any social site there is no main footer as such, and indeed Facebook does not include one either - this seems to be for two reasons; one is infinite scroll, the other is space being limited on a mobile screen.  Any important information (copyright, terms of service) can be located elsewhere; with this in mind I'm not sure what a footer would add so I won't be including one. 

#### Sign-up user journey

This will consist of a series of pages requesting use information to complete the sign-up process.  The intention is not only to gather the information required for the site to be functional, but to introduce the user to key site concepts, build anticipation about site content and encourage exploration once signed up.

#### Feed pages

The feed pages will consist of a scrollable list of items in the feed, along with options to interact at the bottom of each item.  This will include like buttons, and the ability to follow, unfollow, expand the comments section or leave a new comment.  Where dreams are concerned users will also be able to access full details about the dream and the user who created it from the feed.

The feed will take two forms - one is a personal feed which will show the latest from all the content and people the user is following.  the other is the Dreamscape feed where the user can browse the dreams that others have created.

#### Dreams page

The dreams page will list Dreams and descriptions of them, with latest comments.  You can also expand them to view various modules and comments therein, or open them in the Dream Editor page.  At the top of the page will also be the Dream Builder button which initiates the user journey for building a dream.

#### Dream Editor

Large icons will represent the various dream modules if present, otherwise there is an icon to create them.  Here you can also enter various modules to edit and update them

#### Dream Builder

The Dream Builder icon initiates the user journey to create a dream, walking the user through each stage of the process.  Not all modules are compulsary but each dream will require a name, description and some category tags so people can discover it.

#### Profile Page

The user will be faced with two options - it defaults to personal which allows them to update skills, interests, projects and experience to tailor what they see in their Dreamscape feed.  The user can also access Account Settings from this page to update their personal info and privacy/notification settings.

### Data Structure

Using Mongo DB and a modular approach to building key elements of the site means I have opted for an extremely flat structure, creating new collections where possible to make data easily accessible and speeding up the process of removing data.  This data structure has been put together with two major provisos - one is that this is my first MongoDB project and I do not yet know how this structure will evolve in practice.  It may well be that I need to merge, nest or separate various collections as the requirements of the platform become clearer.  My preference at this stage is to keep it as simple as possible!

#### Users Collection

This will include basic user data, including but not limited to the following keys:  Name, Base Theme, Profile Picture, e-mail, location, skills/experience/interests (some of all of these fields will be included/indexed to pair with similar dream fields for discovery purposes), projects, and also a setting which will enable a user to block others below a certain rating(ie users with very low feedback scores who are likely trolls).

#### Notifications / Privacy settings

This collection will be created alongside a new user; each user will have their own collection of this type. It will relate to the individual user's privacy and discovery settings.  There is scope to expand this to include advanced notification settings, but his is beyond the MVP. It will include they keys user_ID (ie the user it relates to), user_followed, user_blocked, dream_followed, entities_liked/disliked (to prevent dupes).

#### Dream Collection

This is the collection for base dream data.  It includes all the data to be included in feeds and discovery info in the following keys: user_ID (ie who created it), name, description, skills needed/categories (to be matched with profile settings for discovery purposes).  Comments will be enabled on dreams.

#### Diary Collection

Each document in the diary collection is linked to a dream by the dream's ID. They consist of the following keys: dream_ID(the related dream), diary entry (these will be numbered sequentially and created on the fly as they are added), no_entries (this will be incremented each time an entry is added, and used to iterate over the data). Comments will be enabled for diary entries

#### Goals Collection

The Goals collection will be created on the same basis as diary entries and will have comments enabled.

#### Planner Collection

The Planner collection will be created on the same basis as diary entries and will have comments enabled.  Additionally, each plan added to the planner will have the option to create a seperate task entry linked.  I have chosen to use this rather than create nested entities.

#### Requests Collection

The Requests collection will be created on the same basis as diary entries and will have comments enabled.

#### Comments Collection

Each comment will be linked to another entity and a user by ID. It can be identified by the following keys:  user_ID (user making the comment), entity_ID (entity it relates to), like, dislike reply1, reply1 like/dislikes, reply1 user_id etc (replies added on the fly to each document as they are added), no_replies (for iterating over the data).

## UX - Skeleton
([back to top](#contents))

### Design Choices

 - Landing page aside, I have kept the menu system consistently placed throughout the site according to the platform on which it is being viewed.
 - Menu icons will be consistently placed, and where possible will include a description of what the icon does for clarity, in consideration of older or less 'web-savvy' users.
 - On smaller screen sizes, to avoid clutter, I will move the search facility to a seperate page.  This is also an option for the desktop site, and may end up being the most desirable option in order to keep the user experience consistent across platforms.
 - Search results pages will use the exact layout of the feed pages.
 - Although the dreams menu icon is still available from the Dream Editor and can be clicked, I have chosen to include a button to return to the Dreamscape feed, for user clarity.
 - All content is consistently sited in a central scrolling area.  Feeds MAY use an infinite scroll depending on time and technical constraints
 - When clicking to expand a dream the user will be able to view all modular components.
 - The dream editor is only available to the owner of a dream.  When one of the modular components is selected the user will be able to edit all the components of that section in a seperate page with form input.  If the plus sign is selected to add a component it will take the user on a new user journey though the build process.
 - It is envisaged that the dream-builder button and the sign up button walk the user through a highly intuitive, staged sign-up / build process.  This will include walk-throughs explaining the data required and what it does, and with luck some really nice visuals.  During the initial build this will be a simple form in both cases; at a push these forms could also serve as a viable MVP.
 - The profile page is divided into two distinct sections for user clarity - one to update their skills, interests and experiences, which influences the content they are exposed to, and one to update basic profile details and, eventually, more advanced privacy and notification settings.
 - The site logo and branding will vary in prominence depending on the platform on which the site is viewed, to maximise the space available for content.
 - The objective throughout the site is the user should be no more than two clicks from the information they require, that the locations of various site features should be obvious, and users aren't overwhelmed by scores of icons which do not have an obvious purpose.
 - As I would expect there to be a fairly even split between mobile and desktop, the intention is to build the site using CSS Flexbox. The flow of the pages are designed accomodate the responsiveness that has been built into the site from the outset.

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