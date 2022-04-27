# Contacts

### TODO

- Improve test coverage
- Toggle contact isStarred when clicked on the card star
- Make the list Sortable
- Add dropbox/image Upload
- Make Mobile responsive
- Optimize Code
- Refactor

### Used libraries

- UI

  - Material UI
  - Tailwind
  - Material UI Icons

- Code

  - React
  - react-router-dom
  - react-hook-form
  - react-infinite-scroll
  - react-modal
  - yup

- Tests

  - Jest
  - react testing library

- Database
  - firebase
  - faker

## Pages

### Contact List

#### "/"

##### Functionality

- Display Contact List
- Infinite Scroll fetch when scrolled to bottom
- Search Function
- Starred Toggle
- Add Contact Button Link
- Cards
  - Show Avatar, Initials if no avatar
  - Show Full Name
  - Show contact number
  - Show isStarred
  - Edit Contact Button Link
  - Delete Contact Button Link

### View Contact

#### "/:contactId"

##### Functionality

- Display Contact Details
- Back Button
- Edit Contact Button Link
- Delete Contact Button Link

### Add Contact

#### "/add"

##### Functionality

- Display Contact Details Inputs
- Back Button, Triggers Discard Modal if Input Changed
- Persists the user changes until submit
- Loads Changes if reloaded
- Adds Contact to DB on submit

### Edit Contact

#### "/:contactId/edit"

##### Functionality

- Loads Contact Details on Inputs
- Back Button, Triggers Discard Modal if Input Changed
- Persists the user changes until submit
- Loads Changes if reloaded
- Updates Changes in DB

### Delete Contact

#### "/:contactId/delete"

##### Functionality

- Redirects to /edit on the background
- Deletes user on ok click
- redirects to / on cancel
