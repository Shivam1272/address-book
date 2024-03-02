# Address Updater Project Assessment Report

## Overview
The Address Updater project is a user interface application designed to manage addresses efficiently. It offers functionalities for adding, editing, deleting, and updating address information. This assessment evaluates the project's functionality, user interface, error handling, and additional considerations.

## Functionality Assessment

### Add
- **Completeness of Information:** Users can add new addresses with all necessary details, including street address, city, state, and zip code.
- **Input Validation:** The system validates user inputs for completeness and format. It also validate `Zip Code` formats for `India` through `Regex`.
![localhost_3000_](https://github.com/Shivam1272/address-book/assets/96972819/13a7e075-60a6-4084-add6-a9df76b5bcb6)

### Edit
- **Editing and Saving Changes:** Users can edit existing addresses and save changes effectively.
- **Editable Fields:** All address fields are editable.
- **Data Validation:** The system prevents invalid data during editing, but further validation on specific field formats could be enhanced.
![localhost_3000_ (2)](https://github.com/Shivam1272/address-book/assets/96972819/1d6b1f9f-b4cd-45d8-8b5a-20581a99ea63)

### Delete
- **Deletion Capability:** Users can delete unwanted addresses.
- **Confirmation Step:** There is a confirmation step before permanent deletion, which enhances data safety.
- **Data Dependencies:** The system's handling of potential data dependencies before deletion was not explicitly detailed and could be an area for review.
![localhost_3000_ (4)](https://github.com/Shivam1272/address-book/assets/96972819/b0e9e919-ddbe-4034-9305-9525834f4f5d)

### Update
- **Real-time Updates:** Users can update existing addresses, and changes are reflected immediately.
- **Conflict Handling:** <span style="color:red">`Pending`</span> The system does not explicitly handle potential conflicts during updates, such as concurrent edits by multiple users. Implementing optimistic locking or other conflict resolution strategies could improve this.
![localhost_3000_ (3)](https://github.com/Shivam1272/address-book/assets/96972819/59c1bfcd-5db3-4d1d-8778-f141b0e02d71)

## User Interface (UI)

- **Intuitiveness:** The user interface is intuitive and easy to navigate.
- **Accessibility of Functionalities:** Functionalities are clearly labeled and easily accessible.
- **Data Presentation:** Data is presented in a clear and organized manner `Table & Form Format`.
- **Responsiveness:** The UI is responsive and adaptable to different screen sizes, with minor issues on very small screens that could be improved.

## Error Handling

- **Error Messages:** The system provides clear and informative error messages.
- **Recovery Mechanisms:** There are mechanisms to recover from invalid inputs or unexpected errors, though enhancing these could improve user experience.
- **Logging System:** A logging system for tracking errors was not explicitly mentioned and could be an area for development.

## Additional Considerations

- **Code Organization:** The code is well-organized and documented, making it easy to understand.
- **Coding Standards and Security:** Best practices in coding standards and security principles are followed, with room for continuous improvement.
- **Extensibility:** The project can be easily extended to include additional functionalities, demonstrating good software design principles.

## Setup Instructions

To set up the Address Updater project locally on your machine, follow these steps:

1. **Clone the Repository**
   - Open your terminal.
   - Navigate to the directory where you want to clone the project.
   - Run https://github.com/Shivam1272/address-book.git.
   - Navigate into the cloned directory by `cd address-book`.

2. **Set Up Backend**
   - Ensure MongoDB is running on your machine. If not, download and install MongoDB [here](https://www.mongodb.com/try/download/community).
   - Navigate to the backend directory: `cd server`.
   - Install dependencies: `npm install`.
   - Start the backend server: `npm start`. The backend server should now be running on `http://localhost:8000`.

3. **Set Up Frontend**
   - Open a new terminal tab or window.
   - Navigate to the frontend directory from the project root: `cd client`.
   - Install dependencies: `npm install`.
   - Start the frontend application: `npm start`. Your default web browser should automatically open the application on `http://localhost:3000`.

4. ** Set Environment**:
   - Look .env.sample file in server folder for better understanding

5. **Access the Application**
   - With both the backend and frontend running, you can now use the Address Updater application through your web browser at `http://localhost:3000`.


## Recommendations for Improvement

1. **Conflict Resolution:** Introduce optimistic locking or other conflict resolution strategies to handle concurrent edits.
2. **Responsive Design Tweaks:** Address minor responsive design issues for better usability on very small screens.
3. **Error Logging:** Implement a comprehensive error logging system for tracking and resolving errors more efficiently.

## Conclusion
The Address Updater project demonstrates solid capabilities in managing address information with an intuitive UI and effective error handling. While the project excels in many areas, there are opportunities for improvement, `resolving update conflicts`. Addressing these recommendations will further strengthen the application's functionality and user experience.
